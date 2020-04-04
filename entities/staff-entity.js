/**
 * Staff Entity
 */
class StaffEntity {
  constructor(id, name, birthYear, unit, halfUnit, newToWalden, headStaff, cabin, role, gender){
	this.id = id;
	this.birthYear = birthYear;
	this.unit = unit;
	this.halfUnit = halfUnit;
	this.newToWalden = newToWalden;
	this.headStaff = headStaff;
	this.cabin = cabin;
	this.role = role;
	this.gender = gender;
	this.name = name;
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
