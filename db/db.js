const sqliite3 = require('sqlite3').verbose();

const db = new sqliite3.Database('./db/sqlite3-database.db');

const init = () => {
    db.run(`CREATE TABLE IF NOT EXISTS staff(
      id                INTEGER  PRIMARY KEY  AUTOINCREMENT,
      name              TEXT NOT NULL,
      od_count          INTEGER,
      allowed_days_off  INTEGER,
      colour_wars       INTEGER,
      walden_games      INTEGER,
      rotating_od       INTEGER,
      birth_year        INTEGER NOT NULL,
      unit              TEXT NOT NULL,
      half_unit         TEXT NOT NULL,
      new_to_walden     INTEGER NOT NULL,
      day_off_count     INTEGER,
      head_staff        INTEGER NOT NULL,
      cabin             TEXT NOT NULL,
      gender            TEXT NOT NULL,
      last_day_off      INTEGER,
      role              TEXT NOT NULL
    )`);

    // db.run(`CREATE TABLE IF NOT EXISTS tab(
    //   id     INTEGER PRIMARY KEY  AUTOINCREMENT, 
    //   name   TEXT NOT NULL
    // )`);

    // db.run(`CREATE TABLE IF NOT EXISTS tab_users(
    //   id        INTEGER PRIMARY KEY  AUTOINCREMENT, 
    //   user_id   INTEGER NOT NULL, 
    //   tab_id  INTEGER NOT NULL,
    //   FOREIGN KEY(user_id) REFERENCES user(id),
    //   FOREIGN KEY(tab_id) REFERENCES tab(id)
    // )`);

    // db.run(`CREATE TABLE IF NOT EXISTS bill(
    //   id            INTEGER PRIMARY KEY  AUTOINCREMENT, 
    //   amount_paid   INTEGER NOT NULL,
    //   date          DATE NOT NULL,
    //   by_user_id    INTEGER NOT NULL,
    //   tab_id      INTEGER NOT NULL,
    //   FOREIGN KEY(by_user_id) REFERENCES user(id),
    //   FOREIGN KEY(tab_id) REFERENCES tab(id)
    // )`);
};

module.exports = {
  db: db,
  init: init
};
