const Controller = require('./controller');
const ValidationModel  = require('../models/validation-model');
// const ValidationEntity = require('../entities/validation-entity');

/**
 * Users Controller
 */
class ValidationController {
  constructor() {
    this.controller = new Controller();
    this.validationModel = new ValidationModel();
  }
  
  findAll(res) {
    this.validationModel.findAll()
      .then(this.controller.findSuccess(res))
      .catch(this.controller.findError(res));
  }
}

module.exports = ValidationController;
