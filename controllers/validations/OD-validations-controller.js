
const ValidationController  = require('./validation-controller.js');

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

	isValid(assignment) {
		const staff = this.allStaff[assignment.staffId];
		const day = this.allDays[assignment.dayId];
		const nextDay = this.allDays[assignment.dayId + 1];
		return this.hasColourWarsDuties(staff, day) &&
		   this.hasWaldenGamesDuties(staff, day) &&
	       this.numberOfODsDone(staff) &&
	       this.regularStaff(staff) &&
	       this.onDayOff(staff, day); 
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
	// TODO comparision with some global variable storing 'round of ODs'
	numberOfODsDone(staff){
	    let result = staff.ODCount < this.globalRoundOfOD; 
	    if (!result) this.isValidErrorMessages.push("numberOfODsDone - " + staff.firstName + staff.lastName);
		return result;
	}
	// TODO account for LTeam
	regularStaff(staff){
	    let result = !staff.headStaff; 
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