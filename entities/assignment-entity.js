/**
 * Assignment Entity
 */
class AssignmentEntity {
  constructor(staffId, dayId, type, halfUnit){
	this.id = 0; 
	this.staffId = staffId; 
	this.dayId = dayId; 
	this.type = type; 
	this.halfUnit = halfUnit;
  }
}

module.exports = AssignmentEntity;
