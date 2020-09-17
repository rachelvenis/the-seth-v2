const Controller = require('./controller');
const DraftAssignmentModel  = require('../models/draft-assignment-model');
const AssignmentModel  = require('../models/assignment-model');
const StaffModel  = require('../models/staff-model');
const DayModel  = require('../models/day-model');
const AssignmentEntity = require('../entities/assignment-entity');
const LoadExampleData = require('../loadExampleData');
const DistributeODs = require('../controllers/distribute-ods.js');
const DayOffValidation = require('../controllers/validations/day-off-validations-controller.js');
const PDFDocument = require('pdfkit');
const fs = require('fs');


let pastAssignments = [];
let allStaff = [];
let allDays = [];

let dayOffValidation;
let distributeODs;

let staffModel = new StaffModel();
let dayModel = new DayModel();
let assignmentModel = new AssignmentModel();

function hereweare(){
  return new Promise((resolve, reject) => {
    let allDays = [];
    let allStaff = [];
    let allNewAssignments = [];
    let allPastAssignments = [];
    dayModel.findAll().then((days) => {
      allDays = days;
      staffModel.findAll().then((staff) => {
        allStaff = staff;
        assignmentModel.findAll().then((pastAssignments) => {
            allPastAssignments = pastAssignments;
            resolve({allDays, allStaff, allPastAssignments, allNewAssignments});
        });
      });
    });
  });
}

class ActionController {
  constructor() {
    hereweare().then((results) => {
        pastAssignments = results.allPastAssignments;
        allStaff = results.allStaff;
        allDays = results.allDays;
        dayOffValidation = new DayOffValidation(allStaff, pastAssignments, allDays);
        distributeODs = new DistributeODs(allStaff, pastAssignments, allDays);
    });
    this.draftAssignmentModel = new DraftAssignmentModel();
    this.staffModel = new StaffModel();
    this.dayModel = new DayModel();
  }

  generatePDF(res) {
    this.doc = new PDFDocument();
    this.doc.pipe(res);
    let allDays = [];
    let allStaff = [];
    let allAssignments = [];
    this.draftAssignmentModel.findAllByDay().then((assignments) => {
        allAssignments = assignments;
        this.staffModel.findAll().then((staff) => {
            allStaff = staff;
            this.dayModel.findAll().then((days) => {
                allDays = days;
                let results = "";
                let lastDayId = "";
                let height = 50;
                let column_two = false;
                for (let assignment in allAssignments) {
                    let result = "";
                    if (allAssignments[assignment].dayId != lastDayId){
                        height+=10;
                        this.doc.fontSize(14);
                        this.doc.text(
                            this.getDayLabel(allAssignments[assignment].dayId, allDays),
                            (column_two ? 260 : 0) + 40, height);
                        this.doc.fontSize(10);
                        // result += this.getDayLabel(assignments[assignment].dayId, days) + "\n"; 
                        lastDayId = allAssignments[assignment].dayId;
                        height+=18;
                    }
                    this.doc.text(
                        this.getStaffName(allAssignments[assignment].staffId, allStaff),
                            (column_two ? 260 : 0) + 40, height);
                    this.doc.text(
                        (allAssignments[assignment].type == 1 ? "OD - " + allAssignments[assignment].halfUnit : "Day Off"),
                            (column_two ? 260 : 0) +  160, height);
                    height+=14;
                    if (height > 721) {
                        height = 50;
                        if (column_two) this.doc.addPage();
                        column_two = !column_two;
                    }
                }
                this.doc.end();
            });
        });
    });
  }

  getDayLabel(dayId, days) {
    for (let s in days) {
        if (days[s].id == dayId) {
            return days[s].dayLabel;
        }
    }
    return "unknown day";
  }

  getStaffName(staffId, staff) {
    for (let s in staff) {
        if (staff[s].id == staffId) {
            return staff[s].lastName + ", " + staff[s].firstName; 
        }
    }
    return "unknown staff";
  }

  preprepareDOs(inputs) {
    let result = [];
    for (const i in inputs) {
        result.push(new AssignmentEntity(
                0,
                inputs[i].staffId,
                inputs[i].dayId,
                0,
                "halfUnit"));
    }
    return result;
  }

  validateDO(req, res) {
    dayOffValidation.eachValid(this.preprepareDOs(req.body));
    dayOffValidation.areValid(req.body);
    this.draftAssignmentModel.dropDODrafts().then(() => {
        this.draftAssignmentModel.AndCreateDODrafts().then(() => {
            this.draftAssignmentModel.dropDraftsErrors().then(() => {
                this.draftAssignmentModel.AndCreateDODraftErrors().then(() => {
                    for (let i in dayOffValidation.validAssignments) {
                        this.draftAssignmentModel.createDO(dayOffValidation.validAssignments[i]).then((newod) => {
                            for(let e in dayOffValidation.validAssignments[i].errorMessages) {
                                this.draftAssignmentModel.createError(newod,
                                    dayOffValidation.validAssignments[i].errorMessages[e]);
                            }
                        });
                    }
                    const result = {
                        assignments: this.prepare(dayOffValidation.validAssignments),
                        quotas: dayOffValidation.quotas,
                        cabinQuotas: dayOffValidation.cabinQuotas
                    };
                    res.json(result)});
                })
            })
        })
  }

  distributeOD(req, res) {
    const assignments = distributeODs.distributeEachDay(
        req.body.start, req.body.end);
    this.draftAssignmentModel.dropODDrafts().then(() => {
        this.draftAssignmentModel.AndCreateODDrafts().then(() => {
            Object.entries(assignments).map(([k,v]) => {
                for (let i in v) {
                    this.draftAssignmentModel.createOD(v[i]);
                }
            });
            const result = {
                assignments: this.prepareODs(assignments)
            };
            res.json(result);
        })
    })
  }

  prepareODs(assignments) {
    let results = {};
    for (let day in assignments) {
        let result =[];
        for (let i = 0; i < assignments[day].length; i++) {
            result.push([
                assignments[day][i].staffId,
                assignments[day][i].dayId,
                assignments[day][i].halfUnit,
                assignments[day][i].errorMessages]);
        }
        results[day] = result;
    }
    return results;
  }

  prepare(assignments) {
    let results = [];
    for (let i = 0; i < assignments.length; i++) {
        results.push([
            assignments[i].staffId,
            assignments[i].dayId,
            assignments[i].errorMessages]);
    }
    return results;
  }
}

module.exports = ActionController;
