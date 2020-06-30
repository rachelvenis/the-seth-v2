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

	// TODO isCounsellor is duplicate logic here - added for testing. should be removed.
	// canoeTrip(staff, day){
	// 	let result = !(staff.halfUnit == day.halfUnitCanoeTrip);
	// 	if (!result) isValidErrorMessages.push("canoeTrip - " + staff.firstName + staff.lastName);
	// 	return this.isCounsellor(staff) ? result : true;
	// }

	canoeTrip(assignment){
    	const staff = this.allStaff[assignment.staffId];
    	const day = this.allDays[assignment.dayId];
		let result = !(staff.halfUnit == day.halfUnitCanoeTrip);
		if (!result) isValidErrorMessages.push("canoeTrip - " + staff.firstName + staff.lastName);
		return this.isCounsellor(assignment) ? result : true;
	}

	// colourCounsellorOvernight(staff, day){
	// 	let result = staff.halfUnit == "colours" ? 
	// 		!staff.cabin == day.cabinOvernight :
	// 		true;
	// 	if (!result) isValidErrorMessages.push("colourCounsellorOvernight - " + staff.firstName + staff.lastName);
	// 	return this.isCounsellor(staff) ? result : true;
	// }

	colourCounsellorOvernight(assignment){
    	const day = this.allDays[assignment.dayId];
    	const staff = this.allStaff[assignment.staffId];
		let result = staff.halfUnit == "colours" ? 
			!staff.cabin == day.cabinOvernight :
			true;
		if (!result) isValidErrorMessages.push("colourCounsellorOvernight - " + staff.firstName + staff.lastName);
		return this.isCounsellor(assignment) ? result : true;
	}

	// colourCounsellorChangeover(staff, day){
	// 	let result = staff.halfUnit == "colours" ? 
	// 		!day.colourChangeover :
	// 		true;
	// 	if (!result) isValidErrorMessages.push("colourCounsellorChangeover - " + staff.firstName + staff.lastName + ", " + day.dayOfCamp);
	// 	return this.isCounsellor(staff) ? result : true;
	// }

	colourCounsellorChangeover(assignment){
    	const day = this.allDays[assignment.dayId];
    	const staff = this.allStaff[assignment.staffId];
		let result = staff.halfUnit == "colours" ? 
			!day.colourChangeover :
			true;
		if (!result) isValidErrorMessages.push("colourCounsellorChangeover - " + staff.firstName + staff.lastName + ", " + day.dayOfCamp);
		return this.isCounsellor(assignment) ? result : true;
	}
	// isCounsellor(staff){
	// 	return staff.role == "counsellor";
	// }
	isCounsellor(assignment){
    	const staff = this.allStaff[assignment.staffId];
		return staff.role == "counsellor";
	}

}

module.exports = ValidationController;
