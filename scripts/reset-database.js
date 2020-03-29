const sqliite3 = require('sqlite3').verbose();

const db = new sqliite3.Database('./db/sqlite3-database.db');

function deleteDaysTable() {
  db.run('DROP TABLE IF EXISTS day');
};

function deleteStaffTable() {
  db.run('DROP TABLE IF EXISTS staff');
};


function insertTestDays() {
  const query =
    `INSERT INTO users(username, hashedPassword, sessionTokens)
     VALUES(?, ?, ?)`;

  db.serialize(() => {
    db.run(query, ['dane', '123', 'session1']);
    db.run(query, ['uberzoonie', 'passwordhashed', 'session1']); 
    db.run(query, ['chungus', '2', null]);
  });
}