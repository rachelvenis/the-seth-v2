const Model = require('./model');
const StaffEntity = require('../entities/staff-entity');

/**
 * User Model
 */
class StaffModel {
  constructor() {
    this.model = new Model();
  }
  
  findAll() {
    const sql = `
      SELECT
          *
      FROM
          staff
    `;
    
    return this.model.findAll(sql)
      .then((rows) => {
        const staff = [];
        
        for(const row of rows) {
          staff.push(new StaffEntity(
            row.id,
            row.firstName,
            row.lastName,
            row.birth_year,
            row.half_unit,
            row.new_to_walden,
            row.staff_type,
            row.cabin,
            row.role,
            row.gender));
        }
        return staff;
      });
  }

  findById(id) {
    const sql = `
      SELECT
          *
      FROM
          staff
      WHERE
          id = $id
    `;
    const params = {
      $id: id
    };
    
    return this.model.findOne(sql, params)
      .then((row) => {
        return new StaffEntity(
          row.id,
          row.firstName,
          row.lastName,
          row.birth_year,
          row.half_unit,
          row.new_to_walden,
          row.staff_type,
          row.cabin,
          row.role,
          row.gender);
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
  
  create(staff) {
    const sql = `
      INSERT INTO staff (
        id,
        firstName,
        lastName,
        od_count,
        allowed_days_off,
        colour_wars_duty,
        walden_games_duty,
        rotating_od,
        birth_year,
        half_unit,
        new_to_walden,
        day_off_count,
        head_staff,
        cabin,
        gender,
        last_day_off,
        staff_type,
        role
      ) VALUES (
        $id,
        $firstName,
        $lastName,
        $od_count,
        $allowed_days_off,
        $colour_wars_duty,
        $walden_games_duty,
        $rotating_od,
        $birth_year,
        $half_unit,
        $new_to_walden,
        $day_off_count,
        $head_staff,
        $cabin,
        $gender,
        $last_day_off,
        $staff_type,
        $role
      )
    `;
    const params = {
        $id: staff.id,
        $firstName: staff.firstName,
        $lastName: staff.lastName,
        $od_count: staff.ODCount,
        $allowed_days_off: staff.allowedDaysOff,
        $colour_wars_duty: staff.colourWarsDuty,
        $walden_games_duty: staff.waldenGamesDuty,
        $rotating_od: staff.rotatingOD,
        $birth_year: staff.birthYear,
        $half_unit: staff.halfUnit,
        $new_to_walden: staff.newToWalden,
        $day_off_count: staff.dayOffCount,
        $head_staff: staff.headStaff,
        $cabin: staff.cabin,
        $gender: staff.gender,
        $last_day_off: staff.lastDayOff,
        $staff_type: staff.staffType,
        $role: staff.role
    };
    
    return this.model.run(sql, params)
      .then((id) => {
        return this.findById(id);
      });
  }
  
  update(staff) {
    const sql = `
      REPLACE INTO staff (
        id,
        birth_year,
        half_unit,
        new_to_walden,
        head_staff,
        cabin,
        role,
        gender,
        staff_type,
        name
      ) VALUES (
        $id,
        $birthYear,
        $half_unit,
        $new_to_walden,
        $head_staff,
        $cabin,
        $role,
        $gender,
        $staff_type,
        $name
      )
    `;
    const params = {
      $id : staff.id,
      $birthYear : staff.birthYear,
      $half_unit : staff.halfUnit,
      $new_to_walden : staff.newToWalden,
      $head_staff : staff.headStaff,
      $cabin : staff.cabin,
      $role : staff.role,
      $gender : staff.gender,
      $staff_type : staff.staff_type,
      $name : staff.name
    };
    
    return this.model.run(sql, params);
  }
  
  delete(id) {
    //TODO remove rows in squad_users table
    const sql = `
      DELETE FROM
          staff
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

module.exports = StaffModel;
