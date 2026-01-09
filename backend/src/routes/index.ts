import { Router } from 'express';
import { db } from '../database/db';

const router = Router();

// Validação de email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validação de CEP
function isValidCEP(cep: string): boolean {
  return /^\d{5}-\d{3}$/.test(cep);
}

// Health check
router.get('/health', (req, res) => {
  return res.json({ status: 'ok' });
});

// GET - Listar todos os clientes
router.get('/clients', async (req, res) => {
  try {
    const database = await db;
    const clients = await database.all('SELECT * FROM clients ORDER BY created_at DESC');
    return res.json(clients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar clientes' });
  }
});

// GET - Buscar cliente por ID
router.get('/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const database = await db;
    const client = await database.get('SELECT * FROM clients WHERE id = ?', [id]);
    
    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    
    return res.json(client);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
});

// POST - Criar novo cliente
router.post('/clients', async (req, res) => {
  try {
    const { name, email, phone, cnpj, cep, street, neighborhood, city, state, complement } = req.body;

    // Validações
    if (!name || !email || !cep || !street || !neighborhood || !city || !state) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    if (!isValidCEP(cep)) {
      return res.status(400).json({ error: 'CEP inválido. Use o formato XXXXX-XXX' });
    }

    const database = await db;

    // Verificar se email já existe
    const existingClient = await database.get('SELECT id FROM clients WHERE email = ?', [email]);
    if (existingClient) {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }

    await database.run(
      'INSERT INTO clients (name, email, phone, cnpj, cep, street, neighborhood, city, state, complement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone || null, cnpj || null, cep, street, neighborhood, city, state, complement || null]
    );

    return res.status(201).json({ message: 'Cliente criado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

// PUT - Atualizar cliente
router.put('/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, cnpj, cep, street, neighborhood, city, state, complement } = req.body;

    // Validações
    if (!name || !email || !cep || !street || !neighborhood || !city || !state) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    if (!isValidCEP(cep)) {
      return res.status(400).json({ error: 'CEP inválido. Use o formato XXXXX-XXX' });
    }

    const database = await db;

    // Verificar se cliente existe
    const client = await database.get('SELECT id FROM clients WHERE id = ?', [id]);
    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Verificar se email já existe (para outro cliente)
    const existingClient = await database.get('SELECT id FROM clients WHERE email = ? AND id != ?', [email, id]);
    if (existingClient) {
      return res.status(409).json({ error: 'Email já cadastrado para outro cliente' });
    }

    await database.run(
      'UPDATE clients SET name = ?, email = ?, phone = ?, cnpj = ?, cep = ?, street = ?, neighborhood = ?, city = ?, state = ?, complement = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, email, phone || null, cnpj || null, cep, street, neighborhood, city, state, complement || null, id]
    );

    return res.json({ message: 'Cliente atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

// DELETE - Remover cliente
router.delete('/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const database = await db;

    // Verificar se cliente existe
    const client = await database.get('SELECT id FROM clients WHERE id = ?', [id]);
    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    await database.run('DELETE FROM clients WHERE id = ?', [id]);

    return res.json({ message: 'Cliente removido com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao remover cliente' });
  }
});

export default router;
