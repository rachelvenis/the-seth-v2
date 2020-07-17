const db = require('../db/db').db;

class Model {
  findAll(sql) {
    return new Promise((resolve, reject) => {
      db.all(sql, (error, rows) => {
        if(error) {
            console.log('Internal Server Error', error);
          // reject(new ModelError(20, 'Internal Server Error'));
        }
        else if(rows === null || rows.length === 0) {
            console.log('Entity Not Found');
          // reject(new ModelError(21, 'Entity Not Found'));
        }
        else {
          resolve(rows);
        }
      });
    });
  }
  
  findOne(sql, params) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(sql);
      
      stmt.all(params, (error, rows) => {
        if(error) {
            console.log('Invalid Arguments', error);
          // reject(new ModelError(11, 'Invalid Arguments'));
        }
        else if(rows === null || rows.length === 0) {
            console.log('Entity Not Found');
          // reject(new ModelError(21, 'Entity Not Found'));
        }
        else {
          const row = rows[0];
          resolve(row);
        }
      });
    });
  }
  
  run(sql, params) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(sql);
      
      stmt.run(params, function(error) {
        if(this.changes === 1) {
          resolve(this.lastID);
        }
        else if(this.changes === 0) {
          resolve(this.lastID);
            console.log('Entity Not Found');
          // reject(new ModelError(21, 'Entity Not Found'));
        }
        else {
            console.log('Invalid Arguments', error);
          // reject(new ModelError(11, 'Invalid Arguments'));
        }
      });
    });
  }
}

module.exports = Model;
