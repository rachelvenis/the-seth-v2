const ValidationController  = require('./validation-controller.js');

const specialtyQuotas = {};
const olderQuotas = {};
const cabinCounsellorQuotas = {};
const seekerCabinQuotas = {};

let isValidErrorMessages = [];
let areValidErrorMessages = [];

let allStaff = [];
let allAssignments = [];
let allDays = [];
// const allStaff = [];

let halfUnitToUnitMapping = {
  "colours": "colours",
  "loonies": "comics",
  "toonies": "comics",
  "planets": "zods",
  "stars": "zods",
  "finders": "seekers",
  "keepers": "seekers"
}

let cabinToHalfUnitMapping = {
  "yellow": "colours",
  "green": "colours",
  "pink": "colours",
  "orange": "colours",
  "red": "colours",
  "blue": "colours",
  "white": "colours",
  "purple": "colours",
  "popeye": "loonies",
  "bugs bunny": "loonies",
  "spiderman": "loonies",
  "muppets": "loonies",
  "betty boop": "loonies",
  "incredibles": "loonies",
  "pink panther": "toonies",
  "road runners": "toonies",
  "kim possible": "toonies",
  "bartman": "toonies",
  "flintstones": "toonies",
  "animaniacs": "toonies",
  "gemini": "planets",
  "libra": "planets",
  "virgo": "planets",
  "leo": "planets",
  "taurus": "planets",
  "aries": "planets",
  "capricorn": "stars",
  "orion": "stars",
  "pisces": "stars",
  "sagittarius": "stars",
  "aquarius": "stars",
  "scorpio": "stars",
  "G1": "finders",
  "G2": "finders",
  "G3": "finders",
  "G4": "finders",
  "B1": "finders",
  "B2": "finders",
  "B3": "finders",
  "B4": "finders",
  "G5": "seekers",
  "G6": "seekers",
  "G7": "seekers",
  "G8": "seekers",
  "B5": "seekers",
  "B6": "seekers",
  "B7": "seekers",
  "B8": "seekers"
}

// const currentYear = 2019

let errorMessage = "";
class DayOffValidationController extends ValidationController {
  constructor(allStaffIn, allAssignmentsIn, allDaysIn) {
    super(allStaffIn, allAssignmentsIn, allDaysIn)
    this.allStaff = allStaffIn;
    this.allAssignments = allAssignmentsIn;
    this.allDays = allDaysIn;
    this.isValidErrorMessages = [];
    this.areValidErrorMessages = [];
    this.validAssignments = [];
    this.quotas = {
      "colours": "success",
      "loonies": "success",
      "toonies": "success",
      "planets": "success",
      "stars": "success",
      "finders": "success",
      "keepers": "success",
      "waterski": "success",
      "swim": "success",
      "sail": "success",
      "canoeyak": "success",
      "campcraft": "success",
      "video": "success",
      "theatre": "success",
      "foodChain": "success",
      "creativeArts": "success",
      "climbing": "success",
      "fitness": "success",
      "sports": "success",
      "tennis": "success",
      "tuck": "success",
      "adventureSports": "success"
    };
    this.cabinQuotas = {
      "colours": [],
      "loonies": [],
      "toonies": [],
      "planets": [],
      "stars": [],
      "finders": [],
      "keepers": []
    };
    this.applyPastAssignments();
  }

  applyPastAssignments() {
    for (let i = 0; i < this.allAssignments.length; i++) {
      let assignment = this.allAssignments[i];
      if (assignment.type == "0") {
        this.allStaff[assignment.staffId].dayOffCount++;
        this.allStaff[assignment.staffId].lastDayOff = this.allDays[assignment.dayId].dayOfCamp;
      } else if (assignment.type == "1") {
        this.allStaff[assignment.staffId].ODCount++;
      }
    }
  }

  eachValid(assignments) {
    let result = true;
    this.validAssignments = [];
    for (let i = 0; i < assignments.length; i++) {
      this.isValid(assignments[i]);
    }
    return result;
  }

  isValid(assignment) {
    this.threeNightsBetween(assignment);
    this.everyoneInCamp(assignment);
    this.noHeadStaffDayOff(assignment);
    this.haveDayOffLeft(assignment);
    if(this.isCounsellor(assignment)) {
      this.canoeTrip(assignment);
      this.unitTrip(assignment);
      this.unitPlay(assignment);
      this.colourCounsellorOvernight(assignment);
      this.colourCounsellorChangeover(assignment);
    }
    this.validAssignments.push(assignment);
  }

  updateOlderQuotas(allStaff) {
    let pastCount = 0;
    for (let i = 0; i < this.allStaff.length; i++) {
      if (this.allStaff[i].staffType == 0 &&
        this.allStaff[i].birthYear <= (this.currentYear - 19)) {
        let key = this.allStaff[i].role == "counsellor" ?
          this.allStaff[i].halfUnit : this.allStaff[i].role;
        pastCount = key in olderQuotas ? olderQuotas[key] : 0;
        olderQuotas[key] = pastCount + 1;
      }
    }
  }


updateSeekerCabinQuotas(allStaff){
    let pastCount = 0;
    for (let i = 0; i < this.allStaff.length; i++){
      let currentStaff = this.allStaff[i];
      if (halfUnitToUnitMapping[currentStaff.halfUnit] == "seekers"){
        pastCount= currentStaff.cabin in seekerCabinQuotas ? seekerCabinQuotas[currentStaff.cabin] : 0;
        seekerCabinQuotas[currentStaff.cabin] = pastCount + 1;
      }
    }
  }

  updateCabinCounsellorQuotas(allStaff){
    let pastCount = 0;
    for (let i = 0; i < this.allStaff.length; i++){
      if (this.allStaff[i].role == "counsellor"){
        pastCount = this.allStaff[i].cabin in cabinCounsellorQuotas ?
          cabinCounsellorQuotas[this.allStaff[i].cabin] : 0;
        cabinCounsellorQuotas[this.allStaff[i].cabin] = pastCount + 1;
      }
    }
  }

  updateSpeialtyQuotas(){
    specialtyQuotas["swim"] = 11;
    specialtyQuotas["sail"] = 2;
    specialtyQuotas["waterski"] = 4;
    specialtyQuotas["canoeyak"] = 3;
    specialtyQuotas["campcraft"] = 3;
    specialtyQuotas["video"] = -1;
    specialtyQuotas["theatre"] = -1;
    specialtyQuotas["foodChain"] = 2;
    specialtyQuotas["creativeArts"] = 4;
    specialtyQuotas["climbing"] = 5;
    specialtyQuotas["fitness"] = 3;
    specialtyQuotas["sports"] = 4;
    specialtyQuotas["tennis"] = 2;
    specialtyQuotas["tuck"] = 1;
    specialtyQuotas["adventureSports"] = 4;
  }

  // stringify(quotas){
  //   String let result = "[ ";
  //   Iterator it = quotas.entrySet().iterator();
  //   while (it.hasNext()) {
  //     Map.Entry pair = (Map.Entry)it.next();
  //     result+="\n\t"+pair.getKey()+" -> "+pair.getValue();
  //     // it.remove(); // avoids a ConcurrentModificationException
  //   }
  //   result+="\n]";
  //   return result;
  // }

  areValid(assignments){
    this.updateSpeialtyQuotas();
    this.updateOlderQuotas(allStaff);
    this.updateCabinCounsellorQuotas(allStaff);
    this.updateSeekerCabinQuotas(allStaff);
    this.halfCounsellors(allStaff,assignments);
    this.oneThirdOfOlder(allStaff,assignments);
    this.specialtyQuota(allStaff,assignments);
    this.seekerCabinQuota(allStaff,assignments);
  }


  //individual validations
  unitTrip(assignment){
    const staff = this.allStaff[assignment.staffId];
    const day = this.allDays[assignment.dayId];
    let result = !(halfUnitToUnitMapping[staff.halfUnit] == day.unitFieldTrip);
    if (!result) assignment.errorMessages.push("unit(" + day.unitFieldTrip + 
      ") is on their unit trip.");
    return result;
  }

  unitPlay(assignment){
    const staff = this.allStaff[assignment.staffId];
    const day = this.allDays[assignment.dayId];
    let result = !(halfUnitToUnitMapping[staff.halfUnit] == day.unitPlay);
    if (!result) assignment.errorMessages.push("unit(" + day.unitPlay +
      ") play is that night");
    return result;
  }

  noHeadStaffDayOff(assignment){
    const staff = this.allStaff[assignment.staffId];
    const day = this.allDays[assignment.dayId];
    let result = staff.staffType == 1 ? !day.noHeadStaffDayOff : true;
    if (!result) assignment.errorMessages.push("no head staff day " + 
      "offs allowed on this day");
    return result;
  }

  haveDayOffLeft(assignment){
    const staff = this.allStaff[assignment.staffId];
    let result = staff.dayOffCount <= staff.allowedDaysOff; 
    if (!result) assignment.errorMessages.push("don't have any days " + 
      "off left");
    return result;
  }

  everyoneInCamp(assignment){
    const staff = this.allStaff[assignment.staffId];
    const day = this.allDays[assignment.dayId];
    let result = !day.everyoneInCamp;
    if (!result) assignment.errorMessages.push(// worth having staff here for error message? staff.firstName + staff.lastName +
      "everyone must be in camp that day.");
    return result;
  }

  threeNightsBetween(assignment){
    const staff = this.allStaff[assignment.staffId];
    const day = this.allDays[assignment.dayId];
    let result = staff.lastDayOff != 0 ?
      day.dayOfCamp - staff.lastDayOff > 4 :
      true;
    if (!result) assignment.errorMessages.push("last day " + 
      "off was not at least 3 nights in camp");
    return result;
  }

  //quota validations
  halfCounsellors(allStaff, assignments){
    let currentCabinCounts =  {};
    let pastCount = 0;
    for (let i = 0; i < assignments.length; i++){
      let currentStaff = this.allStaff[assignments[i].staffId];
      if (currentStaff.role == "counsellor" &&
        !(halfUnitToUnitMapping[currentStaff.halfUnit] == "seekers")){
        pastCount = currentStaff.cabin in currentCabinCounts ? currentCabinCounts[currentStaff.cabin] : 0;
        currentCabinCounts[currentStaff.cabin] = pastCount + 1;
      }
    }
    let result = true;
    for(const cabin in currentCabinCounts) {
      if ((cabinCounsellorQuotas[cabin]/2) < currentCabinCounts[cabin]){
        this.cabinQuotas[cabinToHalfUnitMapping[cabin]].push(cabin);
        let result = false;
      }
    }
    return result;
  }

  oneThirdOfOlder(allStaff, assignments){
    let currentQuotaCounts =  {};
    let pastCount = 0;
    for (let i = 0; i < assignments.length; i++){
      let currentStaff = this.allStaff[assignments[i].staffId];
      let key = currentStaff.role == "counsellor" ?
        currentStaff.halfUnit : currentStaff.role;
      if (currentStaff.role == "counsellor") {
        pastCount = key in currentQuotaCounts ? currentQuotaCounts[key] : 0;
        currentQuotaCounts[key] = pastCount + 1;
      }
    }
    let result = true;
    for(const quota in currentQuotaCounts) {
      if ((olderQuotas[quota]/3) < currentQuotaCounts[quota]){
        this.quotas[quota] = "error";
        let result = false;
      }
    }
    return result;
  }

  specialtyQuota(allStaff, assignments){
    let currentSpecialtyCounts =  {};
    let pastCount = 0;
    let newCount = 0;
    for (let i = 0; i < assignments.length; i++){
      let currentStaff = this.allStaff[assignments[i].staffId]; 
      if (!currentStaff.role == "counsellor" && currentStaff.staffType == 0) {
        pastCount = currentStaff.cabin in currentSpecialtyCounts ?
          currentSpecialtyCounts[currentStaff.cabin] : 0;
        newCount = pastCount + 1;
        if (newCount > specialtyQuotas[currentStaff.role]){
          this.quotas[currentStaff.role] = "error";
          return false;
        }
        currentSpecialtyCounts[currentStaff.cabin] = newCount;
      }
    }
    return true;
  }
  seekerCabinQuota(allStaff, assignments){
    let currentQuotaCounts =  {};
    let pastCount = 0;
    for (let i = 0; i < assignments.length;i++){
      let currentStaff = this.allStaff[assignments[i].staffId];
      if (halfUnitToUnitMapping[currentStaff.halfUnit] == "seekers"){
        pastCount = currentStaff.cabin in currentQuotaCounts ? currentQuotaCounts[currentStaff.cabin] : 0;
        currentQuotaCounts[currentStaff.cabin] = pastCount + 1;
      }
    }
    let result = true;
    for(const quota in currentQuotaCounts) {
      if ((seekerCabinQuotas[quota]/2) < currentQuotaCounts[quota]){
        this.cabinQuotas[cabinToHalfUnitMapping[quota]].push(quota);
        let result = false;
      }
    }
    return result;
  }
}

module.exports = DayOffValidationController;