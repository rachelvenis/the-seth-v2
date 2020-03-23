const ValidationController  = require('./validation-controller.js');

class ODValidations extends ValidationController {
	private allStaff;
	private allDays;
	private allAssignments;


	ODValidations(allStaff, allDays, allAssignments){
		this.allStaff = allStaff;
		this.allDays = allDays;
		this.allAssignments = allAssignments;
	}

	ODValidations(allStaff, allDays){
		this.allStaff = allStaff;
		this.allDays = allDays;
	}

	isValid(assignment){
		return  true
	}

	areValid(assignments){
		return true;
	}

}