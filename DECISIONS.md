# 📝 DECISÕES E DÚVIDAS - Teste DEV Goalfy

## ✅ Decisões Tomadas

### 1. **Banco de Dados**
- **Escolha**: SQLite
- **Justificativa**: 
  - Simples de configurar sem dependências externas
  - Ideal para aplicações pequenas/médias
  - Armazenamento local em arquivo
  - Perfeito para prototipagem rápida

### 2. **API de CEP**
- **Escolha**: ViaCEP (API pública)
- **Justificativa**:
  - Confiável e mantida pela comunidade brasileira
  - Sem necessidade de autenticação ou chaves de API
  - Retorna dados em JSON estruturado
  - Integração simples via HTTP GET

### 3. **Gerenciamento de Estado (Front-end)**
- **Escolha**: Context API + Hooks (sem Redux)
- **Justificativa**:
  - Suficiente para o escopo do projeto
  - Menos boilerplate que Redux
  - Integração nativa com React 19
  - Fácil manutenção e debugging

### 4. **Estilização (Front-end)**
- **Escolha**: styled-components (conforme requisito)
- **Vantagens**:
  - CSS-in-JS com escopo automático
  - Suporte a temas dinâmicos
  - TypeScript nativo
  - Componentes isolados e reutilizáveis

### 5. **Validação de Formulário**
- **Implementação**: Validação em tempo real com feedback visual
- **Campos Validados**:
  - Nome: obrigatório
  - Email: obrigatório, formato válido, único
  - CEP: obrigatório, formato XXXXX-XXX
  - Endereço completo: obrigatório
- **Feedback**: Mensagens de erro específicas por campo

### 6. **Estrutura do Projeto**
- **Padrão**: Separação por responsabilidade (components, services, hooks, contexts)
- **Benefícios**:
  - Fácil manutenção
  - Reutilização de código
  - Testes isolados
  - Escalabilidade

### 7. **Tratamento de Erros**
- **Front-end**: Alertas visuais com mensagens descritivas
- **Back-end**: Códigos HTTP apropriados (200, 201, 400, 404, 409, 500)
- **Validação**: Dupla validação (front + back)

### 8. **Biblioteca de Ícones (Front-end)**
- **Escolha**: react-icons
- **Justificativa**:
  - Suporte a múltiplos conjuntos de ícones (Font Awesome, Material Design, Feather, etc)
  - Ícones importados como componentes React
  - Tamanho otimizado (only imports used icons)
  - Fácil customização com styled-components
  - Comunidade ativa e bem mantida
  - Compatibilidade total com TypeScript
- **Uso**: Ícones em botões de ação, formulários e interface geral

## ❓ Dúvidas e Soluções

### Dúvida 1: Usar Redux ou Context API?
- **Decisão**: Context API
- **Motivo**: Projeto não necessita de gerenciamento complexo de estado. Context + useCallback é suficiente para manter performance.

### Dúvida 2: Qual banco de dados utilizar?
- **Decisão**: SQLite (conforme padrão do projeto inicial)
- **Alternativas consideradas**: PostgreSQL, MongoDB
- **Motivo**: SQLite já estava configurado, simples de usar, ideal para MVP

### Dúvida 3: API pública de CEP confiável?
- **Decisão**: ViaCEP
- **Alternativas**: Apenas algumas outras opções brasileiras, mas ViaCEP é a mais confiável e mantida
- **Fallback**: Se a API cair, usuário pode preencher endereço manualmente

### Dúvida 4: Validação server-side vs client-side?
- **Decisão**: Ambas (dupla validação)
- **Motivo**: 
  - Client-side: UX melhor com feedback instantâneo
  - Server-side: Segurança, garante integridade dos dados
  - Reduz requisições desnecessárias

### Dúvida 5: Como organizar componentes?
- **Decisão**: Por funcionalidade (components, hooks, services, contexts, types)
- **Motivo**: Escalabilidade e manutenção facilitadas

### Dúvida 6: Paginação necessária?
- **Decisão**: Não implementada no MVP
- **Motivo**: Requisito não mencionava, poderia ser adicionada depois
- **Nota**: Código já está preparado para adicionar paginação

## 🎨 Escolhas de Design

### Componentes UI
- **Modal**: Overlay com transição suave (fade + slide)
- **Buttons**: Estados hover, active, disabled com feedback
- **Tabela**: Hover effect nas linhas para melhor UX
- **Forms**: Grid layout responsivo

## 🔒 Segurança Considerada

### Implementado
- ✅ Validação de entrada (front + back)
- ✅ Email único no banco de dados
- ✅ CORS configurado
- ✅ Tratamento de erros sem exposição de dados sensíveis

### Não Implementado (Fora do Escopo)
- ❌ Autenticação/Autorização
- ❌ Rate limiting
- ❌ Criptografia de dados
- ❌ HTTPS

## 📊 Tratamento de Performance

### Front-end
- ✅ useCallback em functions para evitar re-renders desnecessários
- ✅ Componentes separados para não renderizar tudo junto
- ✅ Async/await para não bloquear UI

### Back-end
- ✅ Queries otimizadas no SQLite
- ✅ Índices no campo email (UNIQUE constraint)
- ✅ Async/await em operações de banco

## 🧪 Testes Manuais Realizados

### CRUD Completo
- ✅ Criar cliente com todos os campos
- ✅ Listar clientes cadastrados
- ✅ Editar cliente existente
- ✅ Deletar cliente
- ✅ Validações de erro funcionando

### Integração CEP
- ✅ Buscar CEP válido (ex: 01310-100)
- ✅ Erro em CEP inválido
- ✅ Preenchimento automático correto

### Validações
- ✅ Email duplicado rejeitado
- ✅ Email inválido detectado
- ✅ CEP inválido detectado
- ✅ Campos obrigatórios validados

### Integração Front-Back
- ✅ Requisições HTTP funcionando
- ✅ CORS habilitado
- ✅ Respostas sendo recebidas corretamente

## 📋 Checklist de Requisitos

### Front-end (✅ Todos Completos)
- ✅ React com TypeScript
- ✅ styled-components
- ✅ Contexts e Hooks
- ✅ Design conforme Figma
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Modal para cadastro
- ✅ Listagem de clientes
- ✅ Validações de campos
- ✅ Integração com API CEP

### Back-end (✅ Todos Completos)
- ✅ Node.js com Express
- ✅ REST API completa
- ✅ CRUD endpoints (GET, POST, PUT, DELETE)
- ✅ Banco de dados SQLite
- ✅ Validações de dados
- ✅ Tratamento de erros

### Documentação (✅ Todos Completos)
- ✅ README detalhado
- ✅ Instruções de instalação
- ✅ Instruções de execução
- ✅ Exemplos de API
- ✅ Descrição de tecnologias

## 🚀 Próximos Passos (Fora do Escopo)

1. **Autenticação**: Implementar JWT/OAuth
2. **Persistência**: Migrar para PostgreSQL
3. **Testes**: Adicionar Jest + Testing Library
4. **CI/CD**: GitHub Actions
5. **Deploy**: Vercel (front) + Heroku/Railway (back)
6. **Features**: Paginação, filtros, export CSV
7. **Documentação**: Swagger/OpenAPI

---

**Status**: ✅ COMPLETO - Todos os requisitos implementados e testados
