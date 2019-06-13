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
  }
}

module.exports = StaffEntity;
