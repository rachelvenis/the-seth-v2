const ValidationController = require('./validation-controller');

const DayEntity = require('../../entities/day-entity.js');
const StaffEntity = require('../../entities/staff-entity.js');
const AssignmentEntity = require('../../entities/assignment-entity.js');

let validationController;

let rachy = new StaffEntity(0,
  		"rachy", // name
  		1996, // birthYear
  		"comics", // unit
  		"toonies", // halfUnit
  		false, // newToWalden
  		1, // staffType
  		"comic head staff", // cabin
  		"toonie unit head", // role
  		"female"); //gender

let rachy2 = new StaffEntity(0,
  		"rachy", // name
  		1996, // birthYear
  		"colours", // unit
  		"toonies", // halfUnit
  		false, // newToWalden
  		1, // staffType
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
  		"loonies", // unitCanoeTrip
  		"", // cabinOvernight
  		0, // useItOrLooseIt
  		false, // colourWarsPrep
  		false); // waldenGamesPrep

let dayAlwaysInvalidWithRachy = new DayEntity(0,
  		1, // dayOfCamp
  		false, // rotatingOD
  		true, // everyoneInCamp
  		true, // colourChangeover
  		true, // bunkNight
  		"comics", // unitFieldTrip
  		"comics", // unitPlay
  		true, // noHeadStaffDayOff
  		false, // normalOD
  		"colours", // unitCanoeTrip
  		"comic head staff", // cabinOvernight
  		0, // useItOrLooseIt
  		false, // colourWarsPrep
  		false); // waldenGamesPrep


// beforeAll(() => {
//   validationController = new ValidationController([],[],[]);
//   return;
// });

test('a canoeTrip test', () => {
  let staff = rachy;
  let staff2 = rachy2;
  let invalidDay = dayAlwaysInvalidWithRachy;
  let validDay = dayAlwaysValidWithRachy;
  validationController = new ValidationController(
  	[staff], //allstaff
  	[invalidDay, validDay], //alldays
  	[]); //pastassignment
  // not a counsellor
  expect(validationController.canoeTrip(staff, invalidDay)).toBe(true);
  // on canoe trip
  expect(validationController.canoeTrip(staff2, invalidDay)).toBe(false);
  expect(validationController.canoeTrip(staff2, validDay)).toBe(true);
});

test('a colourCounsellorOvernight test', () => {
  let staff = rachy;
  let staff2 = rachy2;
  let invalidDay = dayAlwaysInvalidWithRachy;
  let validDay = dayAlwaysValidWithRachy;
  validationController = new ValidationController(
    [staff], //allstaff
    [invalidDay, validDay], //alldays
    []); //pastassignment
  // not a counsellor
  expect(validationController.colourCounsellorOvernight(staff, invalidDay)).toBe(true);
  // on colourOvernight
  expect(validationController.colourCounsellorOvernight(staff2, invalidDay)).toBe(false);
  expect(validationController.colourCounsellorOvernight(staff2, validDay)).toBe(true);
});

test('a colourCounsellorChangeover test', () => {
  let staff = rachy;
  let staff2 = rachy2;
  let invalidDay = dayAlwaysInvalidWithRachy;
  let validDay = dayAlwaysValidWithRachy;
  validationController = new ValidationController(
    [staff], //allstaff
    [invalidDay, validDay], //alldays
    []); //pastassignment
  // not a counsellor
  expect(validationController.colourCounsellorChangeover(staff, invalidDay)).toBe(true);
  // on colourChangeover
  expect(validationController.colourCounsellorChangeover(staff2, invalidDay)).toBe(false);
  expect(validationController.colourCounsellorChangeover(staff2, validDay)).toBe(true);
});

test('a isCounsellor test', () => {
  let staff = rachy;
  let staff2 = rachy2;
  validationController = new ValidationController(
    [staff2], //allstaff
    [], //alldays
    []); //pastassignment
  expect(validationController.isCounsellor(staff)).toBe(false);
  expect(validationController.isCounsellor(staff2)).toBe(true);
});
