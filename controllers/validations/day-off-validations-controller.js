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

let validAssignments = [];
let quotas = [];

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
      console.log(assignments[i]);
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
      if (currentStaff.role == "counsellor" && !(halfUnitToUnitMapping[currentStaff.halfUnit] == "seekers")){
        pastCount = currentStaff.cabin in currentCabinCounts ? currentCabinCounts[currentStaff.cabin] : 0;
        currentCabinCounts[currentStaff.cabin] = pastCount + 1;
      }
    }
    let result = true;
    for(const cabin in currentCabinCounts) {
      if ((cabinCounsellorQuotas[cabin]/2) < currentCabinCounts[cabin]){
        this.areValidErrorMessages.add("More than half of the counsellors in " +
          cabin + " are trying to take a day off on the same day");
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
        this.areValidErrorMessages.add("More than one third of the staff on " + pair.getKey() +
          " are trying to take days off on the same day");
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
          this.areValidErrorMessages.push("More than " + specialtyQuotas[currentStaff.role] +
            " " + currentStaff.role + " staff are trying to take days off on the same day");
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
          this.areValidErrorMessages.push("More than " + quota +
            " " + currentQuotaCounts[quota] + " staff are trying to take days off on the same day");
        let result = false;
      }
    }
    return result;
  }
}

module.exports = DayOffValidationController;