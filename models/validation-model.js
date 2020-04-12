const Model = require('./model');
// const AssignmentEntity = require('../entities/assignment-entity');
const AssignmentModel = require('./assignment-model');
const StaffModel = require('./staff-model');

/**
 * User Model
 */
class ValidationModel {
  constructor() {
    this.model = new Model();
    this.assignmentModel = new AssignmentModel();
    this.staffModel = new StaffModel();
    this.errorMessages = "";
  }
  

  //day off validations
  findAll() {
    const sql = `
      SELECT
          *
      FROM
          assignment
      WHERE
          type = 'DayOff'
    `;
    
    return this.model.findAll(sql)
      .then(dayOffs => {
        dayOffs.forEach((dayOff) => {
            this.isValid(dayOff) ? console.log("Valid") : console.log("PROBLEMO")
          }
        )
      });
  }

  isValid(dayOff) {
    var staff = this.staffModel.findById(dayOff.staffId);
    var day = this.staffModel.findById(dayOff.dayId);
    return this.threeNightsBetween(staff, day) &&
        this.everyoneInCamp() &&
        this.noHeadStaffDayOff() &&
        this.haveDayOffsLeft() &&
        ( this.isCounsellor() ?
          this.canoeTrip() &&
          this.unitTrip() &&
          this.unitPlay() &&
          this.colourCounsellorOvernight() &&
          this.colourCounsellorChangeover() :
          true);
  }

  threeNightsBetween(staff, day){
    var result = staff.lastDayOff != 0 ?
      day.dayOfCamp - staff.lastDayOff > 4 :
      true;
    if (!result){
      isValidErrorMessages += "threeNightsBetween - " + staff.firstName + staff.lastName;
    }
    return result;
  }

  everyoneInCamp(){
    return true;
  }

  noHeadStaffDayOff(){
    return true;
  }

  haveDayOffsLeft(){
    return true;
  }

  isCounsellor(){
    return true;
  }
  canoeTrip(){
    return true;
  }

  unitTrip(){
    return true;
  }

  unitPlay(){
    return true;
  }

  colourCounsellorOvernight(){
    return true;
  }

  colourCounsellorChangeover(){
    return true;
  }
}

module.exports = ValidationModel;
