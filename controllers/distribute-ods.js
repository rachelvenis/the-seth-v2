const ODAssignment = require('../entities/od-assignment.js');

let idOfLastAssignedOD;

class DistributeODs {
  constructor() {
		this.defaultODs = {
			colours: {"female" : 3, "male": 3},
			loonies: {"female" : 2, "male": 2},
			toonies: {"female" : 2, "male": 2},
			planets: {"female" : 2, "male": 2},
			stars: {"female" : 2, "male": 2},
			finders: {"female" : 2, "male": 2},
			keepers: {"female" : 2, "male": 2}
		}
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
		result = [];
		neededODs = this.getNeededODs(day);
		for (unit in Object.keys(neededODs)){
			for (gender in Object.keys(neededODs[unit])) {
				for (let i = 0; i < neededODs[unit][gender]; i++){
					staff = this.getValidStaff(day, unit, gender);
					result.add(new ODAssignment(day.id, staff.id, unit));
				}
			}
		}
	}

	getValidStaff(day, unit, gender) {
		for (let i = 0; i < allStaff.size(); i++) {
			if (allStaff[i].unit == unit && allStaff[i].gender == gender) {
				
			}
		}
	}
}

module.exports = DistributeODs;
