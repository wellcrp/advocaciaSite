# AGENTS.md - Guia Detalhado do Projeto

## 1. Objetivo deste arquivo
Este documento ajuda qualquer agente (humano ou IA) a entender rapidamente como o projeto está organizado, o que existe na raiz e como operar com segurança sem quebrar o site.

## 2. Visão geral do projeto
- Tipo: site institucional estático de escritório de advocacia.
- Domínio de conteúdo: direito civil, direito imobiliário, família e sucessões.
- Estratégia técnica: HTML + CSS + JavaScript vanilla, com bibliotecas por CDN.
- Sem build step (não usa bundler, npm, framework de SPA).

## 2.1 Padrões obrigatórios (origem: .Claude/skill e .Claude/memory)
- Proibido programação de risco.
- Proibido codificação mal feita.
- Desenvolver somente o necessário (sem escopo extra).
- Aplicar melhores práticas de HTML5, SEO, acessibilidade e segurança.
- Tratar erros de formulário com retorno claro ao usuário.
- Não adicionar plugins/dependências sem necessidade real.
- Evitar expor informações sensíveis no front-end.

## 3. Inventario da raiz (projeto principal)

### `index.html`
- Página inicial institucional.
- Tem seções de apresentação (quem somos), serviços e localização.
- Usa `javascript/script.js` para utilitários visuais globais (ano do footer, altura do header, viewport e ajuste do banner).
- Links para páginas internas de contato e artigos.

### `direito-imobiliario.html`
- Listagem de artigos de direito imobiliário.
- Renderiza cards dinâmicos com paginação via `javascript/postsImobiliarios.js`.
- Fonte dos dados vem de `bancoDados/bd_imobiliario.js`.
- Usa AOS por CDN para animações.

### `post.html`
- Página de detalhe de um artigo.
- Lê o parâmetro `id` da URL e busca o item no array `posts`.
- Script principal: `javascript/posts/post.js`.

### `README.md`
- Documentação principal para onboarding rápido.

### `bancoDados/`
- Simula banco de dados no front-end com arrays JS.
- Arquivos principais:
  - `bd_imobiliario.js`: lista de posts do fluxo imobiliário.
  - `bd_familiaSucessoes.js`: base separada para outro nicho (ainda sem página dedicada na raiz atual).

### `css/`
- Estilos do projeto.
- Estrutura observada:
  - `style/style.css`: estilos globais reais de layout/header/footer/componentes.
  - `index.css`: estilos específicos da home.
  - `posts/posts.css`: estilos da página de post individual.
  - `direitoImobiliario.css`: estilos de paginação mais antigos/alternativos.
  - `style.css`: arquivo legado com customizações antigas.

### `img/`
- Ativos visuais (logos, wallpapers e imagens de apoio).
- Existe subestrutura de backup em `img/bkp/`.

### `javascript/`
- Scripts de comportamento da interface.
- Arquivos principais:
  - `script.js`: utilitários globais para todas as páginas.
  - `postsImobiliarios.js`: listagem e paginação de artigos.
  - `posts/post.js`: renderização de post por ID.

### `pages/`
- Páginas internas fora da raiz principal.
- Atualmente contém `pages/contato/` com:
  - `contato.html`
  - `contato.css`
  - `contato.js` (envio por EmailJS)

### `.gitignore`
- Ignora a pasta `.Claude/`.

### `.git/`
- Metadados do repositório Git (não editar manualmente).

### `.Claude/`
- Pasta local de suporte/ferramentas ignorada pelo Git.
- Contém o fluxo SDD do projeto (documentação, memória e workflows de agents).

## 3.1 Governanca SDD em `.Claude`
- `.Claude/SDD.md`: requisitos, arquitetura e boas práticas.
- `.Claude/skill/skill.md`: regras obrigatórias de desenvolvimento.
- `.Claude/memory/memory.md`: memória de padrões e restrições.
- `.Claude/workflows/`: definições de fluxo (`sdd-tarefa`, `sdd-prd`, `sdd-html`, `sdd-breakcheck`, `sdd-impl`).
- `.Claude/spec-work/tarefa.txt`: entrada da demanda.
- `.Claude/spec-work/tarefa.md`: especificação markdown gerada.

## 4. Dependências externas (CDN/APIs)
- Bootstrap 5.3.3 (CSS/JS).
- Bootstrap Icons.
- AOS (animações na listagem de artigos).
- EmailJS no formulário de contato.
- Google Maps Embed.

### Onde cada dependência é usada
- Bootstrap e Bootstrap Icons: todas as páginas principais e contato.
- AOS: apenas em `direito-imobiliario.html`.
- EmailJS: apenas em `pages/contato/contato.html` e `pages/contato/contato.js`.
- Google Maps Embed: `index.html` e `pages/contato/contato.html`.

## 5. Fluxo funcional principal
1. Usuário entra em `index.html`.
2. Clica em "Ver artigos" de direito imobiliario.
3. Abre `direito-imobiliario.html`, que renderiza cards dinamicamente.
4. Clica em "Leia mais" e abre `post.html?id=<numero>`.
5. `post.js` resolve o ID e monta o conteúdo.

## 6. Convenções operacionais para agentes
- Preservar estrutura estática e links relativos.
- Conferir ordem dos scripts quando mexer em páginas de posts:
  - primeiro carregar arquivo de dados (`bancoDados/...`),
  - depois script que consome os dados (`javascript/...`).
- Evitar mover assets sem atualizar todos os caminhos relativos.
- Manter consistência de textos do footer/header entre páginas.
- Em alterações de formulário, validar impacto no EmailJS (`pages/contato/contato.js`).
- Priorizar fluxo SDD completo antes de alterações grandes:
  1. `sdd-tarefa`
  2. `sdd-prd`
  3. `sdd-html`
  4. `sdd-breakcheck`
  5. `sdd-impl`

## 7. Pontos de atenção técnica
- Chave pública do EmailJS está no front-end; tratar como informação pública e restringir uso no painel do serviço.
- Existem estilos legados em `css/style.css` e em `css/direitoImobiliario.css`; confirmar uso antes de remover.
- Parte dos dados de posts usa imagens externas (Unsplash), o que depende de disponibilidade da URL.
- O arquivo `.gitignore` ignora `.Claude/`; manter essa regra para evitar ruído no repositório.

## 8. Como rodar localmente
Use Node.js para servir o front-end local:

```powershell
cd e:\CodeBox\IA\Advocacia\advocaciaSite
npm run dev:front
```

Depois abrir no navegador:
- `http://localhost:5500/index.html`

## 9. Checklist rápido antes de publicar
- Verificar links quebrados entre páginas.
- Testar navegação mobile e desktop.
- Validar envio do formulário de contato.
- Confirmar renderização dos posts e paginação.
- Revisar dados institucionais (telefone, email, endereço, redes).

## 10. Escopo atual e próxima evolução
- Escopo atual: foco forte em home, contato e trilha de conteúdo imobiliário.
- Evolução natural:
  - adicionar trilha completa para família/sucessões,
  - centralizar configurações institucionais em um único arquivo JSON/JS,
  - padronizar e limpar CSS legados.
