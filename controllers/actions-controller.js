const Controller = require('./controller');
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
let newAssignments = [];
let allStaff = [];
let allDays = [];

let dayOffValidation;
let distributeODs;

class ActionController {
  constructor() {
    const loadExampleData = new LoadExampleData();
    loadExampleData.run().then((results) => {
        pastAssignments = results.allPastAssignments;
        newAssignments = results.allNewAssignments;
        allStaff = results.allStaff;
        allDays = results.allDays;
        dayOffValidation = new DayOffValidation(allStaff, pastAssignments, allDays);
        distributeODs = new DistributeODs(allStaff, pastAssignments, allDays);
    });
    this.assignmentModel = new AssignmentModel();
    this.staffModel = new StaffModel();
    this.dayModel = new DayModel();
  }

  generatePDF(res) {
    const doc = new PDFDocument();
    doc.pipe(res);
    let allDays = [];
    let allStaff = [];
    let allAssignments = [];
    this.assignmentModel.findAll().then((assignments) => {
        allAssignments = assignments;
        this.staffModel.findAll().then((staff) => {
            allStaff = staff;
            this.dayModel.findAll().then((days) => {
                allDays = days;
                for (let assignment in allAssignments) {
                    let result = "";
                    for (let s in allStaff) {
                        if (allStaff[s].id == allAssignments[assignment].staffId) {
                            result += allStaff[s].firstName + " " + allStaff[s].lastName; 
                        }
                    }
                    result += " - "
                    for (let s in allDays) {
                        if (allDays[s].id == allAssignments[assignment].dayId) {
                            result += allDays[s].dayOfCamp; 
                        }
                    }
                    result += " - " + (allAssignments[assignment].type == 1 ? "OD - " + allAssignments[assignment].halfUnit : "Day Off");
                    doc.text(result);
                }
                doc.end();
            });
        });
    });
  }

  preprepare(inputs) {
    let result = [];
    for (const i in inputs) {
        result.push(new AssignmentEntity(
                0,
                inputs[i].staffId,
                inputs[i].dayId,
                "type",
                "halfUnit"));
    }
    return result;
  }

  validateDO(req, res) {
    dayOffValidation.eachValid(this.preprepare(req.body));
    dayOffValidation.areValid(req.body);
    const result = {
        assignments: this.prepare(dayOffValidation.validAssignments),
        quotas: dayOffValidation.quotas,
        cabinQuotas: dayOffValidation.cabinQuotas
    };
    res.json(result);
  }

  distributeOD(req, res) {
    const assignments = distributeODs.distributeEachDay(
        req.body.start, req.body.end);
    const result = {
        assignments: this.prepareODs(assignments)
    };
    res.json(result);
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
