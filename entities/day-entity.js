/**
 * Staff Entity
 */
class DayEntity {
  constructor(id, dayOfCamp, rotatingOD, everyoneInCamp, colourChangeover, bunkNight, unitFieldTrip, unitPlay, noHeadStaffDayOff, normalOD, unitCanoeTrip, cabinOvernight, useItOrLooseIt, colourWarsPrep, waldenGamesPrep){
	this.id = id;
	this.dayOfCamp = dayOfCamp;
	this.rotatingOD = rotatingOD;
	this.everyoneInCamp = everyoneInCamp;
	this.colourChangeover = colourChangeover;
	this.bunkNight = bunkNight;
	this.unitFieldTrip = unitFieldTrip;
	this.unitPlay = unitPlay;
	this.noHeadStaffDayOff = noHeadStaffDayOff;
	this.normalOD = normalOD;
	this.unitCanoeTrip = unitCanoeTrip;
	this.cabinOvernight = cabinOvernight;
	this.useItOrLooseIt = useItOrLooseIt;
	this.colourWarsPrep = colourWarsPrep;
	this.waldenGamesPrep = waldenGamesPrep;
  }
}

module.exports = DayEntity;
