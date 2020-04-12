const Controller = require('./controller');
const StaffModel  = require('../models/staff-model');
const StaffEntity = require('../entities/staff-entity');

/**
 * Users Controller
 */
class StaffController {
  constructor() {
    this.controller = new Controller();
    this.staffModel = new StaffModel();
  }
  
  findAll(res) {
    this.staffModel.findAll()
      .then(this.controller.findSuccess(res))
      .catch(this.controller.findError(res));
  }
  
  findById(req, res) {
    const id = req.params.id;
    
    this.staffModel.findById(id)
      .then(this.controller.findSuccess(res))
      .catch(this.controller.findError(res));
  }
  
  // findByUsername(req, res) {
  //   const username = req.params.username;

  //   this.staffModel.findByUsername(username)
  //     .then(this.controller.findSuccess(res))
  //     .catch(this.controller.findError(res));
  // }

  create(req, res) {
    const staff = new StaffEntity();
    staff.birthYear = req.body.birthYear;
    staff.unit = req.body.unit;
    staff.halfUnit = req.body.halfUnit;
    staff.newToWalden = req.body.newToWalden;
    staff.staffType = req.body.staffType;
    staff.cabin = req.body.cabin;
    staff.role = req.body.role;
    staff.gender = req.body.gender;
    staff.name = req.body.name;
    
    this.staffModel.create(staff)
      .then(this.controller.createSuccess(res))
      .catch(this.controller.editError(res));
  }
  
  update(req, res) {
    const staff = new StaffEntity(req.params.id, req.body.name, req.body.birthYear, req.body.unit, req.body.halfUnit, req.body.newToWalden, req.body.headStaff, req.body.cabin, req.body.role, req.body.gender);
    
    this.staffModel.update(staff)
      .then(this.controller.editSuccess(res))
      .catch(this.controller.editError(res));
  }
  
  delete(req, res) {
    const id = req.params.id;
    
    this.staffModel.delete(id)
      .then(this.controller.editSuccess(res))
      .catch((error) => {
        if(error.errorCode === 21) {
          return this.controller.deleteError(res)();
        }
        else {
          return this.controller.editError(res)();
        }
      });
  }
}

module.exports = StaffController;
