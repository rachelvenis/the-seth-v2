const Model = require('./model');
const DayEntity = require('../entities/day-entity');

/**
 * User Model
 */
class DayModel {
  constructor() {
    this.model = new Model();
  }
  
  findAll() {
    const sql = `
      SELECT
          *
      FROM
          day
    `;
    
    return this.model.findAll(sql)
      .then((rows) => {
        const day = [];
        
        for(const row of rows) {
          day.push(new  DayEntity(row.id,
            row.dayOfCamp,
            row.rotatingOD,
            row.everyoneInCamp,
            row.colourChangeover,
            row.bunkNight,
            row.unitFieldTrip,
            row.unitPlay,
            row.noHeadStaffDayOff,
            row.normalOD,
            row.halfUnitCanoeTrip,
            row.cabinOvernight,
            row.useItOrLooseIt,
            row.colourWarsPrep,
            row.waldenGamesPrep,
            "June 28"));
        }
        return day;
      });
  }

  findById(id) {
    const sql = `
      SELECT
          *
      FROM
          day
      WHERE
          id = $id
    `;
    const params = {
      $id: id
    };
    
    return this.model.findOne(sql, params)
      .then((row) => {
        return new DayEntity(row.id,
          row.dayOfCamp,
          row.rotatingOD,
          row.everyoneInCamp,
          row.colourChangeover,
          row.bunkNight,
          row.unitFieldTrip,
          row.unitPlay,
          row.noHeadStaffDayOff,
          row.normalOD,
          row.halfUnitCanoeTrip,
          row.cabinOvernight,
          row.useItOrLooseIt,
          row.colourWarsPrep,
          row.waldenGamesPrep,
          "June 28");
      });
  }


  // findByUsername(username) {
  //   const sql = `
  //     SELECT
  //         id,
  //         name,
  //         username
  //     FROM
  //         staff
  //     WHERE
  //         username = $username
  //   `;
  //   const params = {
  //     $username: username
  //   };
    
  //   return this.model.findOne(sql, params)
  //     .then((row) => {
  //       return new UserEntity(row.id, row.name, row.username);
  //     });
  // }
  
  create(day) {
    const sql = `
      INSERT INTO day (
        dayOfCamp,
        rotatingOD,
        everyoneInCamp,
        colourChangeover,
        bunkNight,
        colourWarsPrep,
        waldenGamesPrep,
        unitFieldTrip,
        unitPlay,
        noHeadStaffDayOff,
        normalOD,
        halfUnitCanoeTrip,
        cabinOvernight,
        useItOrLooseIt,
        dayLabel
      ) VALUES (
        $dayOfCamp,
        $rotatingOD,
        $everyoneInCamp,
        $colourChangeover,
        $bunkNight,
        $colourWarsPrep,
        $waldenGamesPrep,
        $unitFieldTrip,
        $unitPlay,
        $noHeadStaffDayOff,
        $normalOD,
        $halfUnitCanoeTrip,
        $cabinOvernight,
        $useItOrLooseIt,
        $dayLabel
      )
    `;
    const params = {
      $dayOfCamp : day.dayOfCamp,
      $rotatingOD : day.rotatingOD,
      $everyoneInCamp : day.everyoneInCamp,
      $colourChangeover : day.colourChangeover,
      $bunkNight : day.bunkNight,
      $colourWarsPrep : day.colourWarsPrep,
      $waldenGamesPrep : day.waldenGamesPrep,
      $unitFieldTrip : day.unitFieldTrip,
      $unitPlay : day.unitPlay,
      $noHeadStaffDayOff : day.noHeadStaffDayOff,
      $normalOD : day.normalOD,
      $halfUnitCanoeTrip : day.halfUnitCanoeTrip,
      $cabinOvernight : day.cabinOvernight,
      $useItOrLooseIt : day.useItOrLooseIt,
      $dayLabel : day.dayLabel
    };
    
    return this.model.run(sql, params)
      .then((id) => {
        return this.findById(id);
      });
  }
  
  update(day) {
    console.log(day);
    const sql = `
      REPLACE INTO day (
        id,
        dayOfCamp,
        rotatingOD,
        everyoneInCamp,
        colourChangeover,
        bunkNight,
        colourWarsPrep,
        waldenGamesPrep,
        unitFieldTrip,
        unitPlay,
        noHeadStaffDayOff,
        normalOD,
        halfUnitCanoeTrip,
        cabinOvernight,
        useItOrLooseIt,
        dayLabel
      ) VALUES (
        $id,
        $dayOfCamp,
        $rotatingOD,
        $everyoneInCamp,
        $colourChangeover,
        $bunkNight,
        $colourWarsPrep,
        $waldenGamesPrep,
        $unitFieldTrip,
        $unitPlay,
        $noHeadStaffDayOff,
        $normalOD,
        $halfUnitCanoeTrip,
        $cabinOvernight,
        $useItOrLooseIt
        $dayLabel
      )
    `;
    const params = {
      $id : day.id,
      $dayOfCamp : day.dayOfCamp,
      $rotatingOD : day.rotatingOD,
      $everyoneInCamp : day.everyoneInCamp,
      $colourChangeover : day.colourChangeover,
      $bunkNight : day.bunkNight,
      $colourWarsPrep : day.colourWarsPrep,
      $waldenGamesPrep : day.waldenGamesPrep,
      $unitFieldTrip : day.unitFieldTrip,
      $unitPlay : day.unitPlay,
      $noHeadStaffDayOff : day.noHeadStaffDayOff,
      $normalOD : day.normalOD,
      $halfUnitCanoeTrip : day.halfUnitCanoeTrip,
      $cabinOvernight : day.cabinOvernight,
      $useItOrLooseIt : day.useItOrLooseIt,
      $dayLabel : day.dayLabel
    };
    
    return this.model.run(sql, params);
  }
  
  delete(id) {
    //TODO remove rows in squad_users table
    const sql = `
      DELETE FROM
          day
      WHERE
          id = $id
    `;
    const params = {
      $id: id
    };
    
    return this.model.run(sql, params);
  }

//   findByTab(id) {
//     const sql = `
//       SELECT
//           user_id
//       FROM
//           tab_users
//       WHERE
//           tab_id = ${id}
//     `;
    
//     return this.model.findAll(sql)
//       .then((rows) => {
//         const users = [];
        
//         for(const row of rows) {
//           users.push(row.user_id);
//         }
        
//         return users;
//       });
//   }
}

module.exports = DayModel;
