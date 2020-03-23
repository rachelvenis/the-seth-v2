
const LoadExampleData = require('./loadExampleData');
const DayOffValidation = require('./controllers/validations/day-off-validations-controller.js');

// let pastAssignments = [];
// let newAssignments = [];
// let allStaff = [];
// let allDays = [];


const loadExampleData = new LoadExampleData();
loadExampleData.run();

const pastAssignments = loadExampleData.allPastAssignments;
const newAssignments = loadExampleData.allNewAssignments;
const allStaff = loadExampleData.allStaff;
const allDays = loadExampleData.allDays;

console.log(pastAssignments);
console.log(newAssignments);
console.log(allStaff);
console.log(allDays);
// const hi = new DayOffValidation(allStaff, allAssignments, allDays);
// const result = hi.eachValid([{
// 	id: 0, 
// 	staffId: 0, 
// 	dayId: 0,
// 	type: "type", 
// 	halfUnit: "halfUnit"
// }]);
