import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Open a database in a .db file. It will create the file if it does not exist.
async function setupDatabase() {
  const db = await open({
    filename: "./mydatabase.db",
    driver: sqlite3.Database,
  });

  // Create a table to store tokens
  await db.exec(`CREATE TABLE IF NOT EXISTS tokens (
        userId TEXT PRIMARY KEY,
        token TEXT NOT NULL
    )`);

  return db;
}

export default setupDatabase;
