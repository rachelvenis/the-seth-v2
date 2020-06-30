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
}

module.exports = AssignmentEntity;
