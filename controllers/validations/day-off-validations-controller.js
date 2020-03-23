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

let errorMessage = "";
class DayOffValidationController extends ValidationController {
  constructor(allStaffIn, allAssignmentsIn, allDaysIn) {
    super()     
    // this.validationModel = new ValidationModel();
    allStaff = allStaffIn;
    allAssignments = allAssignmentsIn;
    allDays = allDaysIn;
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
  	const staff = allStaff[assignment.staffId];
  	const day = allDays[assignment.dayId];
  	const nextDay = allDays[assignment.dayId + 1];
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
    pastCount = 0;
    for (let i = 0; i < allStaff.length; i++) {
      if (!allStaff[i].getHeadStaff() &&
        allStaff[i].birthYear() <= (currentYear - 19)) {
        key = allStaff[i].getRole() == "counsellor" ?
          allStaff[i].getHalfUnit() : allStaff[i].getRole();
        pastCount = olderQuotas.containsKey(key) ? olderQuotas[key] : 0;
        olderQuotas[key] = pastCount + 1;
      }
    }
  }


updateSeekerCabinQuotas(allStaff){
    pastCount = 0;
    for (let i = 0; i < allStaff.length; i++){
      currentStaff = allStaff[i];
      if (currentStaff.getUnit().equals("seekers")){
        pastCount=seekerCabinQuotas.containsKey(currentStaff.getCabin()) ? seekerCabinQuotas[currentStaff.getCabin()] : 0;
        seekerCabinQuotas[currentStaff.getCabin()] = pastCount + 1;
      }
    }
  }

  updateCabinCounsellorQuotas(allStaff){
    pastCount = 0;
    for (let i = 0; i < allStaff.length; i++){
      if (allStaff[i].getRole().equals("counsellor")){
        pastCount=cabinCounsellorQuotas.containsKey(allStaff[i].getCabin()) ? cabinCounsellorQuotas[allStaff[i].getCabin()] : 0;
        cabinCounsellorQuotas[allStaff[i].getCabin()] = pastCount + 1;
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
    updateSpeialtyQuotas();
    updateOlderQuotas(allStaff);
    updateCabinCounsellorQuotas(allStaff);
    updateSeekerCabinQuotas(allStaff);
    halfCounsellors = halfCounsellors(allStaff,assignments);
    oneThirdOfOlder = oneThirdOfOlder(allStaff,assignments);
    specialtyQuota = specialtyQuota(allStaff,assignments);
    seekerCabinQuota = seekerCabinQuota(allStaff,assignments);
    let result = halfCounsellors &&
        oneThirdOfOlder &&
        specialtyQuota &&
        seekerCabinQuota;
    console.log("errorMessages | areValid - " + areValidErrorMessages);
    return result;
  }


  //individual validations
  unitTrip(staff, day){
    let result = !staff.getUnit().equals(day.getUnitFieldTrip()); 
    if (!result) isValidErrorMessages.push("unitTrip - " +
      staff.getName());
    return result;
  }

  unitPlay(staff, day){
    let result = !staff.getUnit().equals(day.getUnitPlay()); 
    if (!result) isValidErrorMessages.push("unitPlay - " +
      staff.getName());
    return result;
  }

  noHeadStaffDayOff(staff, day){
    let result = staff.getHeadStaff() ? !day.getNoHeadStaffDayOff() : true;
    if (!result) isValidErrorMessages.push("noHeadStaffDayOff - " +
      staff.getName());
    return result;
  }

  haveDayOffsLeft(staff){
    let result = staff.getDayOffCount()<=staff.getAllowedDaysOff(); 
    if (!result) isValidErrorMessages.push("haveDayOffsLeft - " +
      staff.getName());
    return result;
  }

  everyoneInCamp(day){
    let result = !day.getEveryoneInCamp(); 
    if (!result) isValidErrorMessages.push("everyoneInCamp");
    return result;
  }

  threeNightsBetween(staff,day){
    let result = staff.lastDayOff != 0 ?
      day.dayOfCamp - staff.lastDayOff > 4 :
      true;
    if (!result) isValidErrorMessages.push("threeNightsBetween - " +
      staff.name);
    return result;
  }

  //quota validations
  halfCounsellors(allStaff, assignments){
    currentCabinCounts =  {};
    pastCount = 0;
    for (let i = 0; i < assignments.length; i++){
      currentStaff = allStaff.get(assignments[i].staffId);
      if (currentStaff.role.equals("counsellor") && !currentStaff.unit == "seekers"){
        pastCount = currentCabinCounts.containsKey(currentStaff.cabin) ? currentCabinCounts[currentStaff.getCabin()] : 0;
        currentCabinCounts[currentStaff.cabin] = pastCount + 1;
      }
    }
    let result = true;
    // Iterator it = currentCabinCounts.entrySet().iterator();
    // while (it.hasNext()) {
    //   Map.Entry pair = (Map.Entry)it.next();
    //   if ((cabinCounsellorQuotas.get(pair.getKey())/2)<(int) pair.getValue()){
    //     areValidErrorMessages.add("halfCounsellors - " + pair.getKey());
    //     let result = false;
    //   }
    // }
    return result;
  }

  oneThirdOfOlder(allStaff, assignments){
    currentQuotaCounts =  {};
    pastCount = 0;
    for (let i = 0; i < assignments.length; i++){
      currentStaff = allStaff[assignments[i].staffId];
      key = currentStaff.getRole().equals("counsellor") ?
        currentStaff.getHalfUnit() : currentStaff.getRole();
      if (currentStaff.getRole() == "counsellor") {
        pastCount = currentQuotaCounts.containsKey(key) ?
          currentQuotaCounts[key] : 0;
        currentQuotaCounts[key] = pastCount + 1;
      }
    }
    let result = true;
    // Iterator it = currentQuotaCounts.entrySet().iterator();
    // while (it.hasNext()) {
    //   Map.Entry pair = (Map.Entry)it.next();
    //   if ((olderQuotas.get(pair.getKey())/3)<(int) pair.getValue()){
    //     areValidErrorMessages.add("oneThirdOfOlder - " + pair.getKey());
    //     let result = false;
    //   }
    // }
    return result;
  }
  specialtyQuota(allStaff, assignments){
    currentSpecialtyCounts =  {};
    pastCount = 0;
    newCount = 0;
    for (let i = 0; i < assignments.length; i++){
      currentStaff = allStaff[assignments[i].staffId]; 
      if (!currentStaff.getRole() == "counsellor" && !currentStaff.getHeadStaff()) {
        pastCount = currentSpecialtyCounts.containsKey(currentStaff.getCabin()) ? currentSpecialtyCounts[currentStaff.getCabin()] : 0;
        newCount = pastCount + 1;
        if (newCount > specialtyQuotas[currentStaff.getRole()]){
          areValidErrorMessages.push("specialtyQuota");
          return false;
        }
        currentSpecialtyCounts[currentStaff.getCabin()] = newCount;
      }
    }
    return true;
  }
  seekerCabinQuota(allStaff, assignments){
    currentQuotaCounts =  {};
    pastCount = 0;
    for (let i = 0; i < assignments.length;i++){
      currentStaff = allStaff[assignments[i].staffId];
      if (currentStaff.getUnit() == "seekers"){
        pastCount = currentQuotaCounts.containsKey(currentStaff.getCabin()) ? currentQuotaCounts[currentStaff.getCabin()] : 0;
        currentQuotaCounts[currentStaff.getCabin()] = pastCount + 1;
      }
    }
    let result = true;
    // Iterator it = currentQuotaCounts.entrySet().iterator();
    // while (it.hasNext()) {
    //   Map.Entry pair = (Map.Entry)it.next();
    //   if ((seekerCabinQuotas.get(pair.getKey())/2)<(int) pair.getValue()){
    //     areValidErrorMessages.push("seekerCabinQuota - " + pair.getKey());
    //     let result = false;
    //   }
    // }
    return result;
  }
}

module.exports = DayOffValidationController;