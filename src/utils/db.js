import sqlite3 from 'better-sqlite3';

const db = new sqlite3('database.db', {verbose: console.log});
db.pragma('journal_mode = WAL');

export function createRecord(table, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = values.map(() => '?').join(', ');
  const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})` 
  console.log(sql);
  const statement = db.prepare(sql);
  console.log(values);
  const result = statement.run(values);
  return result.lastInsertRowid;
}

function parseId(id) {

  const parsedId = parseInt(id);

  if (Number.isNaN(parsedId)) {
    throw new Error('Invalid ID. Please provide a valid integer ID.');
  }

  return parsedId;
}

export function getRecordById(table, id) {
  const parsedId = parseId(id);

  const statement = db.prepare(`SELECT * FROM ${table} WHERE id = ?`);

  return statement.get(parsedId);
}

export function updateRecord(table, id, data) {
  const parsedId = parseId(id);

  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(key => `${key} = ?`).join(', ');
  const statement = db.prepare(`UPDATE ${table} SET ${placeholders} WHERE id = ?`);
  const result = statement.run([...values, parsedId]);
  return result.changes > 0;
}

export function executeQuery(table, condition) {
  let whereClause = '';
  const values = [];

  if (condition) {
    const keys = Object.keys(condition);
    const conditions = keys.map(key => {
      values.push(condition[key]);
      return `${key} = ?`;
    });

    whereClause = `WHERE ${conditions.join(' AND ')}`;
  }

  const query = `SELECT * FROM ${table} ${whereClause}`;
  const statement = db.prepare(query);
  return statement.all(values);
}

export function getRecordWhere(table, condition) {
  let whereClause = '';
  const values = [];

  if (condition) {
    const keys = Object.keys(condition);
    const conditions = keys.map(key => {
      values.push(condition[key]);
      return `${key} = ?`;
    });

    whereClause = `WHERE ${conditions.join(' AND ')}`;
  }

  const query = `SELECT * FROM ${table} ${whereClause}`;
  const statement = db.prepare(query);
  return statement.get(values);
}

export function deleteRecordById(table, id) {
  const parsedId = parseId(id);

  const statement = db.prepare(`DELETE FROM ${table} WHERE id = ?`);
  const result = statement.run(parsedId);
  return result.changes > 0;
}

function executeStatement(sql) {
  const statement = db.prepare(sql);
  const result = statement.run();

  return result;
}

export function initDb() {
const createStatements = [
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    spotify_user_id TEXT NOT NULL,
    name TEXT NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    creator_id INTEGER,
    name TEXT NOT NULL,
    description TEXT,
    FOREIGN KEY (creator_id) REFERENCES users(id)
  );`,
  `CREATE TABLE IF NOT EXISTS room_admins (
    user_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, room_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
  );`
];

  for (let statement of createStatements) {
    executeStatement(statement);
  }

}
