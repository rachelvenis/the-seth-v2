/**
 * Assignment Entity
 */
class ODAssignmentEntity {
  constructor(staffId, dayId, halfUnit){
	this.id = 0; 
	this.staffId = staffId; 
	this.dayId = dayId; 
	this.type = "OD"; 
	this.halfUnit = halfUnit;
  }
}

module.exports = ODAssignmentEntity;
