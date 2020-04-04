
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

	const hi = new DayOffValidation(allStaff, pastAssignments, allDays);

	// console.log("allPastAssignments... " + results.allPastAssignments);
	// console.log("allNewAssignments... " + results.allNewAssignments);
	// console.log("allStaff... " + results.allStaff);
	// console.log("allDays... " + results.allDays);

	console.log("eachValid(newAssignments) " + hi.eachValid(results.allNewAssignments));
	console.log("areValid(newAssignments) " + hi.areValid(results.allNewAssignments));

	let distributeODs = new DistributeODs(allStaff, pastAssignments, allDays);
	distributeODs.getODAssignments(allDays[1])
  });
