import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const dataDir=path.resolve(__dirname,'../data'); fs.mkdirSync(dataDir,{recursive:true});
const db=new Database(path.join(dataDir,'agrivision.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(`
CREATE TABLE IF NOT EXISTS users(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 email TEXT UNIQUE,
 phone TEXT UNIQUE,
 password_hash TEXT NOT NULL,
 name TEXT DEFAULT '', language TEXT DEFAULT 'English',
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS otp_codes(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 contact TEXT NOT NULL,
 method TEXT NOT NULL,
 code_hash TEXT NOT NULL,
 purpose TEXT NOT NULL,
 expires_at INTEGER NOT NULL,
 attempts INTEGER NOT NULL DEFAULT 0,
 consumed INTEGER NOT NULL DEFAULT 0,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_otp_contact ON otp_codes(contact,method,purpose);
CREATE TABLE IF NOT EXISTS profiles(
 user_id INTEGER PRIMARY KEY,
 state TEXT DEFAULT '', district TEXT DEFAULT '', village TEXT DEFAULT '',
 environment TEXT DEFAULT '', crops_json TEXT DEFAULT '[]', main_crop TEXT DEFAULT '',
 sowing_date TEXT DEFAULT '', growth_stage TEXT DEFAULT '', field_size TEXT DEFAULT '',
 latitude REAL, longitude REAL, notifications INTEGER DEFAULT 0,
 FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS scans(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 user_id INTEGER NOT NULL,
 image_path TEXT NOT NULL,
 crop TEXT DEFAULT '', label TEXT DEFAULT '', confidence REAL DEFAULT 0,
 severity TEXT DEFAULT '', description TEXT DEFAULT '', raw_json TEXT DEFAULT '{}',
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS subsidies(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL, state TEXT DEFAULT '', crop TEXT DEFAULT '', category TEXT DEFAULT '',
 eligibility TEXT DEFAULT '', benefit TEXT DEFAULT '', source_url TEXT DEFAULT '', source_name TEXT DEFAULT '',
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`);
export default db;
