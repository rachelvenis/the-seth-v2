const Controller = require('./controller');
const AssignmentModel  = require('../models/assignment-model');
const AssignmentEntity = require('../entities/assignment-entity');

/**
 * Users Controller
 */
class AssignmentController {
  constructor() {
    this.controller = new Controller();
    this.assignmentModel = new AssignmentModel();
  }
  
  findAll(res) {
    this.assignmentModel.findAll()
      .then(this.controller.findSuccess(res))
      .catch(this.controller.findError(res));
  }
  
  findById(req, res) {
    const id = req.params.id;
    
    this.assignmentModel.findById(id)
      .then(this.controller.findSuccess(res))
      .catch(this.controller.findError(res));
  }
  
  // findByUsername(req, res) {
  //   const username = req.params.username;

  //   this.dayModel.findByUsername(username)
  //     .then(this.controller.findSuccess(res))
  //     .catch(this.controller.findError(res));
  // }



  create(req, res) {
    const assignment = new AssignmentEntity();
    assignment.staffId = req.body.staffId;
    assignment.dayId = req.body.dayId;
    assignment.type = req.body.type;
    assignment.halfUnit = req.body.halfUnit;
    
    this.assignmentModel.create(assignment)
      .then(this.controller.createSuccess(res))
      .catch(this.controller.editError(res));
  }
  
  update(req, res) {
    const assignment = new AssignmentEntity(req.params.id, req.body.staffId, req.body.dayId, req.body.type, req.body.halfUnit);
  
    this.assignmentModel.update(assignment)
      .then(this.controller.editSuccess(res))
      .catch(this.controller.editError(res));
  }
  
  delete(req, res) {
    const id = req.params.id;
    
    this.assignmentModel.delete(id)
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

module.exports = AssignmentController;
