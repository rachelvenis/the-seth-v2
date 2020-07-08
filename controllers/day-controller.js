const Controller = require('./controller');
const DayModel  = require('../models/day-model');
const DayEntity = require('../entities/day-entity');

/**
 * Users Controller
 */
class DayController {
  constructor() {
    this.controller = new Controller();
    this.dayModel = new DayModel();
  }
  
  findAll(res) {
    this.dayModel.findAll()
      .then(this.controller.findSuccess(res))
      .catch(this.controller.findError(res));
  }
  
  findById(req, res) {
    const id = req.params.id;
    
    this.dayModel.findById(id)
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
    const day = new DayEntity(
      req.body.dayOfCamp,
      req.body.rotatingOD,
      req.body.everyoneInCamp,
      req.body.colourChangeover,
      req.body.bunkNight,
      req.body.colourWarsPrep,
      req.body.waldenGamesPrep,
      req.body.unitFieldTrip,
      req.body.unitPlay,
      req.body.noHeadStaffDayOff,
      req.body.normalOD,
      req.body.halfUnitCanoeTrip,
      req.body.cabinOvernight,
      req.body.useItOrLooseIt,
      "June 28");
    
    this.dayModel.create(day)
      .then(this.controller.createSuccess(res))
      .catch(this.controller.editError(res));
  }
  
  update(req, res) {
    const day = new DayEntity(req.params.id,
      req.body.dayOfCamp,
      req.body.rotatingOD,
      req.body.everyoneInCamp,
      req.body.colourChangeover,
      req.body.bunkNight,
      req.body.unitFieldTrip,
      req.body.unitPlay,
      req.body.noHeadStaffDayOff,
      req.body.normalOD,
      req.body.halfUnitCanoeTrip,
      req.body.cabinOvernight,
      req.body.useItOrLooseIt,
      req.body.colourWarsPrep,
      req.body.waldenGamesPrep,
      "June 28");
  
    this.dayModel.update(day)
      .then(this.controller.editSuccess(res))
      .catch(this.controller.editError(res));
  }
  
  delete(req, res) {
    const id = req.params.id;
    
    this.dayModel.delete(id)
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

module.exports = DayController;
