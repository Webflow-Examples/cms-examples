import setupDatabase from "./db.js";

export async function storeToken(userId, token) {
  const db = await setupDatabase();
  await db.run("INSERT INTO tokens (userId, token) VALUES (?, ?)", [
    userId,
    token,
  ]);
  await db.close();
}

export async function getToken(userId) {
  const db = await setupDatabase();
  const result = await db.get("SELECT token FROM tokens WHERE userId = ?", [
    userId,
  ]);
  await db.close();
  return result ? result.token : null;
}
