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
          (SELECT * FROM draft_od_assignment
          UNION ALL
          SELECT * FROM draft_do_assignment) da
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
      FROM draft_do_assignment da
      LEFT JOIN draft_error de
      ON da.id = de.draftAssignmentId 
      WHERE type = '0'
    `;

    return this.model.findAll(sql)
      .then((rows) => {
        const assignment = [];
          for(const row of rows) {
            let new_assignment = new AssignmentEntity(row.id, row.staffId, row.dayId, row.type, row.halfUnit);
            new_assignment.set_error_messages([row.message]);
            assignment.push(new_assignment);
          }
          return assignment;
      });
  }
  
  findAllOD() {
    const sql = `
      SELECT
          *
      FROM
          draft_od_assignment
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

  findErrorById(id) {
    const sql = `
      SELECT
          *
      FROM
          draft_error
      WHERE
          id = $id
    `;
    const params = {
      $id: id
    };

    
    return this.model.findOne(sql, params)
      .then((row) => {
          return [row.draftAssignmentId, row.status, row.id, row.message];
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
  
  createOD(assignment) {
    const sql = `
      INSERT INTO draft_od_assignment(
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
  
  createDO(assignment) {
    const sql = `
      INSERT INTO draft_do_assignment(
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

  createError(assignment, error) {
    const sql = `
      INSERT INTO draft_error(
        draftAssignmentId, 
        message
      ) VALUES (
        $draftAssignmentId, 
        $message
      )
    `;

    const params = {
      $draftAssignmentId : assignment.id, 
      $message : error
    };
    return this.model.run(sql, params)
      .then((id) => {
        return this.findErrorById(id);
      });
  }
  

  findAllDraftErrors() {
    const sql = `
      SELECT *
      FROM draft_error
    `;

    return this.model.findAll(sql)
      .then((rows) => {
        const assignment = [];
        for(const row of rows) {
          assignment.push([row.draftAssignmentId, row.status, row.id, row.message]);
        }
        return assignment;
      });
  }
  
  updateOD(assignment) {
    const sql = `
      REPLACE INTO draft_od_assignment(
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
  
  updateDO(assignment) {
    const sql = `
      REPLACE INTO draft_do_assignment(
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
  
  dropDraftsErrors() {
    //TODO remove rows in squad_users table
    const sql = `DROP TABLE IF EXISTS draft_error`;
    
    return this.model.run(sql, {});
  }
  
  dropDODrafts() {
    //TODO remove rows in squad_users table
    const sql = `DROP TABLE IF EXISTS draft_do_assignment`;
    
    return this.model.run(sql, {});
  }
  
  dropODDrafts() {
    //TODO remove rows in squad_users table
    const sql = `DROP TABLE IF EXISTS draft_od_assignment`;
    
    return this.model.run(sql, {});
  }
  
  AndCreateDODrafts() {
    //TODO remove rows in squad_users table
    const sql = `
      CREATE TABLE IF NOT EXISTS draft_do_assignment(
      id            INTEGER PRIMARY KEY  AUTOINCREMENT, 
      dayId         INTEGER NOT NULL, 
      staffId       INTEGER NOT NULL,
      type          TEXT,
      halfUnit      TEXT,
      FOREIGN KEY(dayId) REFERENCES day(id),
      FOREIGN KEY(staffId) REFERENCES staff(id))`;
    
    return this.model.run(sql, {});
  }

  AndCreateDODraftErrors() {
    //TODO remove rows in squad_users table
    const sql = `
      CREATE TABLE IF NOT EXISTS draft_error(
      id                  INTEGER PRIMARY KEY  AUTOINCREMENT, 
      draftAssignmentId   INTEGER NOT NULL, 
      message             TEXT,
      status              TEXT,
      FOREIGN KEY(draftAssignmentId) REFERENCES draft_assignment(id))
      `;
    
    return this.model.run(sql, {}); 
  }
  
  AndCreateODDrafts() {
    //TODO remove rows in squad_users table
    const sql = `
      CREATE TABLE IF NOT EXISTS draft_od_assignment(
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
