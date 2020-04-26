const ODAssignment = require('../entities/od-assignment.js');
const ODValidations = require('./validations/OD-validations-controller.js');

let idOfLastAssignedOD;

class DistributeODs {
  constructor(allStaffIn, pastAssignmentsIn, allDaysIn) {
		this.defaultODs = {
			// "colours": {"female" : 3, "male": 3},
			// "loonies": {"female" : 2, "male": 2},
			// "toonies": {"female" : 2, "male": 2},
			// "planets": {"female" : 2, "male": 2},
			// "stars": {"female" : 2, "male": 2},
			// "finders": {"female" : 2, "male": 2},
			// "keepers": {"female" : 2, "male": 2}
			"colours": {"female" : 1, "male": 1},
			"loonies": {"female" : 1, "male": 1},
			"toonies": {"female" : 1, "male": 1},
			"planets": {"female" : 1, "male": 1},
			"stars": {"female" : 1, "male": 1},
			"finders": {"female" : 1, "male": 1},
			"keepers": {"female" : 1, "male": 1}
		}
		this.oDValidations = new ODValidations(allStaffIn, allDaysIn, pastAssignmentsIn);
		this.allStaff = allStaffIn;
		this.pastAssignments = pastAssignmentsIn;
		this.allDays = allDaysIn;
	}

	distributeEachDay(start_day_index, end_day_index) {
		for(let i = start_day_index; i <= end_day_index; i++) {
			console.log("\nday - " + i);
			this.getODAssignments(this.allDays[i]);
		}
	}

	getNeededODs(day) {
		let neededODs = {};
		if (day.normalOD) {
			neededODs = this.defaultODs;
			if (!(day.halfUnitCanoeTrip == "")){
				delete neededODs[day.halfUnitCanoeTrip];
			}
		}
		return neededODs;
	}

	getODAssignments(day) {
		let result = [];
		let neededODs = this.getNeededODs(day);
		for (const halfUnit in neededODs){
			for (let gender in neededODs[halfUnit]) {
				for (let i = 0; i < neededODs[halfUnit][gender]; i++){
					let staff = this.getValidStaff(day, halfUnit, gender);
					if (staff == null) {
						console.log("error message in getODAssignments, couldn't find an " + i + "th " + gender + " for " + halfUnit);
	    				// if (!result) this.isValidErrorMessages.push("hasColourWarsDuties - " + staff.name);
					} else {
						console.log("assigned " + staff.firstName + " " + staff.lastName + ", " + halfUnit + ", " + gender);
						result.push(new ODAssignment(day, staff, halfUnit));
					}
				}
			}
		}
		return result;
	}

	// global round of OD
	getValidStaff(day, halfUnit, gender) {
		let havent_found = true;
		let tries = 0;
		while(havent_found && tries < 8){
			for (let i = 0; i < this.allStaff.length; i++) {
				let potentialAssignment = new ODAssignment(this.allStaff[i].id, day.id, halfUnit);
				if (this.oDValidations.isValid(potentialAssignment, tries, halfUnit, gender)) {
					this.allStaff[i].incrementODCount();
					havent_found = false;
					return this.allStaff[i];
				}
			}
			tries++
		}
		return null;
	}
}

module.exports = DistributeODs;
