const ValidationController  = require('./validation-controller.js');

const specialtyQuotas = {};
const olderQuotas = {};
const cabinCounsellorQuotas = {};
const seekerCabinQuotas = {};

let isValidErrorMessages = [];

let allStaff = [];
let allAssignments = [];
let allDays = [];
// const allStaff = [];

let areValidErrorMessages = [];

let halfUnitToUnitMapping = {
  "colours": "colours",
  "loonies": "comics",
  "toonies": "comics",
  "planets": "zods",
  "stars": "zods",
  "finders": "seekers",
  "keepers": "seekers"
}

// const currentYear = 2019

let errorMessage = "";
class DayOffValidationController extends ValidationController {
  constructor(allStaffIn, allAssignmentsIn, allDaysIn) {
    super()     
    // this.validationModel = new ValidationModel();
    this.allStaff = allStaffIn;
    this.allAssignments = allAssignmentsIn;
    this.allDays = allDaysIn;
    this.applyPastAssignments();
  }

  applyPastAssignments() {
    for (let i = 0; i < this.allAssignments.length; i++) {
      let assignment = this.allAssignments[i];
      console.log("staffId = " + assignment.staffId + ", dayId = " + assignment.dayId + ", type = " + assignment.type + ", halfUnit = " + assignment.halfUnit)
      if (assignment.type == "0") {
        this.allStaff[assignment.staffId].dayOffCount++;
        this.allStaff[assignment.staffId].lastDayOff = this.allDays[assignment.dayId].dayOfCamp;
        console.log(this.allStaff[assignment.staffId].firstName + " now has dayOffCount = " + this.allStaff[assignment.staffId].dayOffCount + " and lastDayOff = " + this.allStaff[assignment.staffId].lastDayOff);
      } else if (assignment.type == "1") {
        this.allStaff[assignment.staffId].ODCount++;
        console.log(this.allStaff[assignment.staffId].firstName + " now has ODCount = " + this.allStaff[assignment.staffId].ODCount);
      }
    }
  }

  eachValid(assignments) {
    let result = true;
    for (let i = 0; i < assignments.length; i++) {
      if (!this.isValid(assignments[i])) {
        let result = false;
        for (let j = 0; j < isValidErrorMessages.length; j++) {
          errorMessage += "assignment " + i + " - " +
            isValidErrorMessages[j] + "\n";
        }
      }
      isValidErrorMessages = [];
    }
    console.log("errorMessage: ", errorMessage);
    return;
  }

  isValid(assignment) {
    const staff = this.allStaff[assignment.staffId];
    const day = this.allDays[assignment.dayId];
    const nextDayIndex = parseInt(assignment.dayId) + 1;
    const nextDay = this.allDays[nextDayIndex];
    return this.threeNightsBetween(staff, day) &&
           this.everyoneInCamp(day) && this.noHeadStaffDayOff(staff, day) &&
           this.haveDayOffLeft(staff) &&
           ( this.isCounsellor(staff) ?
                this.canoeTrip(staff, day) &&
                this.unitTrip(staff, nextDay) &&
                this.unitPlay(staff, day) &&
                this.colourCounsellorOvernight(staff, day) &&
                this.colourCounsellorChangeover(staff, day) :
                true); 
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
    let halfCounsellors = this.halfCounsellors(allStaff,assignments);
    let oneThirdOfOlder = this.oneThirdOfOlder(allStaff,assignments);
    let specialtyQuota = this.specialtyQuota(allStaff,assignments);
    let seekerCabinQuota = this.seekerCabinQuota(allStaff,assignments);
    let result = halfCounsellors &&
        oneThirdOfOlder &&
        specialtyQuota &&
        seekerCabinQuota;
    console.log("errorMessages | areValid - " + areValidErrorMessages);
    return result;
  }


  //individual validations
  unitTrip(staff, day){
    let result = !(halfUnitToUnitMapping[staff.halfUnit] == day.unitFieldTrip);
    if (!result) isValidErrorMessages.push(staff.firstName + staff.lastName +
      " cannot go on a day off on " + day.dayOfCamp + " because their unit(" +
      day.unitFieldTrip + ") is on their unit trip.");
    return result;
  }

  unitPlay(staff, day){
    let result = !(halfUnitToUnitMapping[staff.halfUnit] == day.unitPlay);
    if (!result) isValidErrorMessages.push(staff.firstName + staff.lastName +
      " cannot go on a day off on " + day.dayOfCamp + " because their unit(" +
      day.unitPlay + ")'s play is that night");
    return result;
  }

  noHeadStaffDayOff(staff, day){
    let result = staff.staffType == 1 ? !day.noHeadStaffDayOff : true;
    if (!result) isValidErrorMessages.push(staff.firstName + staff.lastName +
      " cannot go on a day off on " + day.dayOfCamp + " because they are a " +
      "headstaff and there are no head staff day offs allowed on this day.");
    return result;
  }

  haveDayOffLeft(staff){
    let result = staff.dayOffCount <= staff.allowedDaysOff; 
    if (!result) isValidErrorMessages.push(staff.firstName + staff.lastName +
      " cannot go on a day off because they don't have any days off left.");
    return result;
  }

  everyoneInCamp(day){
    let result = !day.everyoneInCamp;
    if (!result) isValidErrorMessages.push(// worth having staff here for error message? staff.firstName + staff.lastName +
      "Cannot go on a day off on " + day.dayOfCamp + " because everyone must be in camp that day.");
    return result;
  }

  threeNightsBetween(staff,day){
    console.log("staff.lastDayOff of " + staff.firstName + staff.lastName + " is " + staff.lastDayOff);
    let result = staff.lastDayOff != 0 ?
      day.dayOfCamp - staff.lastDayOff > 4 :
      true;
    if (!result) isValidErrorMessages.push(staff.firstName + staff.lastName +
      " cannot go on a day off on " + day.dayOfCamp + " because their last day" +
      " off was not at least 3 nights in camp");
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
        areValidErrorMessages.add("More than half of the counsellors in " +
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
        areValidErrorMessages.add("More than one third of the staff on " + pair.getKey() +
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
          areValidErrorMessages.push("More than " + specialtyQuotas[currentStaff.role] +
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
          areValidErrorMessages.push("More than " + quota +
            " " + currentQuotaCounts[quota] + " staff are trying to take days off on the same day");
        let result = false;
      }
    }
    return result;
  }
}

module.exports = DayOffValidationController;