
const LoadExampleData = require('./loadExampleData');
const DayOffValidation = require('./controllers/validations/day-off-validations-controller.js');
const DistributeODs = require('./controllers/distribute-ods.js');

let pastAssignments = [];
let newAssignments = [];
let allStaff = [];
let allDays = [];

const loadExampleData = new LoadExampleData();
loadExampleData.run().then((results) => {
	pastAssignments = results.allPastAssignments;
	newAssignments = results.allNewAssignments;
	allStaff = results.allStaff;
	allDays = results.allDays;

	const dayOffValidation = new DayOffValidation(allStaff, pastAssignments, allDays);

	// console.log("allPastAssignments... " + results.allPastAssignments);
	// console.log("allNewAssignments... " + results.allNewAssignments);
	// console.log("allStaff... " + results.allStaff);
	// console.log("allDays... " + results.allDays);

	console.log("eachValid(newAssignments) " + dayOffValidation.eachValid(results.allNewAssignments));
	console.log("areValid(newAssignments) " + dayOffValidation.areValid(results.allNewAssignments));

	let distributeODs = new DistributeODs(allStaff, pastAssignments, allDays);
	distributeODs.distributeEachDay(4, 6)
  });
