# 🎯 Gerenciador de Clientes - Teste DEV Goalfy

Um aplicativo completo de gestão de clientes com **Front-end em React + TypeScript + styled-components** e **Back-end em Node.js + Express + SQLite**.

## 📋 Descrição do Projeto

Este projeto implementa um **CRUD completo de clientes** com:

### ✨ Funcionalidades
- ✅ Criar novo cliente
- ✅ Listar todos os clientes
- ✅ Editar cliente existente
- ✅ Deletar cliente
- ✅ Validação de campos (email, CEP, campos obrigatórios)
- ✅ Integração com API pública ViaCEP para preenchimento automático de endereço

## 🛠 Tecnologias Utilizadas

### Front-end
- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **styled-components** - CSS-in-JS para estilização
- **Axios** - Cliente HTTP
- **Vite** - Bundler e dev server

### Back-end
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Tipagem estática
- **SQLite** - Banco de dados
- **sqlite** e **sqlite3** - Drivers para SQLite
- **CORS** - Habilitação de requisições cross-origin

## 📁 Estrutura do Projeto

```
teste_goalfy/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ClientForm.tsx         # Formulário de cadastro/edição
│   │   │   ├── ClientList.tsx         # Listagem de clientes
│   │   │   └── ClientModal.tsx        # Modal wrapper
│   │   │   └── ConfirmDeleteModal.tsx # Modal de exclusão
│   │   ├── contexts/
│   │   │   └── ClientContext.tsx   # Context para gerenciar estado
│   │   ├── hooks/
│   │   │   ├── useClient.ts        # Hook para usar ClientContext
│   │   │   └── useCEP.ts          # Hook para buscar CEP
│   │   ├── services/
│   │   │   └── api.ts             # Serviço de API
│   │   ├── types/
│   │   │   └── Client.ts          # Tipos TypeScript
│   │   ├── App.tsx                 # Componente principal
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
│
└── backend/
    ├── src/
    │   ├── database/
    │   │   └── db.ts              # Configuração do banco de dados
    │   ├── routes/
    │   │   └── index.ts           # Rotas da API
    │   └── server.ts              # Servidor Express
    ├── package.json
    └── tsconfig.json
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js v18+ instalado
- npm ou yarn

### Front-end

1. **Instalar dependências:**
```bash
cd frontend
npm install
```

2. **Iniciar servidor de desenvolvimento:**
```bash
npm run dev
```

O front-end estará disponível em `http://localhost:5173`

3. **Build para produção:**
```bash
npm run build
```

### Back-end

1. **Instalar dependências:**
```bash
cd backend
npm install
```

2. **Iniciar servidor:**
```bash
npm run dev
```

O back-end estará rodando em `http://localhost:3333`

## 📡 API REST

### Base URL
```
http://localhost:3333/api
```

### Endpoints

#### 1. Health Check
```http
GET /api/health
```
**Resposta:**
```json
{
  "status": "ok"
}
```

#### 2. Listar Todos os Clientes
```http
GET /api/clients
```
**Resposta:**
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
    "created_at": "2024-01-08T10:30:00.000Z",
    "updated_at": "2024-01-08T10:30:00.000Z"
  }
]
```

#### 3. Buscar Cliente por ID
```http
GET /api/clients/:id
```
**Resposta:** (mesmo formato da listagem individual)

#### 4. Criar Novo Cliente
```http
POST /api/clients
Content-Type: application/json

{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "phone": "(11) 98888-8888",
  "cep": "05429-000",
  "street": "Rua das Flores",
  "neighborhood": "Jardins",
  "city": "São Paulo",
  "state": "SP",
  "complement": "Casa 123"
}
```

**Validações:**
- Campo `name`: obrigatório
- Campo `email`: obrigatório, deve ser um email válido
- Campo `cep`: obrigatório, formato XXXXX-XXX
- Campo `street`, `neighborhood`, `city`, `state`: obrigatórios
- Email único na base de dados

**Resposta (201 Created):**
```json
{
  "message": "Cliente criado com sucesso"
}
```

**Erros:**
```json
{
  "error": "Email já cadastrado"
}
```

#### 5. Atualizar Cliente
```http
PUT /api/clients/:id
Content-Type: application/json

{
  "name": "Maria Santos Silva",
  "email": "maria.silva@email.com",
  "phone": "(11) 98888-8888",
  "cep": "05429-000",
  "street": "Rua das Flores",
  "neighborhood": "Jardins",
  "city": "São Paulo",
  "state": "SP",
  "complement": "Casa 123"
}
```

**Resposta (200 OK):**
```json
{
  "message": "Cliente atualizado com sucesso"
}
```

#### 6. Deletar Cliente
```http
DELETE /api/clients/:id
```

**Resposta (200 OK):**
```json
{
  "message": "Cliente removido com sucesso"
}
```

## 🔍 Validações Implementadas

### Front-end
- **Campos obrigatórios**: Nome, Email, CEP, Rua, Bairro, Cidade, Estado
- **Email**: Validação de formato usando regex
- **CEP**: Validação de formato (XXXXX-XXX)
- **Integração ViaCEP**: Busca automática de endereço ao clicar no botão "Buscar"

### Back-end
- **Email**: Validação de formato e unicidade
- **CEP**: Validação de formato
- **Campos obrigatórios**: Validação de presença
- **Conflito de Email**: Retorna 409 Conflict se email já existe

## 🎨 Design e UX

### Paleta de Cores
- Primária: `#667eea` (Roxo)
- Secundária: `#764ba2` (Roxo escuro)
- Sucesso: `#27ae60` (Verde)
- Erro: `#e74c3c` (Vermelho)
- Neutros: Cinza (#333, #666, #999)

### Componentes Principais

1. **Header** - Cabeçalho com título, descrição e botões de ação
2. **ClientModal** - Modal para criar/editar clientes
3. **ClientForm** - Formulário com validação em tempo real
4. **ClientList** - Tabela responsiva com ações de editar/deletar

## 📝 Exemplos de Uso com cURL

### Criar Cliente
```bash
curl -X POST http://localhost:3333/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pedro Costa",
    "email": "pedro@email.com",
    "phone": "(21) 97777-7777",
    "cep": "20040020",
    "street": "Avenida Rio Branco",
    "neighborhood": "Centro",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "complement": "Sala 500"
  }'
```

### Listar Clientes
```bash
curl http://localhost:3333/api/clients
```

### Atualizar Cliente
```bash
curl -X PUT http://localhost:3333/api/clients/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pedro Costa Silva",
    "email": "pedro.silva@email.com",
    "phone": "(21) 97777-7777",
    "cep": "20040020",
    "street": "Avenida Rio Branco",
    "neighborhood": "Centro",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "complement": "Sala 501"
  }'
```

### Deletar Cliente
```bash
curl -X DELETE http://localhost:3333/api/clients/1
```

## 🔗 Integração de APIs Externas

### ViaCEP
A API pública **ViaCEP** é utilizada para buscar endereço automaticamente baseado no CEP.

- **URL**: `https://viacep.com.br/ws/{CEP}/json/`
- **Método**: GET
- **Exemplo**: `https://viacep.com.br/ws/01310100/json/`

**Resposta:**
```json
{
  "cep": "01310-100",
  "logradouro": "Avenida Paulista",
  "complemento": "",
  "bairro": "Bela Vista",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

## 💾 Banco de Dados

### Esquema da Tabela `clients`

```sql
CREATE TABLE clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  cep TEXT NOT NULL,
  street TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  complement TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Teste da Aplicação

1. Inicie o backend: `cd backend && npm run dev`
2. Inicie o frontend: `cd frontend && npm run dev`
3. Acesse `http://localhost:5173`

## 🎯 Arquitetura e Decisões

### Front-end
- **Context + Hooks**: Gerenciamento de estado centralizado sem Redux
- **styled-components**: Componentes isolados com estilos scoped
- **Validação em tempo real**: Melhor UX com feedback imediato
- **Componentes reutilizáveis**: Form pode ser usado para criar e editar

### Back-end
- **Express**: Framework leve e eficiente
- **SQLite**: Banco de dados simples e sem dependências externas
- **Validação de entrada**: Proteção contra dados inválidos
- **CORS habilitado**: Permite requisições do frontend

## 📦 Dependências Principais

### Frontend
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "styled-components": "^6.x",
  "axios": "^1.x",
  "typescript": "~5.9.3"
}
```

### Backend
```json
{
  "express": "^5.2.1",
  "sqlite": "^5.1.1",
  "sqlite3": "^5.1.7",
  "cors": "^2.8.5",
  "typescript": "^5.9.3"
}
```

## 🚨 Tratamento de Erros

### Front-end
- Validação de formulário com mensagens de erro específicas
- Exibição de alertas de sucesso e erro
- Desabilitação de botões durante submissão
- Feedback visual de carregamento

### Back-end
- Validação de entrada com mensagens descritivas
- Códigos HTTP apropriados (201, 400, 404, 409, 500)
- Logging de erros no console
- Tratamento de exceções

## 🔐 Segurança

- CORS habilitado para o frontend local
- Validação de entrada no backend
- Email único (prevenção de duplicação)
- Sanitização básica de dados

## 📝 Notas Adicionais

### Decisões Tomadas
1. **SQLite**: Escolhido pela simplicidade e falta de dependências externas
2. **ViaCEP**: API pública escolhida por ser confiável e sem autenticação
3. **styled-components**: Melhor integração com React e CSS moderno
4. **Context API**: Suficiente para este escopo, sem necessidade de Redux

### Possíveis Melhorias
- Adicionar autenticação e autorização
- Implementar paginação na listagem
- Adicionar filtros e busca
- Persistência de dados em banco relacional (PostgreSQL)
- Testes unitários e integração
- Deploy em produção (Vercel, Heroku, AWS)
- Documentação OpenAPI/Swagger

## 📄 Licença

ISC

---

**Desenvolvido para o teste DEV Goalfy** 🎯
