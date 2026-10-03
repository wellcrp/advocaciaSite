# Backend - advocaciaSite

Este backend foi desenvolvido em Node.js + TypeScript para atender operacoes sensiveis do site, como envio de contato e base de autenticacao OAuth2.

## Requisitos
- Node.js 20+
- npm 10+

## 1. Instalar dependencias
No terminal, dentro da pasta `backend`:

```powershell
cd e:\CodeBox\IA\Advocacia\advocaciaSite\backend
npm install
```

## 2. Configurar variaveis de ambiente
O backend agora suporta arquivos por ambiente:

- `.env.development`
- `.env.production`

Tambem e possivel usar `.env` como fallback comum.

Se quiser iniciar rapidamente com fallback unico, crie o `.env` a partir do modelo:

```powershell
copy .env.example .env
```

Depois, edite o arquivo de ambiente conforme seu contexto.

### Variaveis principais
- `PORT`: porta da API (padrao: `3333`)
- `NODE_ENV`: ambiente (`development` ou `production`)
- `CORS_ORIGIN`: origens permitidas do front-end (aceita lista separada por virgula)
- `CORS_ALLOW_NULL_ORIGIN`: permite `origin: null` (util para testes em `file://`, recomendado apenas em desenvolvimento)
- `LOG_CONTACT_MESSAGES`: `true` para logar mensagem de contato quando SMTP nao estiver configurado

### SMTP (envio real de e-mail)
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

Se essas variaveis nao forem preenchidas, o endpoint de contato continua funcionando, mas usa fallback de log (quando `LOG_CONTACT_MESSAGES=true`).

### EmailJS (fallback opcional, disparo no backend)
- `EMAILJS_API_URL`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_PRIVATE_KEY`

Ordem de disparo do backend para contato:
1. SMTP (quando configurado)
2. EmailJS via backend (quando configurado)
3. Fallback de log (quando `LOG_CONTACT_MESSAGES=true`)

### OAuth2 (login admin)
- `OAUTH2_CLIENT_ID`
- `OAUTH2_CLIENT_SECRET`
- `OAUTH2_AUTHORIZE_URL`
- `OAUTH2_TOKEN_URL`
- `OAUTH2_REDIRECT_URI`
- `OAUTH2_SCOPES`

Sem essas variaveis, os endpoints OAuth2 retornam indisponivel (esperado).

## 3. Executar backend

### Execucao rapida (recomendado)
Na raiz do projeto, execute:

```powershell
cd e:\CodeBox\IA\Advocacia\advocaciaSite
npm run dev
```

Esse comando sobe tudo em desenvolvimento:
- Front-end: `http://localhost:5500`
- Backend API: `http://localhost:3333`

### Preparacao inicial do backend (primeira vez)
Se for a primeira execucao, antes rode:

```powershell
cd e:\CodeBox\IA\Advocacia\advocaciaSite\backend
npm install
copy .env.example .env
```

### Portas em desenvolvimento
- Backend (API): `http://localhost:3333`
- Front-end estatico (opcional): `http://localhost:5500`

Importante: a porta `5500` nao e do backend. Ela e apenas do servidor HTTP usado para abrir as paginas HTML do front-end.

### Desenvolvimento (API + front juntos)
```powershell
npm run dev
```

Esse comando agora sobe:
- API em `http://localhost:3333`
- Front-end estatico em `http://localhost:5500`

Se estiver executando de dentro de `backend`, esse `npm run dev` sobe API + front tambem.

### Desenvolvimento (somente API)
```powershell
npm run dev:api
```

O `NODE_ENV` padrao em desenvolvimento e `development`, entao o backend prioriza `.env.development`.

### Build de producao
```powershell
npm run build
npm start
```

Para producao, use `NODE_ENV=production` para priorizar `.env.production`.

## 4. Endpoints
Base local: `http://localhost:3333/api`

- `GET /health`
  - Verifica status da API e integracoes (`smtpConfigured`, `oauth2Configured`)

- `POST /contact`
  - Recebe formulario de contato
  - Exemplo de payload:

```json
{
  "name": "Nome do Cliente",
  "email": "cliente@exemplo.com",
  "telefone": "16999990000",
  "message": "Texto da mensagem com pelo menos 10 caracteres"
}
```

- `GET /auth/oauth2/start`
  - Inicia fluxo OAuth2 (retorna URL de autorizacao)

- `GET /auth/oauth2/callback?code=...&state=...`
  - Finaliza fluxo OAuth2 (troca code por token)

## 5. Teste rapido via PowerShell
### Health
```powershell
Invoke-RestMethod -Uri 'http://localhost:3333/api/health' -Method GET
```

### Contact
```powershell
$body = @{
  name = 'Teste Local'
  email = 'teste@exemplo.com'
  telefone = '16999990000'
  message = 'Mensagem de teste enviada localmente.'
} | ConvertTo-Json

Invoke-RestMethod -Uri 'http://localhost:3333/api/contact' -Method POST -ContentType 'application/json' -Body $body
```

## 6. Importante sobre CORS no front-end
- Evite abrir o formulario por `file://` no navegador.
- Rode o front-end com servidor local HTTP em Node.js:

```powershell
cd e:\CodeBox\IA\Advocacia\advocaciaSite
npm run dev:front
```

- Depois acesse: `http://localhost:5500/pages/contato/contato.html`

## 7. Scripts disponiveis
- `npm run dev`: executa API + front-end estatico juntos
- `npm run dev:api`: executa apenas a API com watch
- `npm run dev:web`: executa apenas o servidor estatico do front-end
- `npm run typecheck`: valida tipagem TypeScript
- `npm run build`: compila para `dist/`
- `npm start`: executa build compilada

## 8. Problemas comuns
- Erro de CORS:
  - Verifique se `CORS_ORIGIN` bate com a URL real do front-end.

- OAuth2 indisponivel:
  - Confirme preenchimento das variaveis `OAUTH2_*`.

- Sem envio real de e-mail:
  - Confirme preenchimento das variaveis `SMTP_*` e `CONTACT_*`.

- Porta em uso:
  - Altere `PORT` no `.env`.
