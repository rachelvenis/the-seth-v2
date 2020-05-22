const csv = require('csv-parser');
const fs = require('fs');

const DayEntity = require('./entities/day-entity.js');
const StaffEntity = require('./entities/staff-entity.js');
const AssignmentEntity = require('./entities/assignment-entity.js');

let assignmentId = 0;
let staffId = 0;
let dayId = 0;

class LoadExampleData {
	constructor(){
		this.allDays = [];
		this.allStaff = [];
		this.allNewAssignments = [];
		this.allPastAssignments = [];
	}

	fillDays(){
		return new Promise((resolve, reject) => {
		  setTimeout( function() {
		  let allDays = [];
		  fs.createReadStream('./example_data/ExampleDays.csv')
		  .pipe(csv())
		  .on('data', (row) => {
		  	allDays.push(new DayEntity(
		  	  dayId,
			  parseInt(row['dayOfCamp']),
			  row['rotatingOD'] == "TRUE",
			  row['everyoneInCamp'] == "TRUE",
			  row['colourChangeover'] == "TRUE",
			  row['bunkNight'] == "TRUE",
			  row['unitFieldTrip'],
			  row['unitPlay'],
			  row['noHeadStaffDayOff'] == "TRUE",
			  row['normalOD'] == "TRUE",
			  row['halfUnitCanoeTrip'],
			  row['cabinOvernight'],
			  parseInt(row['useItOrLooseIt']),
			  row['colourWarsPrep'] == "TRUE",
			  row['waldenGamesPrep'] == "TRUE"
			));
			dayId++;
		  })
		  .on('end', () => {
		  	console.log('Days have been successfully processed');
		    resolve(allDays);
		  });
		  }, 250) 
		});
	}

	fillStaff(){
		return new Promise((resolve, reject) => {
		  let allStaff = [];
		  fs.createReadStream('./example_data/ExampleStaff.csv')
		  .pipe(csv())
		  .on('data', (row) => {
		  	allStaff.push(new StaffEntity(
			  staffId,
			  row['firstName'],
			  row['lastName'],
			  parseInt(row['birthYear']),
			  row['halfUnit'],
			  row['newToWalden'] == "TRUE",
			  row['staffType'],
			  row['cabin'],
			  row['role'],
			  row['gender'],
			));
			staffId++;
		  })
		  .on('end', () => {
		    console.log('Staff have been successfully processed');
		    resolve(allStaff);
		  });
		});
	}

	fillPastAssignments(){
		return new Promise((resolve, reject) => {
		  let allPastAssignments = [];
		  fs.createReadStream('./example_data/ExamplePastAssignments.csv')
		  .pipe(csv())
		  .on('data', (row) => {
		  	allPastAssignments.push(new AssignmentEntity(
				assignmentId,
				row["StaffIndex"],
				row["DayIndex"],
				row["type"],
				"halfUnit"
			));
		    assignmentId++;
		  })
		  .on('end', () => {
		    console.log('PastAssignments successfully processed');
		    resolve(allPastAssignments);
		  });
		});
	}

	fillNewAssignments(){
		return new Promise((resolve, reject) => {
		  let allNewAssignments = [];
		  fs.createReadStream('./example_data/ExampleNewAssignments.csv')
		  .pipe(csv())
		  .on('data', (row) => {
		  	allNewAssignments.push(new AssignmentEntity(
				assignmentId,
				row["StaffIndex"],
				row["DayIndex"],
				"type",
				"halfUnit"
			));
		    assignmentId++;
		  })
		  .on('end', () => {
		    console.log('NewAssignments successfully processed');
		    resolve(allNewAssignments);
		  });
		});
	}

	run() {
	  return new Promise((resolve, reject) => {
		let allDays = [];
		let allStaff = [];
		let allNewAssignments = [];
		let allPastAssignments = [];
		this.fillDays().then((days) => {
		  allDays = days;
		  this.fillStaff().then((staff) => {
			allStaff = staff;
			this.fillNewAssignments().then((newAssignments) => {
				allNewAssignments = newAssignments;
				this.fillPastAssignments().then((pastAssignments) => {
					allPastAssignments = pastAssignments;
					resolve({allDays, allStaff, allPastAssignments, allNewAssignments});
				});
			});
		  });
		});
	  })
	}
}

module.exports = LoadExampleData;