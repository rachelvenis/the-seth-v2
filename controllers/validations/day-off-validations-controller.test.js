const DayOffValidationController = require('./day-off-validations-controller');

const DayEntity = require('../../entities/day-entity.js');
const StaffEntity = require('../../entities/staff-entity.js');
const AssignmentEntity = require('../../entities/assignment-entity.js');

let dayOffValidationController;

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
  		false, // colourWarsPrep
  		false); // waldenGamesPrep


// beforeAll(() => {
//   dayOffValidationController = new DayOffValidationController([],[],[]);
//   return;
// });


test('a unitTrip test', () => {
  let staff = rachy;
  let invalidDay = dayAlwaysInvalidWithRachy;
  let validDay = dayAlwaysValidWithRachy;
  dayOffValidationController = new DayOffValidationController(
  	[staff], //allstaff
  	[invalidDay, validDay], //alldays
  	[]); //pastassignment
  expect(dayOffValidationController.unitTrip(staff, invalidDay)).toBe(false);
  expect(dayOffValidationController.unitTrip(staff, validDay)).toBe(true);
});

test('a unitPlay test', () => {
  let staff = rachy;
  let invalidDay = dayAlwaysInvalidWithRachy;
  let validDay = dayAlwaysValidWithRachy;
  dayOffValidationController = new DayOffValidationController(
    [staff], //allstaff
    [invalidDay, validDay], //alldays
    []); //pastassignment
  expect(dayOffValidationController.unitPlay(staff, invalidDay)).toBe(false);
  expect(dayOffValidationController.unitPlay(staff, validDay)).toBe(true);
});

test('a noHeadStaffDayOff test', () => {
  let staff = rachy;
  let invalidDay = dayAlwaysInvalidWithRachy;
  let validDay = dayAlwaysValidWithRachy;
  dayOffValidationController = new DayOffValidationController(
    [staff], //allstaff
    [invalidDay, validDay], //alldays
    []); //pastassignment
  expect(dayOffValidationController.noHeadStaffDayOff(staff, invalidDay)).toBe(false);
  expect(dayOffValidationController.noHeadStaffDayOff(staff, validDay)).toBe(true);
});

test('WIPa haveDayOffsLeft test', () => {
  let staff = rachy;
  let day = dayAlwaysInvalidWithRachy;
  dayOffValidationController = new DayOffValidationController(
  	[staff], //allstaff
  	[day], //alldays
  	[]); //pastassignment
  expect(dayOffValidationController.haveDayOffsLeft(staff)).toBe(false);
});


test('a everyoneInCamp test', () => {
  let staff = rachy;
  let invalidDay = dayAlwaysInvalidWithRachy;
  let validDay = dayAlwaysValidWithRachy;
  dayOffValidationController = new DayOffValidationController(
    [staff], //allstaff
    [invalidDay, validDay], //alldays
    []); //pastassignment
  expect(dayOffValidationController.everyoneInCamp(invalidDay)).toBe(false);
  expect(dayOffValidationController.everyoneInCamp(validDay)).toBe(true);
});


test('WIPa threeNightsBetween test', () => {
  let staff = rachy;
  let day = dayAlwaysInvalidWithRachy;
  dayOffValidationController = new DayOffValidationController(
  	[staff], //allstaff
  	[day], //alldays
  	[]); //pastassignment
  expect(dayOffValidationController.threeNightsBetween(staff,day)).toBe(false);
});