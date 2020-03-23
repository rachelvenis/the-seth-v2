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

	fillDays = new Promise((resolve, reject) => {
	  setTimeout( function() {
	  fs.createReadStream('./example_data/ExampleDays.csv')
	  .bind(this)
	  .pipe(csv())
	  .on('data', (row) => {
	  	this.allDays.push(new DayEntity(
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
		  row['unitCanoeTrip'],
		  row['cabinOvernight'],
		  parseInt(row['useItOrLooseIt']),
		  row['colourWarsPrep'] == "TRUE",
		  row['waldenGamesPrep'] == "TRUE"
		));
		dayId++;
	  })
	  .on('end', () => {
	    resolve('Days have been successfully processed');
	  });
	  }, 250) 
	});

	fillStaff = new Promise((resolve, reject) => {
	  fs.createReadStream('./example_data/ExampleStaff.csv')
	  .pipe(csv())
	  .on('data', (row) => {
	  	this.allStaff.push(new StaffEntity(
		  staffId,
		  row['name'],
		  parseInt(row['birthYear']),
		  row['unit'],
		  row['halfUnit'],
		  row['newToWalden'] == "TRUE",
		  row['headStaff'] == "TRUE",
		  row['cabin'],
		  row['role'],
		  row['gender'],
		));
		staffId++;
	  })
	  .on('end', () => {
	    resolve('Staff have been successfully processed');
	  });
	});

	fillPastAssignments = new Promise((resolve, reject) => {
	  fs.createReadStream('./example_data/ExamplePastAssignments.csv')
	  .pipe(csv())
	  .on('data', (row) => {
	  	this.allPastAssignments.push(new DayEntity(
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
		  row['unitCanoeTrip'],
		  row['cabinOvernight'],
		  parseInt(row['useItOrLooseIt']),
		  row['colourWarsPrep'] == "TRUE",
		  row['waldenGamesPrep'] == "TRUE"
		));
	  })
	  .on('end', () => {
	    resolve('PastAssignments successfully processed');
	  });
	});

	fillNewAssignments = new Promise((resolve, reject) => {
	  fs.createReadStream('./example_data/ExampleNewAssignments.csv')
	  .pipe(csv())
	  .on('data', (row) => {
	  	this.allNewAssignments.push(new DayEntity(
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
		  row['unitCanoeTrip'],
		  row['cabinOvernight'],
		  parseInt(row['useItOrLooseIt']),
		  row['colourWarsPrep'] == "TRUE",
		  row['waldenGamesPrep'] == "TRUE"
		));
	  })
	  .on('end', () => {
	    resolve('NewAssignments successfully processed');
	  });
	});

	run() {
		this.fillDays.then((successMessage) => {
		  console.log(successMessage);
		  this.fillStaff.then((successMessage) => {
			console.log(successMessage);
			  this.fillNewAssignments.then((successMessage) => {
				  console.log(successMessage);
				  this.fillPastAssignments.then((successMessage) => {
					console.log(successMessage);
				  });
			  });
		  });
		});
	}
}

module.exports = LoadExampleData;