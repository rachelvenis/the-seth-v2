const Model = require('./model');
const AssignmentEntity = require('../entities/assignment-entity');

/**
 * User Model
 */
class AssignmentModel {
  constructor() {
    this.model = new Model();
  }
  
  findAll() {
    const sql = `
      SELECT
          *
      FROM
          assignment
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
          assignment
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
      INSERT INTO assignment(
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
      REPLACE INTO assignment(
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
          assignment
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

module.exports = AssignmentModel;
