const Controller = require('./controller');
const AssignmentModel  = require('../models/assignment-model');
const AssignmentEntity = require('../entities/assignment-entity');
const LoadExampleData = require('../loadExampleData');
const DistributeODs = require('../controllers/distribute-ods.js');
const DayOffValidation = require('../controllers/validations/day-off-validations-controller.js');


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
  }

  validateDO(res) {
    dayOffValidation.eachValid(newAssignments);
    dayOffValidation.areValid(newAssignments);
    const result = {
        assignments: this.prepare(dayOffValidation.validAssignments),
        errors: { eachValid: dayOffValidation.isValidErrorMessages, 
            areValid: dayOffValidation.areValidErrorMessages}};
    res.json(result);
  }

  distributeOD(req, res) {
    const assignments = distributeODs.distributeEachDay(
        req.body.start, req.body.end);
    const result = {
        assignments: this.prepare(assignments),
        errors: {
            eachValid: dayOffValidation.isValidErrorMessages,
            areValid: dayOffValidation.areValidErrorMessages
        }
    };
    res.json(result);
  }

  prepare(assignments) {
    let results = [];
    for (let i = 0; i < assignments.length; i++) {
        results.push([
            assignments[i].staffId,
            assignments[i].dayId,
            assignments[i].halfUnit]);
    }
    return results;
  }
}

module.exports = ActionController;
