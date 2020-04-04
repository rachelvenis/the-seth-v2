const ODValidationController = require('./OD-validations-controller');

const DayEntity = require('../../entities/day-entity.js');
const StaffEntity = require('../../entities/staff-entity.js');
const AssignmentEntity = require('../../entities/assignment-entity.js');

let oDValidationController;

let rachy = new StaffEntity(0,
  		"rachy", // name
  		1996, // birthYear
  		"comics", // unit
  		"toonies", // halfUnit
  		false, // newToWalden
  		true, // headStaff
  		"comic head staff", // cabin
  		"toonie unit head", // role
  		"female"); //gender

let rachy2 = new StaffEntity(0,
      "rachy", // name
      1996, // birthYear
      "colours", // unit
      "toonies", // halfUnit
      false, // newToWalden
      false, // headStaff
      "comic head staff", // cabin
      "counsellor", // role
      "female"); //gender

let dayAlwaysValidWithRachy = new DayEntity(0,
  		1, // dayOfCamp
  		false, // rotatingOD
  		false, // everyoneInCamp
  		false, // colourChangeover
  		true, // bunkNight
  		"colours", // unitFieldTrip
  		"colours", // unitPlay
  		false, // noHeadStaffDayOff
  		false, // normalOD
  		"", // unitCanoeTrip
  		"", // cabinOvernight
  		0, // useItOrLooseIt
  		false, // colourWarsPrep
  		false); // waldenGamesPrep

let dayAlwaysInvalidWithRachy = new DayEntity(0,
  		1, // dayOfCamp
  		false, // rotatingOD
  		true, // everyoneInCamp
  		false, // colourChangeover
  		true, // bunkNight
  		"comics", // unitFieldTrip
  		"comics", // unitPlay
  		true, // noHeadStaffDayOff
  		false, // normalOD
  		"", // unitCanoeTrip
  		"", // cabinOvernight
  		0, // useItOrLooseIt
  		true, // colourWarsPrep
  		true); // waldenGamesPrep


// beforeAll(() => {
//   oDValidationController = new ODValidationController([],[],[]);
//   return;
// });


test('a hasColourWarsDuties test', () => {
  let staff = rachy;
  staff.setColourWarsDuty(true);
  let invalidDay = dayAlwaysInvalidWithRachy;
  let validDay = dayAlwaysValidWithRachy;
  oDValidationController = new ODValidationController(
  	[staff], //allstaff
  	[invalidDay, validDay], //alldays
  	[]); //pastassignment
  expect(oDValidationController.hasColourWarsDuties(staff, invalidDay)).toBe(false);
  expect(oDValidationController.hasColourWarsDuties(staff, validDay)).toBe(true);
});

test('a hasWaldenGamesDuties test', () => {
  let staff = rachy;
  staff.setWaldenGamesDuty(true);
  let invalidDay = dayAlwaysInvalidWithRachy;
  let validDay = dayAlwaysValidWithRachy;
  oDValidationController = new ODValidationController(
    [staff], //allstaff
    [invalidDay, validDay], //alldays
    []); //pastassignment
  expect(oDValidationController.hasWaldenGamesDuties(staff, invalidDay)).toBe(false);
  expect(oDValidationController.hasWaldenGamesDuties(staff, validDay)).toBe(true);
});

test('a numberOfODsDone test', () => {
  let staff = rachy;
  staff.setODCount(1);
  let staff2 = rachy2;
  staff2.setODCount(0);
  oDValidationController = new ODValidationController(
    [staff], //allstaff
    [], //alldays
    []); //pastassignment
  oDValidationController.setglobalRoundOfOD(1)
  expect(oDValidationController.numberOfODsDone(staff)).toBe(false);
  expect(oDValidationController.numberOfODsDone(staff2)).toBe(true);
});


test('a regularStaff test', () => {
  let staff = rachy;
  let staff2 = rachy2;
  let invalidDay = dayAlwaysInvalidWithRachy;
  let validDay = dayAlwaysValidWithRachy;
  oDValidationController = new ODValidationController(
    [staff], //allstaff
    [invalidDay, validDay], //alldays
    []); //pastassignment
  expect(oDValidationController.regularStaff(staff)).toBe(false);
  expect(oDValidationController.regularStaff(staff2)).toBe(true);
});

test('WIPa onDayOff test', () => {
  let staff = rachy;
  let day = dayAlwaysInvalidWithRachy;
  oDValidationController = new ODValidationController(
  	[staff], //allstaff
  	[day], //alldays
  	[]); //pastassignment
  expect(oDValidationController.onDayOff(staff)).toBe(true);
});
// TODO tests for eachValid and isValid
// TODO tests error messages