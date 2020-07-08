/**
 * Day Entity
 */
class DayEntity {
  constructor(id, dayOfCamp, rotatingOD, everyoneInCamp, colourChangeover, bunkNight, unitFieldTrip, unitPlay, noHeadStaffDayOff, normalOD, halfUnitCanoeTrip, cabinOvernight, useItOrLooseIt, colourWarsPrep, waldenGamesPrep, firstDayOfCamp){
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
	this.halfUnitCanoeTrip = halfUnitCanoeTrip;
	this.cabinOvernight = cabinOvernight;
	this.useItOrLooseIt = useItOrLooseIt;
	this.colourWarsPrep = colourWarsPrep;
	this.waldenGamesPrep = waldenGamesPrep;
	this.dayLabel = this.getDayLabel(dayOfCamp, firstDayOfCamp);
  }

  getDayLabel(dayOfCamp, firstDayOfCamp) {
  	let firstDayOfCampSplit = firstDayOfCamp.split(" ");
  	let firstDayOfCampDay = parseInt(firstDayOfCampSplit[1]);
  	if (firstDayOfCampSplit[0] === "June") {
  		if (dayOfCamp <= (30 - firstDayOfCampDay + 1)) {
  			return "June " + (firstDayOfCampDay + dayOfCamp - 1);
  		} else if (dayOfCamp > (62 - firstDayOfCampDay)) { 
  			return "August " + (dayOfCamp + firstDayOfCampDay - 62);
  		} else {
  			return "July " + (dayOfCamp + firstDayOfCampDay - 31);
  		}
  	} else if (firstDayOfCampSplit[0] === "July") {
  		if ((dayOfCamp + firstDayOfCamp - 32) > 0) {
  			return "August " + (dayOfCamp + firstDayOfCamp - 32);
  		} else {
  			return "July " + (dayOfCamp + firstDayOfCampDay - 1);
  		}
  	}
  }
}

/*
1 	July 3 	-> dayOfCamp > (30 - firstDayOfCamp.day + 1) = July + dayOfCamp - (30 - firstDayOfCamp.day + 1) //1<(31-firstDayOfCamp.day)=
2 	July 4 	-> dayOfCamp > (30 - firstDayOfCamp.day + 1) = July + dayOfCamp - (30 - firstDayOfCamp.day + 1)
3 	July 5 	-> dayOfCamp > (30 - firstDayOfCamp.day + 1) = July + dayOfCamp - (30 - firstDayOfCamp.day + 1)
4 	July 6
5 	July 7
6 	July 8
7 	July 9
8 	July 10
9 	July 11
10 	July 12
11 	July 13
12 	July 14
13 	July 15
14 	July 16
15 	July 17
16 	July 18
17 	July 19
18 	July 20
19 	July 21
20 	July 22
21 	July 23
22 	July 24
23 	July 25
24 	July 26
25 	July 27
26 	July 28
27 	July 29
28 	July 30
29 	July 31 -> dayOfCamp > (30 - firstDayOfCamp.day + 1) = July + dayOfCamp - (30 - firstDayOfCamp.day + 1)
30 	August 1 -> dayOfCamp > (62 - firstDayOfCamp.day) = August + dayOfCamp - (62 - firstDayOfCamp.day) // 30>(31-firstdayofcamp + 1) // dayofcamp+firstdayofcamp-32 > 0
31 	August 2 -> dayOfCamp > (62 - firstDayOfCamp.day) = August + dayOfCamp - (62 - firstDayOfCamp.day) // 36 > (62 - firstDayOfCamp.day) = 62-28=34... 36 - (30 - 28 + 1)=36-1=35 
32 	August 3
33 	August 4
34 	August 5
35 	August 6
36 	August 7
47 	August 8
*/

module.exports = DayEntity;
