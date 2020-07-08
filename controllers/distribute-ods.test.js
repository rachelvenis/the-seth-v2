const DistributeODs = require('./distribute-ods');

const DayEntity = require('../entities/day-entity.js');
const StaffEntity = require('../entities/staff-entity.js');
const AssignmentEntity = require('../entities/assignment-entity.js');

let distributeODs;

let dayWithoutCanoeTrip = new DayEntity(0,
  		1, // dayOfCamp
  		false, // rotatingOD
  		false, // everyoneInCamp
  		false, // colourChangeover
  		true, // bunkNight
  		"colours", // unitFieldTrip
  		"colours", // unitPlay
  		false, // noHeadStaffDayOff
  		true, // normalOD
  		"", // halfUnitCanoeTrip
  		"", // cabinOvernight
  		0, // useItOrLooseIt
  		false, // colourWarsPrep
  		false, // waldenGamesPrep
      "June 28");

let dayWithCanoeTrip = new DayEntity(0,
  		1, // dayOfCamp
  		false, // rotatingOD
  		true, // everyoneInCamp
  		true, // colourChangeover
  		true, // bunkNight
  		"comics", // unitFieldTrip
  		"comics", // unitPlay
  		true, // noHeadStaffDayOff
  		true, // normalOD
  		"colours", // halfUnitCanoeTrip
  		"comic head staff", // cabinOvernight
  		0, // useItOrLooseIt
  		false, // colourWarsPrep
  		false, // waldenGamesPrep
      "June 28");


// beforeAll(() => {
//   validationController = new ValidationController([],[],[]);
//   return;
// });

test('a getNeededODs test', () => {
  let day = dayWithoutCanoeTrip;
  let day2 = dayWithCanoeTrip;
  distributeODs = new DistributeODs();
  // not a counsellor
  expect(distributeODs.getNeededODs(day)).toStrictEqual({
      colours: {"female" : 3, "male": 3},
      loonies: {"female" : 2, "male": 2},
      toonies: {"female" : 2, "male": 2},
      planets: {"female" : 2, "male": 2},
      stars: {"female" : 2, "male": 2},
      finders: {"female" : 2, "male": 2},
      keepers: {"female" : 2, "male": 2}
    });
  // on canoe trip
  expect(distributeODs.getNeededODs(day2)).toStrictEqual({
      loonies: {"female" : 2, "male": 2},
      toonies: {"female" : 2, "male": 2},
      planets: {"female" : 2, "male": 2},
      stars: {"female" : 2, "male": 2},
      finders: {"female" : 2, "male": 2},
      keepers: {"female" : 2, "male": 2}
    });
});

// test('a colourCounsellorOvernight test', () => {
//   let staff = rachy;
//   let staff2 = rachy2;
//   let invalidDay = dayAlwaysInvalidWithRachy;
//   let validDay = dayAlwaysValidWithRachy;
//   validationController = new ValidationController(
//     [staff], //allstaff
//     [invalidDay, validDay], //alldays
//     []); //pastassignment
//   // not a counsellor
//   expect(validationController.colourCounsellorOvernight(staff, invalidDay)).toBe(true);
//   // on colourOvernight
//   expect(validationController.colourCounsellorOvernight(staff2, invalidDay)).toBe(false);
//   expect(validationController.colourCounsellorOvernight(staff2, validDay)).toBe(true);
// });

// test('a colourCounsellorChangeover test', () => {
//   let staff = rachy;
//   let staff2 = rachy2;
//   let invalidDay = dayAlwaysInvalidWithRachy;
//   let validDay = dayAlwaysValidWithRachy;
//   validationController = new ValidationController(
//     [staff], //allstaff
//     [invalidDay, validDay], //alldays
//     []); //pastassignment
//   // not a counsellor
//   expect(validationController.colourCounsellorChangeover(staff, invalidDay)).toBe(true);
//   // on colourChangeover
//   expect(validationController.colourCounsellorChangeover(staff2, invalidDay)).toBe(false);
//   expect(validationController.colourCounsellorChangeover(staff2, validDay)).toBe(true);
// });

// test('a isCounsellor test', () => {
//   let staff = rachy;
//   let staff2 = rachy2;
//   validationController = new ValidationController(
//     [staff2], //allstaff
//     [], //alldays
//     []); //pastassignment
//   expect(validationController.isCounsellor(staff)).toBe(false);
//   expect(validationController.isCounsellor(staff2)).toBe(true);
// });
