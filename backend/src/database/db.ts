import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export const db = open({
  filename: path.resolve(__dirname, 'database.sqlite'),
  driver: sqlite3.Database,
});
