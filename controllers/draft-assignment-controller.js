const Controller = require('./controller');
const AssignmentModel  = require('../models/assignment-model');
const DraftAssignmentModel  = require('../models/draft-assignment-model');
const AssignmentEntity = require('../entities/assignment-entity');

/**
 * Users Controller
 */
class AssignmentController {
  constructor() {
    this.controller = new Controller();
    this.assignmentModel = new AssignmentModel();
    this.draftAssignmentModel = new DraftAssignmentModel();
  }
  
  findAll(res) {
    this.assignmentModel.findAll()
      .then(this.controller.findSuccess(res))
      .catch(this.controller.findError(res));
  }
  
  findAllDODraft(res) {
    this.draftAssignmentModel.findAllDO()
      .then(result =>
        this.controller.findSuccess(res)(this.prepare(result)))
      .catch(this.controller.findError(res));
  }

  findAllODDraft(res) {
    this.draftAssignmentModel.findAllOD()
      .then(result => {
        return this.controller.findSuccess(res)(this.prepareOD(result))
      }).catch(this.controller.findError(res));
    // this.draftAssignmentModel.findAllOD()
    //   .then(result => {
    //     return this.controller.findSuccess(res)(this.prepareOD(result))
    //   }
    //   ).catch(this.controller.findError(res));
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

  prepare(assignments) {
    let results = [];
    for (let i = 0; i < assignments.length; i++) {
        results.push([
            assignments[i].staffId,
            assignments[i].dayId,
            assignments[i].errorMessages]);
    }
    return results;
  }

  prepareOD(assignments) {
    let results = [];
    for (let i = 0; i < assignments.length; i++) {
        results.push([
            assignments[i].staffId,
            assignments[i].dayId,
            assignments[i].halfUnit,
            assignments[i].errorMessages]);
    }
    return results;
  }


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
