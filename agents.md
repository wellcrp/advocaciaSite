# AGENTS.md - Guia Detalhado do Projeto

## 1. Objetivo deste arquivo
Este documento ajuda qualquer agente (humano ou IA) a entender rapidamente como o projeto esta organizado, o que existe na raiz e como operar com seguranca sem quebrar o site.

## 2. Visao geral do projeto
- Tipo: site institucional estatico de escritorio de advocacia.
- Dominio de conteudo: direito civil, direito imobiliario, familia e sucessoes.
- Estrategia tecnica: HTML + CSS + JavaScript vanilla, com bibliotecas por CDN.
- Sem build step (nao usa bundler, npm, framework de SPA).

## 2.1 Padroes obrigatorios (origem: .Claude/skill e .Claude/memory)
- Proibido programacao de risco.
- Proibido codificacao mal feita.
- Desenvolver somente o necessario (sem escopo extra).
- Aplicar melhores praticas de HTML5, SEO, acessibilidade e seguranca.
- Tratar erros de formulario com retorno claro ao usuario.
- Nao adicionar plugins/dependencias sem necessidade real.
- Evitar expor informacoes sensiveis no front-end.

## 3. Inventario da raiz (projeto principal)

### `index.html`
- Pagina inicial institucional.
- Tem secoes de apresentacao (quem somos), servicos e localizacao.
- Usa `javascript/script.js` para utilitarios visuais globais (ano do footer, altura do header, viewport e ajuste do banner).
- Links para paginas internas de contato e artigos.

### `direito-imobiliario.html`
- Listagem de artigos de direito imobiliario.
- Renderiza cards dinamicos com paginacao via `javascript/postsImobiliarios.js`.
- Fonte dos dados vem de `bancoDados/bd_imobiliario.js`.
- Usa AOS por CDN para animacoes.

### `post.html`
- Pagina de detalhe de um artigo.
- Le o parametro `id` da URL e busca o item no array `posts`.
- Script principal: `javascript/posts/post.js`.

### `README.md`
- Documentacao principal para onboarding rapido.

### `bancoDados/`
- Simula banco de dados no front-end com arrays JS.
- Arquivos principais:
  - `bd_imobiliario.js`: lista de posts do fluxo imobiliario.
  - `bd_familiaSucessoes.js`: base separada para outro nicho (ainda sem pagina dedicada na raiz atual).

### `css/`
- Estilos do projeto.
- Estrutura observada:
  - `style/style.css`: estilos globais reais de layout/header/footer/componentes.
  - `index.css`: estilos especificos da home.
  - `posts/posts.css`: estilos da pagina de post individual.
  - `direitoImobiliario.css`: estilos de paginacao mais antigos/alternativos.
  - `style.css`: arquivo legado com customizacoes antigas.

### `img/`
- Ativos visuais (logos, wallpapers e imagens de apoio).
- Existe subestrutura de backup em `img/bkp/`.

### `javascript/`
- Scripts de comportamento da interface.
- Arquivos principais:
  - `script.js`: utilitarios globais para todas as paginas.
  - `postsImobiliarios.js`: listagem e paginacao de artigos.
  - `posts/post.js`: renderizacao de post por ID.

### `pages/`
- Paginas internas fora da raiz principal.
- Atualmente contem `pages/contato/` com:
  - `contato.html`
  - `contato.css`
  - `contato.js` (envio por EmailJS)

### `.gitignore`
- Ignora a pasta `.Claude/`.

### `.git/`
- Metadados do repositorio Git (nao editar manualmente).

### `.Claude/`
- Pasta local de suporte/ferramentas ignorada pelo Git.
- Contem o fluxo SDD do projeto (documentacao, memoria e workflows de agents).

## 3.1 Governanca SDD em `.Claude`
- `.Claude/SDD.md`: requisitos, arquitetura e boas praticas.
- `.Claude/skill/skill.md`: regras obrigatorias de desenvolvimento.
- `.Claude/memory/memory.md`: memoria de padroes e restricoes.
- `.Claude/workflows/`: definicoes de fluxo (`sdd-tarefa`, `sdd-prd`, `sdd-html`, `sdd-breakcheck`, `sdd-impl`).
- `.Claude/spec-work/tarefa.txt`: entrada da demanda.
- `.Claude/spec-work/tarefa.md`: especificacao markdown gerada.

## 4. Dependencias externas (CDN/APIs)
- Bootstrap 5.3.3 (CSS/JS).
- Bootstrap Icons.
- AOS (animacoes na listagem de artigos).
- EmailJS no formulario de contato.
- Google Maps Embed.

### Onde cada dependencia e usada
- Bootstrap e Bootstrap Icons: todas as paginas principais e contato.
- AOS: apenas em `direito-imobiliario.html`.
- EmailJS: apenas em `pages/contato/contato.html` e `pages/contato/contato.js`.
- Google Maps Embed: `index.html` e `pages/contato/contato.html`.

## 5. Fluxo funcional principal
1. Usuario entra em `index.html`.
2. Clica em "Ver artigos" de direito imobiliario.
3. Abre `direito-imobiliario.html`, que renderiza cards dinamicamente.
4. Clica em "Leia mais" e abre `post.html?id=<numero>`.
5. `post.js` resolve o ID e monta o conteudo.

## 6. Convencoes operacionais para agentes
- Preservar estrutura estatica e links relativos.
- Conferir ordem dos scripts quando mexer em paginas de posts:
  - primeiro carregar arquivo de dados (`bancoDados/...`),
  - depois script que consome os dados (`javascript/...`).
- Evitar mover assets sem atualizar todos os caminhos relativos.
- Manter consistencia de textos do footer/header entre paginas.
- Em alteracoes de formulario, validar impacto no EmailJS (`pages/contato/contato.js`).
- Priorizar fluxo SDD completo antes de alteracoes grandes:
  1. `sdd-tarefa`
  2. `sdd-prd`
  3. `sdd-html`
  4. `sdd-breakcheck`
  5. `sdd-impl`

## 7. Pontos de atencao tecnica
- Chave publica do EmailJS esta no front-end; tratar como informacao publica e restringir uso no painel do servico.
- Existem estilos legados em `css/style.css` e em `css/direitoImobiliario.css`; confirmar uso antes de remover.
- Parte dos dados de posts usa imagens externas (Unsplash), o que depende de disponibilidade da URL.
- O arquivo `.gitignore` ignora `.Claude/`; manter essa regra para evitar ruido no repositorio.

## 8. Como rodar localmente
Como o projeto e estatico, basta servir os arquivos por HTTP local:

```powershell
cd e:\CodeBox\IA\Advocacia\advocaciaSite
python -m http.server 5500
```

Depois abrir no navegador:
- `http://localhost:5500/index.html`

## 9. Checklist rapido antes de publicar
- Verificar links quebrados entre paginas.
- Testar navegacao mobile e desktop.
- Validar envio do formulario de contato.
- Confirmar renderizacao dos posts e paginacao.
- Revisar dados institucionais (telefone, email, endereco, redes).

## 10. Escopo atual e proxima evolucao
- Escopo atual: foco forte em home, contato e trilha de conteudo imobiliario.
- Evolucao natural:
  - adicionar trilha completa para familia/sucessoes,
  - centralizar configuracoes institucionais em um unico arquivo JSON/JS,
  - padronizar e limpar CSS legados.
