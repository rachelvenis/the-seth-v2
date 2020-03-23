const Controller = require('../controller');
const ValidationModel  = require('../../models/validation-model');

class ValidationController {
	currentYear=2018;
	allStaff;
	allDays;
	pastAssignments;
	isValidErrorMessages = [];
	areValidErrorMessages = [];
	errorMessage = "";


	Validations(allStaff, allDays, pastAssignments){
		this.allStaff = allStaff;
		this.allDays = allDays;
		this.pastAssignments = pastAssignments;
		updateFromPastAssignments();
	}

	Validations(allStaff, allDays){
		this.allStaff = allStaff;
		this.allDays = allDays;
	}

	updateFromPastAssignments(){
		for (i = 0; i < pastAssignments.size(); i++){
			allStaff[pastAssignments[i].getStaffIndex()]
				.incrementDayOffCount();
		}
	}

	setAllAssignments(newPastAssignments){
		pastAssignments = newPastAssignments;
	}
	
	canoeTrip(staff, day){
		result = !staff.getUnit() == day.getUnitCanoeTrip();
		if (!result) isValidErrorMessages
			.push("canoeTrip - " + staff.getName());
		return result;
	}
	colourCounsellorOvernight(staff, day){
		result = staff.getUnit() == "colours" ? 
			!staff.getCabin() == day.getCabinOvernight() :
			true;
		if (!result) isValidErrorMessages
			.push("colourCounsellorOvernight - " + staff.getName());
		return result;
	}
	colourCounsellorChangeover(staff, day){
		result = staff.getUnit() == "colours" ? 
			!day.getColourChangeover() :
			true;
		if (!result) isValidErrorMessages
			.push("colourCounsellorChangeover - " + staff.getName()
				+ ", " + day.getDayOfCamp());
		return result;
	}
	isCounsellor(staff){
		return staff.getRole() == "counsellor";
	}

}

module.exports = ValidationController;
