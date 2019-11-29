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
    const day = new DayEntity();
    day.dayOfCamp = req.body.dayOfCamp;
    day.rotatingOD = req.body.rotatingOD;
    day.everyoneInCamp = req.body.everyoneInCamp;
    day.colourChangeover = req.body.colourChangeover;
    day.bunkNight = req.body.bunkNight;
    day.colourWarsPrep = req.body.colourWarsPrep;
    day.waldenGamesPrep = req.body.waldenGamesPrep;
    day.unitFieldTrip = req.body.unitFieldTrip;
    day.unitPlay = req.body.unitPlay;
    day.noHeadStaffDayOff = req.body.noHeadStaffDayOff;
    day.normalOD = req.body.normalOD;
    day.unitCanoeTrip = req.body.unitCanoeTrip;
    day.cabinOvernight = req.body.cabinOvernight;
    day.useItOrLooseIt = req.body.useItOrLooseIt;
    
    this.dayModel.create(day)
      .then(this.controller.createSuccess(res))
      .catch(this.controller.editError(res));
  }
  
  update(req, res) {
    const day = new DayEntity(req.params.id, req.body.dayOfCamp, req.body.rotatingOD, req.body.everyoneInCamp, req.body.colourChangeover, req.body.bunkNight, req.body.unitFieldTrip, req.body.unitPlay, req.body.noHeadStaffDayOff, req.body.normalOD, req.body.unitCanoeTrip, req.body.cabinOvernight, req.body.useItOrLooseIt, req.body.colourWarsPrep, req.body.waldenGamesPrep);
  
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
