const Controller = require('../controller');
const ValidationModel  = require('../../models/validation-model');

let isValidErrorMessages = [];

class ValidationController {
	constructor(allStaffIn, allDaysIn, pastAssignmentsIn){
		this.allStaff = allStaffIn;
		this.allDays = allDaysIn;
		this.pastAssignments = pastAssignmentsIn;


		this.currentYear = 2018;
		this.isValidErrorMessages = [];
		this.areValidErrorMessages = [];
		this.errorMessage = "";
		// this.updateFromPastAssignments();
	}

	updateFromPastAssignments(){
		for (let i = 0; i < this.pastAssignments.length; i++){
			allStaff[this.pastAssignments[i].staffId]
				.incrementDayOffCount();
		}
	}

	setAllAssignments(newPastAssignments){
		pastAssignments = newPastAssignments;
	}
	// TODO should be half unit not unit
	// TODO isCounsellor is duplicate logic here - added for testing. should be removed.
	canoeTrip(staff, day){
		let result = !(staff.unit == day.unitCanoeTrip);
		if (!result) isValidErrorMessages.push("canoeTrip - " + staff.name);
		return this.isCounsellor(staff) ? result : true;
	}
	colourCounsellorOvernight(staff, day){
		let result = staff.unit == "colours" ? 
			!staff.cabin == day.cabinOvernight :
			true;
		if (!result) isValidErrorMessages.push("colourCounsellorOvernight - " + staff.name);
		return this.isCounsellor(staff) ? result : true;
	}
	colourCounsellorChangeover(staff, day){
		let result = staff.unit == "colours" ? 
			!day.colourChangeover :
			true;
		if (!result) isValidErrorMessages.push("colourCounsellorChangeover - " + staff.name + ", " + day.dayOfCamp);
		return this.isCounsellor(staff) ? result : true;
	}
	isCounsellor(staff){
		return staff.role == "counsellor";
	}

}

module.exports = ValidationController;
