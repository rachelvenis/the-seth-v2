/**
 * Staff Entity
 */
class StaffEntity {
  constructor(id, firstName, lastName, birthYear, unit, halfUnit, newToWalden, staffType, cabin, role, gender){
	this.id = id;
	this.birthYear = birthYear;
	this.unit = unit;
	this.halfUnit = halfUnit;
	this.newToWalden = newToWalden;
	this.staffType = staffType;
	this.cabin = cabin;
	this.role = role;
	this.gender = gender;
  this.firstName = firstName;
  this.lastName = lastName;
    this.ODCount = 0;
  }

  setColourWarsDuty(value) {
  	this.colourWarsDuty = value;
  }

  setWaldenGamesDuty(value) {
  	this.waldenGamesDuty = value;
  }

  setODCount(value) {
  	this.ODCount = value;
  }

  incrementODCount() {
    this.ODCount = this.ODCount + 1;
  }
}

module.exports = StaffEntity;
