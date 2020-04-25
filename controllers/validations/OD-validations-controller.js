
const ValidationController  = require('./validation-controller.js');

let halfUnitToUnitMapping = {
	"colours": "colours",
	"loonies": "comics",
	"toonies": "comics",
	"planets": "zods",
	"stars": "zods",
	"finders": "seekers",
	"keepers": "seekers"
}

class ODValidations extends ValidationController {
	constructor(allStaffIn, allDaysIn, pastAssignmentsIn){
		super()     
		// this.validationModel = new ValidationModel();
		this.allStaff = allStaffIn;
		this.pastAssignments = pastAssignmentsIn;
		this.allDays = allDaysIn;
		this.globalRoundOfOD = 1;
	}

    setglobalRoundOfOD(value) {
  	  this.globalRoundOfOD = value;
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

	//TODO you sure this is how it should work?
	isValid(assignment, tries, halfUnit, gender) {
		const staff = this.allStaff[assignment.staffId];
		const day = this.allDays[assignment.dayId];
		const nextDay = this.allDays[assignment.dayId + 1];
		let result = this.regularStaff(staff);
		for (let i = tries; i < 7; i++){
			if(i < 7) {
				result = result && this.onDayOff(staff, day);
			}
			if(i < 6) {
				result = result && this.hasColourWarsDuties(staff, day);
			}
			if(i < 5) {
				result = result && this.hasWaldenGamesDuties(staff, day);
			}
			if(i < 4) {
				result = result && (staff.gender == gender);
			}
			if(i < 3){
				result = result && this.numberOfODsDone(staff);
			}
			if(i < 2) {
				result = result && (halfUnitToUnitMapping[staff.halfUnit] == halfUnitToUnitMapping[halfUnit]);
			}
			if(i < 1) {
				result = result && (staff.halfUnit == halfUnit);
			}
		}
		return result;
	}

	hasColourWarsDuties(staff, day){
	    let result = staff.colourWarsDuty ? !day.colourWarsPrep : true; 
	    if (!result) this.isValidErrorMessages.push("hasColourWarsDuties - " + staff.firstName + staff.lastName);
		return result;
	}
	hasWaldenGamesDuties(staff, day){
		let result = staff.waldenGamesDuty ? !day.waldenGamesPrep : true; 
	    if (!result) this.isValidErrorMessages.push("hasWaldenGamesDuties - " + staff.firstName + staff.lastName);
		return result;
	}
	
	numberOfODsDone(staff){
	    let result = staff.ODCount < this.globalRoundOfOD; 
	    if (!result) this.isValidErrorMessages.push("numberOfODsDone - " + staff.firstName + staff.lastName);
		return result;
	}
	
	regularStaff(staff){
	    let result = staff.staffType == 0; 
	    if (!result) this.isValidErrorMessages.push("regularStaff - " + staff.firstName + staff.lastName);
		return result;
	}
	// TODO need to get this from database?
	onDayOff(staff, day){
	    let result = true; 
	    if (!result) this.isValidErrorMessages.push("onDayOff - " + staff.firstName + staff.lastName);
		return result;
	}

}

module.exports = ODValidations;