const ODAssignment = require('../entities/od-assignment.js');
const ODValidations = require('./validations/OD-validations-controller.js');

let idOfLastAssignedOD;

class DistributeODs {
  constructor(allStaffIn, allDaysIn, pastAssignmentsIn) {
		this.defaultODs = {
			"colours": {"female" : 3, "male": 3},
			"loonies": {"female" : 2, "male": 2},
			"toonies": {"female" : 2, "male": 2},
			"planets": {"female" : 2, "male": 2},
			"stars": {"female" : 2, "male": 2},
			"finders": {"female" : 2, "male": 2},
			"keepers": {"female" : 2, "male": 2}
		}
		this.oDValidations = new ODValidations(allStaffIn, allDaysIn, pastAssignmentsIn);
		this.allStaff = allStaffIn;
		this.pastAssignments = pastAssignmentsIn;
		this.allDays = allDaysIn;
	}

	getNeededODs(day){
		let neededODs = {};
		if (day.normalOD) {
			neededODs = this.defaultODs;
			if (!(day.unitCanoeTrip == "")){
				delete neededODs[day.unitCanoeTrip];
			}
		}
		return neededODs;
	}

	getODAssignments(day) {
		let result = [];
		let neededODs = this.getNeededODs(day);
		for (const unit in neededODs){
			for (let gender in neededODs[unit]) {
				for (let i = 0; i < neededODs[unit][gender]; i++){
					let staff = this.getValidStaff(day, unit, gender);
					if (staff == null) {
						console.log("error message in getODAssignments, couldn't find an " + i + "th " + gender + " for " + unit);
	    				// if (!result) this.isValidErrorMessages.push("hasColourWarsDuties - " + staff.name);
					} else {
						console.log("assigned " + staff.firstName + " " + staff.lastName + ", " + unit + ", " + gender);
						result.push(new ODAssignment(day, staff, unit));
					}
				}
			}
		}
		return result;
	}

	// global round of OD
	getValidStaff(day, unit, gender) {
		for (let i = 0; i < this.allStaff.length; i++) {
			if (this.allStaff[i].halfUnit == unit && this.allStaff[i].gender == gender) {
				let potentialAssignment = new ODAssignment(this.allStaff[i].id, day.id, unit);
				if (this.oDValidations.isValid(potentialAssignment)) {
					this.allStaff[i].incrementODCount();
					return this.allStaff[i];
				}
			}
		}
		return null;
	}
}

module.exports = DistributeODs;
