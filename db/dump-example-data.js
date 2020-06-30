const StaffModel  = require('../models/staff-model');
const AssignmentModel  = require('../models/assignment-model');

const LoadExampleData = require('../loadExampleData');
const db = require('./db');

const staffModel = new StaffModel();
const assignmentModel = new AssignmentModel();

// db.db.run(`DROP TABLE IF EXISTS assignment`);

// db.db.run(`CREATE TABLE IF NOT EXISTS assignment(
//   id            INTEGER PRIMARY KEY  AUTOINCREMENT, 
//   dayId         INTEGER NOT NULL, 
//   staffId       INTEGER NOT NULL,
//   type          TEXT,
//   halfUnit      TEXT,
//   FOREIGN KEY(dayId) REFERENCES day(id),
//   FOREIGN KEY(staffId) REFERENCES staff(id)
// )`);


// db.db.run(`CREATE TABLE IF NOT EXISTS staff(
//   id                INTEGER  PRIMARY KEY  AUTOINCREMENT,
//   firstName         TEXT NOT NULL,
//   lastName          TEXT NOT NULL,
//   od_count          INTEGER,
//   allowed_days_off  INTEGER,
//   colour_wars_duty  INTEGER,
//   walden_games_duty INTEGER,
//   rotating_od       INTEGER,
//   birth_year        INTEGER NOT NULL,
//   half_unit         TEXT NOT NULL,
//   new_to_walden     INTEGER DEFAULT 0,
//   day_off_count     INTEGER,
//   head_staff        INTEGER DEFAULT 0,
//   cabin             TEXT NOT NULL,
//   gender            TEXT NOT NULL,
//   last_day_off      INTEGER,
//   role              TEXT NOT NULL
// )`);

// const loadExampleData = new LoadExampleData();
// loadExampleData.run().then((results) => {
// 	// pastAssignments = results.allPastAssignments;
// 	// newAssignments = results.allNewAssignments;
//     // db.init();
// 	for(const staff of results.allStaff) {
// 		console.log(staff.firstName);
// 		staffModel.create(staff);
// 	};
// 	// allDays = results.allDays;
//   });

const loadExampleData = new LoadExampleData();
loadExampleData.run().then((results) => {
	// pastAssignments = results.allPastAssignments;
	// newAssignments = results.allNewAssignments;
    // db.init();
	for(const assignment of results.allPastAssignments) {
		console.log(assignment.halfUnit);
		assignmentModel.create(assignment);
	};
	// allDays = results.allDays;
  });