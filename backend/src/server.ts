import express from 'express';
import cors from 'cors';
import routes from './routes';
import { db } from './database/db';

const app = express();

app.use(cors());
app.use(express.json());

async function initDatabase() {
  const database = await db;

  await database.exec(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      cnpj TEXT,
      cep TEXT NOT NULL,
      street TEXT NOT NULL,
      neighborhood TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      complement TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('✅ Database initialized successfully');
}

initDatabase().catch(console.error);

app.use('/api', routes);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
