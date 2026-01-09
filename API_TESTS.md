# 🧪 Testes da API - Guia Prático

## Endpoints de Teste

### 1. Health Check
```bash
curl -X GET http://localhost:3333/api/health
```

**Esperado:**
```json
{
  "status": "ok"
}
```

---

## 2. Criar Cliente

### Exemplo 1: Cliente Completo
```bash
curl -X POST http://localhost:3333/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 99999-9999",
    "cep": "01310-100",
    "street": "Avenida Paulista",
    "neighborhood": "Bela Vista",
    "city": "São Paulo",
    "state": "SP",
    "complement": "123"
  }'
```

**Esperado (201 Created):**
```json
{
  "message": "Cliente criado com sucesso"
}
```

---

### Exemplo 2: Cliente Mínimo
```bash
curl -X POST http://localhost:3333/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@email.com",
    "cep": "05429-000",
    "street": "Rua das Flores",
    "neighborhood": "Jardins",
    "city": "São Paulo",
    "state": "SP"
  }'
```

---

### Exemplo 3: Erro - Email Duplicado
```bash
curl -X POST http://localhost:3333/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Jr",
    "email": "joao@email.com",
    "cep": "01310-100",
    "street": "Avenida Paulista",
    "neighborhood": "Bela Vista",
    "city": "São Paulo",
    "state": "SP"
  }'
```

**Esperado (409 Conflict):**
```json
{
  "error": "Email já cadastrado"
}
```

---

### Exemplo 4: Erro - Email Inválido
```bash
curl -X POST http://localhost:3333/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pedro Costa",
    "email": "pedro-email-invalido",
    "cep": "20040020",
    "street": "Avenida Rio Branco",
    "neighborhood": "Centro",
    "city": "Rio de Janeiro",
    "state": "RJ"
  }'
```

**Esperado (400 Bad Request):**
```json
{
  "error": "Email inválido"
}
```

---

### Exemplo 5: Erro - CEP Inválido
```bash
curl -X POST http://localhost:3333/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lucas Ferreira",
    "email": "lucas@email.com",
    "cep": "12345",
    "street": "Rua Teste",
    "neighborhood": "Bairro",
    "city": "Cidade",
    "state": "XX"
  }'
```

**Esperado (400 Bad Request):**
```json
{
  "error": "CEP inválido. Use o formato XXXXX-XXX"
}
```

---

### Exemplo 6: Erro - Campos Obrigatórios Faltando
```bash
curl -X POST http://localhost:3333/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana Silva"
  }'
```

**Esperado (400 Bad Request):**
```json
{
  "error": "Campos obrigatórios ausentes"
}
```

---

## 3. Listar Clientes

```bash
curl -X GET http://localhost:3333/api/clients
```

**Esperado (200 OK):**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 99999-9999",
    "cep": "01310-100",
    "street": "Avenida Paulista",
    "neighborhood": "Bela Vista",
    "city": "São Paulo",
    "state": "SP",
    "complement": "Apto 1000",
    "created_at": "2024-01-08T12:30:45.000Z",
    "updated_at": "2024-01-08T12:30:45.000Z"
  },
  {
    "id": 2,
    "name": "Maria Santos",
    "email": "maria@email.com",
    "phone": null,
    "cep": "05429-000",
    "street": "Rua das Flores",
    "neighborhood": "Jardins",
    "city": "São Paulo",
    "state": "SP",
    "complement": null,
    "created_at": "2024-01-08T12:31:20.000Z",
    "updated_at": "2024-01-08T12:31:20.000Z"
  }
]
```

---

## 4. Buscar Cliente por ID

```bash
curl -X GET http://localhost:3333/api/clients/1
```

**Esperado (200 OK):**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "cep": "01310-100",
  "street": "Avenida Paulista",
  "neighborhood": "Bela Vista",
  "city": "São Paulo",
  "state": "SP",
  "complement": "Apto 1000",
  "created_at": "2024-01-08T12:30:45.000Z",
  "updated_at": "2024-01-08T12:30:45.000Z"
}
```

---

### Erro - Cliente Não Encontrado
```bash
curl -X GET http://localhost:3333/api/clients/999
```

**Esperado (404 Not Found):**
```json
{
  "error": "Cliente não encontrado"
}
```

---

## 5. Atualizar Cliente

```bash
curl -X PUT http://localhost:3333/api/clients/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Santos",
    "email": "joao.silva@email.com",
    "phone": "(11) 98888-8888",
    "cep": "01310-100",
    "street": "Avenida Paulista",
    "neighborhood": "Bela Vista",
    "city": "São Paulo",
    "state": "SP",
    "complement": "Apto 2000"
  }'
```

**Esperado (200 OK):**
```json
{
  "message": "Cliente atualizado com sucesso"
}
```

---

### Erro - Tentando Atualizar Email para Duplicado
```bash
curl -X PUT http://localhost:3333/api/clients/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Santos",
    "email": "maria@email.com",
    "phone": "(11) 98888-8888",
    "cep": "01310-100",
    "street": "Avenida Paulista",
    "neighborhood": "Bela Vista",
    "city": "São Paulo",
    "state": "SP"
  }'
```

**Esperado (409 Conflict):**
```json
{
  "error": "Email já cadastrado para outro cliente"
}
```

---

### Erro - Cliente Não Encontrado
```bash
curl -X PUT http://localhost:3333/api/clients/999 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@email.com",
    "cep": "01310-100",
    "street": "Rua",
    "neighborhood": "Bairro",
    "city": "Cidade",
    "state": "SP"
  }'
```

**Esperado (404 Not Found):**
```json
{
  "error": "Cliente não encontrado"
}
```

---

## 6. Deletar Cliente

```bash
curl -X DELETE http://localhost:3333/api/clients/1
```

**Esperado (200 OK):**
```json
{
  "message": "Cliente removido com sucesso"
}
```

---

### Erro - Cliente Não Encontrado
```bash
curl -X DELETE http://localhost:3333/api/clients/999
```

**Esperado (404 Not Found):**
```json
{
  "error": "Cliente não encontrado"
}
```

---

## 7. Testar com Postman/Insomnia

### Configuração Base
- **Base URL**: `http://localhost:3333`
- **Header**: `Content-Type: application/json`

### Variáveis
```
{{base_url}} = http://localhost:3333
{{client_id}} = 1 (atualizar com IDs reais)
```

### Exemplos de Coleção
Todos os exemplos acima podem ser importados em Postman/Insomnia como uma coleção.

---

## 8. CEPs Válidos para Testar (Via Frontend)

- `01310-100` - Avenida Paulista, São Paulo, SP
- `05429-000` - Rua Bandeira, São Paulo, SP
- `20040020` - Avenida Rio Branco, Rio de Janeiro, RJ
- `30150371` - Avenida Afonso Pena, Belo Horizonte, MG

---

## 📊 Resumo dos Status HTTP

| Status | Significado | Exemplo |
|--------|-------------|---------|
| 200 | OK | GET, PUT, DELETE bem-sucedidos |
| 201 | Created | POST bem-sucedido |
| 400 | Bad Request | Validação falhou |
| 404 | Not Found | Recurso não encontrado |
| 409 | Conflict | Email duplicado |
| 500 | Server Error | Erro interno do servidor |

---

## 🔍 Verificação Rápida

Para fazer uma verificação rápida de tudo está funcionando:

```bash
# 1. Health Check
curl http://localhost:3333/api/health

# 2. Criar teste
curl -X POST http://localhost:3333/api/clients \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@email.com","cep":"01310-100","street":"Rua","neighborhood":"Bairro","city":"Cidade","state":"SP"}'

# 3. Listar
curl http://localhost:3333/api/clients

# 4. Limpar (deletar ID 1)
curl -X DELETE http://localhost:3333/api/clients/1
```

---

**Desenvolvido para o teste DEV Goalfy** 🎯
