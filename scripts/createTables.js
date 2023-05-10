const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("p6_sample");

db.serialize(() => {
  // db.run(
  //   "CREATE TABLE users (ID NUMBER, USERNAME VARCHAR(32), PASSWORD VARCHAR(32))"
  // );

  // db.run(
  //   `INSERT INTO users VALUES (?, ?, ?)`,
  //   [1, "p6_user", "p6_user"],
  //   function (err) {
  //     if (err) {
  //       return console.log(err.message);
  //     }
  //     console.log(`A row has been inserted with rowid ${this.lastID}`);
  //   }
  // );

  // const cols = [
  //   "id NUMBER",
  //   "name VARCHAR(255)",
  //   "description VARCHAR(255)",
  //   "isActive BOOLEAN",
  //   "category VARCHAR(255)",
  //   "address1 VARCHAR(255)",
  //   "address2 VARCHAR(255)",
  //   "postalCode VARCHAR(10)",
  //   "city VARCHAR(64)",
  //   "country VARCHAR(64)",
  //   "phone VARCHAR(15)",
  //   "email VARCHAR(255)",
  // ];

  // db.run(`CREATE TABLE suppliers (${cols.join(", ")})`);

  // db.run(
  //   `INSERT INTO suppliers VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  //   [
  //     2,
  //     "Test Supplier 2",
  //     "This is a test supplier",
  //     true,
  //     "materials",
  //     "101 Congress Av.",
  //     "",
  //     "78740",
  //     "Austin",
  //     "USA",
  //     "512-555-5556",
  //     "",
  //     1,
  //   ],
  //   function (err) {
  //     if (err) {
  //       return console.log(err.message);
  //     }
  //     console.log(`A row has been inserted with rowid ${this.lastID}`);
  //   }
  // );

  db.each("SELECT * FROM suppliers", (err, row) => {
    console.log(row);
  });

  // db.run(`ALTER TABLE suppliers DROP COLUMN USER_ID`);

  // db.run(
  //   `UPDATE suppliers SET CreatedByUser = 1, LastUpdatedByUser = 1 WHERE id = 2`,
  //   function (err) {
  //     if (err) {
  //       return console.error(err.message);
  //     }
  //     console.log(`Row(s) updated!`);
  //   }
  // );
});

db.close();
