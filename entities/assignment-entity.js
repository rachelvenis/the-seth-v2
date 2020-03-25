/**
 * Assignment Entity
 */
class AssignmentEntity {
  constructor(id, staffId, dayId, type, halfUnit){
	this.id = id; 
	this.staffId = staffId; 
	this.dayId = dayId; 
	this.type = type; 
	this.halfUnit = halfUnit;
  }
}

module.exports = AssignmentEntity;
