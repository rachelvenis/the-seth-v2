const Model = require('./model');
const AssignmentEntity = require('../entities/assignment-entity');

/**
 * User Model
 */
class DraftAssignmentModel {
  constructor() {
    this.model = new Model();
  }
  
  findAll() {
    const sql = `
      SELECT
          *
      FROM
          draft_assignment
    `;
    
    return this.model.findAll(sql)
      .then((rows) => {
        const assignment = [];
        
        for(const row of rows) {
          assignment.push(new AssignmentEntity(row.id, row.staffId, row.dayId, row.type, row.halfUnit));
        }
        return assignment;
      });
  }
  
  findAllByDay() {
    const sql = `
      SELECT
          *
      FROM
          draft_assignment da
      JOIN
          staff s
      ON s.id = da.staffId
      ORDER BY dayId, lastName
    `;
    
    return this.model.findAll(sql)
      .then((rows) => {
        const assignment = [];
        
        for(const row of rows) {
          assignment.push(new AssignmentEntity(row.id, row.staffId, row.dayId, row.type, row.halfUnit));
        }
        return assignment;
      });
  }

  
  findAllDO() {
    const sql = `
      SELECT
          *
      FROM
          draft_assignment
      WHERE type = '0'
    `;
    
    return this.model.findAll(sql)
      .then((rows) => {
        const assignment = [];
        
        for(const row of rows) {
          assignment.push(new AssignmentEntity(row.id, row.staffId, row.dayId, row.type, row.halfUnit));
        }
        return assignment;
      });
  }
  
  findAllOD() {
    const sql = `
      SELECT
          *
      FROM
          draft_assignment
      WHERE type = '1'
    `;
    
    return this.model.findAll(sql)
      .then((rows) => {
        const assignment = [];
        
        for(const row of rows) {
          assignment.push(new AssignmentEntity(row.id, row.staffId, row.dayId, row.type, row.halfUnit));
        }
        return assignment;
      });
  }

  findById(id) {
    const sql = `
      SELECT
          *
      FROM
          draft_assignment
      WHERE
          id = $id
    `;
    const params = {
      $id: id
    };
    
    return this.model.findOne(sql, params)
      .then((row) => {
        return new AssignmentEntity(row.id, row.staffId, row.dayId, row.type, row.halfUnit);
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
  
  create(assignment) {
    const sql = `
      INSERT INTO draft_assignment(
        staffId, 
        dayId, 
        type, 
        halfUnit
      ) VALUES (
        $staffId, 
        $dayId, 
        $type, 
        $halfUnit
      )
    `;

    const params = {
      $staffId : assignment.staffId, 
      $dayId : assignment.dayId, 
      $type : assignment.type, 
      $halfUnit : assignment.halfUnit
    };
    return this.model.run(sql, params)
      .then((id) => {
        return this.findById(id);
      });
  }
  
  update(assignment) {
    const sql = `
      REPLACE INTO draft_assignment(
        id, 
        staffId, 
        dayId, 
        type, 
        halfUnit
      ) VALUES (
        $id, 
        $staffId, 
        $dayId, 
        $type, 
        $halfUnit
      )
    `;

    const params = {
      $id : assignment.id,
      $staffId : assignment.staffId, 
      $dayId : assignment.dayId, 
      $type : assignment.type, 
      $halfUnit : assignment.halfUnit
    };
    
    return this.model.run(sql, params);
  }
  
  delete(id) {
    //TODO remove rows in squad_users table
    const sql = `
      DELETE FROM
          draft_assignment
      WHERE
          id = $id
    `;
    const params = {
      $id: id
    };
    
    return this.model.run(sql, params);
  }
  
  drop() {
    //TODO remove rows in squad_users table
    // const sql = ``;
    console.log("drop");
    const sql = `DROP TABLE IF EXISTS draft_assignment`;
    
    return this.model.run(sql, {});
  }
  
  AndCreate() {
    //TODO remove rows in squad_users table
    // const sql = ``;
    console.log("AndCreate");
    const sql = `
      CREATE TABLE IF NOT EXISTS draft_assignment(
      id            INTEGER PRIMARY KEY  AUTOINCREMENT, 
      dayId         INTEGER NOT NULL, 
      staffId       INTEGER NOT NULL,
      type          TEXT,
      halfUnit      TEXT,
      FOREIGN KEY(dayId) REFERENCES day(id),
      FOREIGN KEY(staffId) REFERENCES staff(id))`;
    
    return this.model.run(sql, {});
  }

/*
      CREATE TABLE IF NOT EXISTS draft_assignment(
      id            INTEGER PRIMARY KEY  AUTOINCREMENT, 
      dayId         INTEGER NOT NULL, 
      staffId       INTEGER NOT NULL,
      type          TEXT,
      halfUnit      TEXT,
      FOREIGN KEY(dayId) REFERENCES day(id),
      FOREIGN KEY(staffId) REFERENCES staff(id))
*/



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

module.exports = DraftAssignmentModel;
