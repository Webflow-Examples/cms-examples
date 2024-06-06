import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Open a database in a .db file. It will create the file if it does not exist.
async function setupDatabase() {
  // Open the SQLite database file (creates it if it doesn't exist)
  const db = await open({
    filename: "./auth/mydatabase.db",
    driver: sqlite3.Database,
  });

  // Create a table to store tokens if it doesn't exist already
  await db.exec(`CREATE TABLE IF NOT EXISTS tokens (
    userId TEXT PRIMARY KEY,
    token TEXT NOT NULL
  )`);

  // Add or update a token for a user (avoids duplicates)
  await db.exec(`
    CREATE TRIGGER IF NOT EXISTS insert_or_update_token
    AFTER INSERT ON tokens
    BEGIN
      UPDATE tokens SET token = NEW.token WHERE userId = NEW.userId;
    END;
  `);

  return db;
}

export default setupDatabase;
