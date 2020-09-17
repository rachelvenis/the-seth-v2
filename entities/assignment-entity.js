/**
 * Assignment Entity
 */
class AssignmentEntity {
  constructor(assignmentId, staffId, dayId, type, halfUnit){
	this.id = assignmentId;
	this.staffId = staffId;
	this.dayId = dayId;
	this.type = type; // 0 = day off, 1 = od
	this.halfUnit = halfUnit;
	this.errorMessages = [];
  }

  set_error_messages(errorMessages){
  	if (errorMessages[0] == null) {
		this.errorMessages = [null];
	} else {
		this.errorMessages = errorMessages;
	}
  }
}

module.exports = AssignmentEntity;
