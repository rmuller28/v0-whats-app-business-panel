# WhatsApp Business Platform

Sistema completo de gerenciamento da WhatsApp Business API integrado com Meta.

## Funcionalidades

- ✅ Autenticação JWT
- ✅ Gestão de contas Meta/Facebook Business
- ✅ Integração completa com WhatsApp Business API
- ✅ Sistema de templates (HSM) com CRUD completo
- ✅ Envio de mensagens (texto, imagem, áudio, vídeo, documento, botões, listas, templates)
- ✅ Gerenciamento de números e verificação
- ✅ Webhooks com logging e persistência
- ✅ Dashboard completo em Vue 3
- ✅ Docker Compose para fácil deploy

## Requisitos

- Docker & Docker Compose
- Node.js LTS (se rodar localmente sem Docker)
- PostgreSQL 15+ (se rodar localmente sem Docker)

## Instalação Rápida

### Com Docker Compose

1. Clone o repositório
2. Configure as variáveis de ambiente:
   \`\`\`bash
   cp .env.example .env
   # Edite .env com suas credenciais Meta
   \`\`\`

3. Inicie os serviços:
   \`\`\`bash
   docker-compose up -d
   \`\`\`

4. Acesse:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001
   - PgAdmin: http://localhost:5050
   - Nginx: http://localhost:80

### Localmente

#### Backend
\`\`\`bash
cd backend
npm install
npm run prisma:migrate
npm run dev
\`\`\`

#### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## Estrutura do Projeto

\`\`\`
project/
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── meta.ts
│   │   │   ├── templates.ts
│   │   │   ├── messages.ts
│   │   │   └── webhook.ts
│   │   └── utils/
│   │       ├── logger.ts
│   │       └── jwt.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── stores/
│   │   ├── router/
│   │   └── layouts/
│   └── package.json
├── nginx/
│   ├── nginx.conf
│   └── ssl/
├── docker-compose.yml
└── .env.example
\`\`\`

## API Endpoints

### Autenticação
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Fazer login
- `GET /auth/me` - Obter usuário atual

### Meta
- `POST /meta/oauth/start` - Iniciar OAuth
- `POST /meta/oauth/callback` - Callback do OAuth
- `GET /meta/business` - Listar contas business
- `GET /meta/apps` - Listar apps
- `GET /meta/waba` - Listar WABAs
- `GET /meta/phones` - Listar números

### Templates
- `GET /templates` - Listar templates
- `POST /templates` - Criar template
- `GET /templates/:id` - Obter template
- `PATCH /templates/:id` - Atualizar template
- `DELETE /templates/:id` - Deletar template

### Mensagens
- `POST /messages/text` - Enviar texto
- `POST /messages/image` - Enviar imagem
- `POST /messages/audio` - Enviar áudio
- `POST /messages/video` - Enviar vídeo
- `POST /messages/document` - Enviar documento
- `POST /messages/template` - Enviar template
- `POST /messages/buttons` - Enviar com botões
- `POST /messages/list` - Enviar lista interativa

### Webhooks
- `GET /webhook` - Validação
- `POST /webhook` - Receber eventos

## Variáveis de Ambiente

Veja `.env.example` para todas as variáveis necessárias.

Principais:
- `META_APP_ID` - ID da aplicação Meta
- `META_APP_SECRET` - Secret da aplicação Meta
- `META_WEBHOOK_TOKEN` - Token para validação de webhooks
- `JWT_SECRET` - Secret para tokens JWT
- `DATABASE_URL` - URL da conexão PostgreSQL

## Logs

- Backend: `/backend/logs/`
- PostgreSQL: Monitorado via PgAdmin

## Suporte

Para problemas ou dúvidas, abra uma issue no repositório.
