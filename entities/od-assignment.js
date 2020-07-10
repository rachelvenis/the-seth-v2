/**
 * Assignment Entity
 */
class ODAssignmentEntity {
  constructor(staffId, dayId, halfUnit){
	this.id = 0; 
	this.staffId = staffId; 
	this.dayId = dayId; 
	this.type = 1; 
	this.halfUnit = halfUnit;
	this.errorMessages = [];
  }
}

module.exports = ODAssignmentEntity;
