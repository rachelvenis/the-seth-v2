const ValidationController  = require('./validation-controller.js');

class DutyValidations extends ValidationController {
	DutyValidations(allStaff, allDays, allAssignments){
		super(allStaff, allDays, allAssignments);
	}

	DutyValidations(allStaff, allDays){
		super(allStaff, allDays);
	}

	isValid(assignment){
		return  true;
	}

	areValid(assignments){
		return true;
	}
}