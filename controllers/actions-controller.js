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
  		assignments: [[0, 1, 2]],
		errors: { eachValid: dayOffValidation.isValidErrorMessages, 
			areValid: dayOffValidation.areValidErrorMessages}};
	res.json(result);
  }

  distributeOD(req, res) {
	distributeODs.distributeEachDay(req.body.start, req.body.end);
  	const result = {
  		assignments: [[1, 2, 3]],
		errors: { eachValid: dayOffValidation.isValidErrorMessages, 
			areValid: dayOffValidation.areValidErrorMessages}};
	res.json(result);
  }
}

module.exports = ActionController;
