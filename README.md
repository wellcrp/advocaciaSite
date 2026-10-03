# advocaciaSite

Site institucional estático para escritório de advocacia, com foco em apresentação de serviços e publicação de artigos jurídicos.

Agora o projeto possui arquitetura hibrida com front-end estatico e backend em Node.js/TypeScript para operacoes sensiveis.

## Visão geral
- Home institucional com seções de apresentação, serviços e localização.
- Página de artigos de direito imobiliário com paginação dinâmica.
- Página de detalhe de artigo por ID na URL.
- Página de contato com envio seguro via backend.

## Stack técnica
- HTML5
- CSS3
- JavaScript (vanilla)
- Bootstrap 5 (CDN)
- Bootstrap Icons (CDN)
- AOS para animações (CDN)

## Backend (novo)
- Node.js
- TypeScript
- Express
- Helmet
- CORS
- Rate limit
- Zod para validacao
- Nodemailer (SMTP opcional)

## Estrutura principal
```text
advocaciaSite/
	index.html
	direito-imobiliario.html
	post.html
	bancoDados/
	css/
	img/
	javascript/
	pages/contato/
	agents.md
```

## Páginas e fluxo
1. `index.html` é o ponto de entrada.
2. `direito-imobiliario.html` lista os posts carregados de `bancoDados/bd_imobiliario.js`.
3. `post.html?id=N` mostra o artigo selecionado.
4. `pages/contato/contato.html` processa envio de formulário via API backend.

### Fluxo atualizado de contato
1. O front-end envia os dados para `POST /api/contact`.
2. O backend valida e processa o payload.
3. O front-end exibe retorno de sucesso ou erro para o usuario.

## Como executar localmente
Portas usadas em desenvolvimento:
- Front-end estatico: `http://localhost:5500`
- Backend API: `http://localhost:3333`

### Como rodar somente o front-end
1. Abra um terminal na raiz do projeto:

```powershell
cd e:\CodeBox\IA\Advocacia\advocaciaSite
```

2. Garanta as dependencias do backend instaladas (o servidor estatico fica nele):

```powershell
cd backend
npm install
cd ..
```

3. Suba o front-end estatico com Node.js:

```powershell
npm run dev:front
```

4. Acesse no navegador:
- `http://localhost:5500/index.html`

Observacao: abrir arquivos com `file://` pode causar erro de CORS no formulario de contato.

### Como rodar front-end + backend (contato funcionando)
1. Na raiz do projeto, execute:

```powershell
npm run dev
```

2. Isso sobe automaticamente:
- Front-end em `http://localhost:5500`
- Backend em `http://localhost:3333`

Alternativa recomendada (subir os dois juntos):

```powershell
cd e:\CodeBox\IA\Advocacia\advocaciaSite\backend
npm install
npm run dev
```

Com isso:
- Front-end: `http://localhost:5500`
- Backend: `http://localhost:3333`

Endpoint de saude:
- `http://localhost:3333/api/health`

Endpoints principais de API:
- `POST http://localhost:3333/api/contact`
- `GET http://localhost:3333/api/auth/oauth2/start`
- `GET http://localhost:3333/api/auth/oauth2/callback`

Configuracao de integracoes:
- SMTP: preencher variaveis `SMTP_*`, `CONTACT_TO_EMAIL` e `CONTACT_FROM_EMAIL` no `.env`.
- OAuth2: preencher variaveis `OAUTH2_*` no `.env`.

## Manutenção rápida

### Adicionar/editar posts imobiliários
1. Edite `bancoDados/bd_imobiliario.js`.
2. Garanta que cada item tenha `id`, `title`, `desc` e `img`.
3. Teste listagem em `direito-imobiliario.html` e detalhe em `post.html?id=ID`.

### Ajustar comportamento global
- Arquivo: `javascript/script.js`.

- Responsável por:
	- ano automático do footer,
	- ajuste de altura do header fixo,
	- variável de viewport para mobile,
	- posicionamento do banner principal.

### Ajustar visual
- Estilos globais: `css/style/style.css`.
- Home: `css/index.css`.
- Post individual: `css/posts/posts.css`.
- Contato: `pages/contato/contato.css`.

### Ordem de scripts (crítico para posts)
- Em páginas de posts, carregar primeiro o banco de dados em `bancoDados/...`.
- Depois carregar o script consumidor em `javascript/...`.
- Exemplo atual:
	- `direito-imobiliario.html`: `bd_imobiliario.js` antes de `postsImobiliarios.js`.
	- `post.html`: `bd_imobiliario.js` antes de `posts/post.js`.

### Contato (frontend + backend)
- Front-end: `pages/contato/contato.html` e `pages/contato/contato.js`.
- Backend: `backend/src/routes/contact.route.ts`.
- Em ambiente local, manter API em `http://localhost:3333/api`.

## Atenção com EmailJS
- O envio direto por EmailJS no front-end foi removido da pagina de contato.
- O recomendado agora e manter qualquer credencial de integracao exclusivamente no backend.

## Checklist antes de publicar
- Conferir links e navegação entre páginas.
- Validar formulário de contato.
- Testar responsividade (mobile e desktop).
- Confirmar textos institucionais: telefone, email e endereço.