const sqliite3 = require('sqlite3').verbose();

const db = new sqliite3.Database('./db/sqlite3-database.db');

const init = () => {
    db.run(`CREATE TABLE IF NOT EXISTS staff(
      id                INTEGER  PRIMARY KEY  AUTOINCREMENT,
      firstName         TEXT NOT NULL,
      lastName          TEXT NOT NULL,
      od_count          INTEGER,
      allowed_days_off  INTEGER,
      colour_wars_duty  INTEGER,
      walden_games_duty INTEGER,
      rotating_od       INTEGER,
      birth_year        INTEGER NOT NULL,
      half_unit         TEXT NOT NULL,
      new_to_walden     INTEGER DEFAULT 0,
      day_off_count     INTEGER,
      head_staff        INTEGER DEFAULT 0,
      cabin             TEXT NOT NULL,
      gender            TEXT NOT NULL,
      last_day_off      INTEGER,
      role              TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS day(
      id                    INTEGER  PRIMARY KEY  AUTOINCREMENT,
      dayOfCamp             INTEGER,
      rotatingOD            INTEGER NOT NULL,
      everyoneInCamp        INTEGER NOT NULL,
      colourChangeover      INTEGER NOT NULL,
      bunkNight             INTEGER NOT NULL,
      colourWarsPrep        INTEGER NOT NULL,
      waldenGamesPrep       INTEGER NOT NULL,
      unitFieldTrip         TEXT,
      unitPlay              TEXT,
      noHeadStaffDayOff     INTEGER NOT NULL,
      normalOD              INTEGER NOT NULL,
      halfUnitCanoeTrip         TEXT,
      cabinOvernight        TEXT,
      useItOrLooseIt        INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS assignment(
      id            INTEGER PRIMARY KEY  AUTOINCREMENT, 
      dayId         INTEGER NOT NULL, 
      staffId       INTEGER NOT NULL,
      type          TEXT,
      halfUnit      TEXT,
      FOREIGN KEY(dayId) REFERENCES day(id),
      FOREIGN KEY(staffId) REFERENCES staff(id)
    )`);

    // db.run(`DROP TABLE IF EXISTS assignment`);

};

module.exports = {
  db: db,
  init: init
};
