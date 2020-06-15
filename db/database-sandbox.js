const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('slowdown/server/res/slowdown.db');

// function createUserTable() {
//   db.run(`CREATE TABLE IF NOT EXISTS users(
//           username TEXT UNIQUE NOT NULL,
//           hashedPassword TEXT NOT NULL,
//           sessionTokens TEXT);`);
// }

// function getAllUsers() {
//   const query = `SELECT rowid, * FROM users`;
//   db.all(query, [], (err, rows) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log(`got ${rows.length} rows of users`);
//     rows.forEach((row) => {
//       console.log(row.rowid, row.username, row.hashedPassword);
//     });
//   });
// }

// function insertTestUsers() {
//   const query =
//     `INSERT INTO users(username, hashedPassword, sessionTokens)
//      VALUES(?, ?, ?)`;

//   db.serialize(() => {
//     db.run(query, ['dane', '123', 'session1']);
//     db.run(query, ['uberzoonie', 'passwordhashed', 'session1']); 
//     db.run(query, ['chungus', '2', null]);
//   });
// }

// function createSessionTable() {
//   db.run(`CREATE TABLE IF NOT EXISTS sessions(
//           sessionToken TEXT UNIQUE NOT NULL,
//           username TEXT NOT NULL,
//           expiryDate INT NOT NULL)`);
// }

// function getAllSessions() {
//   const query = `SELECT rowid, * FROM sessions`;
//   db.all(query, [], (err, rows) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log(`got ${rows.length} rows of sessions`);
//     rows.forEach((row) => {
//       console.log(row.rowid, row.sessionToken, row.username, row.expiryDate);
//     });
//   });
// }

// function createScoresTable() {
//   db.run('CREATE TABLE user_scores(userId, levelId, date, score)');
// }

// function deleteScoresTable() {
//   db.run('DROP TABLE IF EXISTS user_scores');
// }

// function getAllScores() {
//   const query =
//     'SELECT rowid, * FROM user_scores';
//   db.all(query, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     rows.forEach((row) => {
//       console.log(row.rowid + ": " + row.userId);
//     });
//   });
// }

    const sql = `
      INSERT INTO staff (
        birth_year,
        half_unit,
        new_to_walden,
        head_staff,
        cabin,
        role,
        gender,
        name
      ) VALUES (
        $birthYear,
        $half_unit,
        $new_to_walden,
        $head_staff,
        $cabin,
        $role,
        $gender,
        $name
      )
    `;
    const params = {
      $birthYear : staff.birthYear,
      $half_unit : staff.halfUnit,
      $new_to_walden : staff.newToWalden,
      $head_staff : staff.headStaff,
      $cabin : staff.cabin,
      $role : staff.role,
      $gender : staff.gender,
      $name : staff.name
    };

function insertTestScores() {
  const query =
    `INSERT INTO staff (
      id,
      name,
      od_count,
      allowed_days_off,
      colour_wars_duty,
      walden_games_duty,
      rotating_od,
      birth_year,
      unit,
      half_unit,
      new_to_walden,
      day_off_count,
      head_staff,
      cabin,
      gender,
      last_day_off,
      role
      ) VALUES (?,?,?,?)`;

  db.serialize(() => {
    db.run(query, ['dane', '0', Date.now(), 100]);
    db.run(query, ['dane', '1', Date.now(), 10]);
    db.run(query, ['dane', '2', Date.now(), 90]);
    db.run(query, ['chungus', '2', Date.now(), 10]);
    db.run(query, ['jigrandi', '2', Date.now(), 10]);
  });
}

db.serialize(() => {
  createUserTable();
  getAllUsers();

  createSessionTable();
  getAllSessions();
});



db.close();
