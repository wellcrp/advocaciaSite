# advocaciaSite

Site institucional estatico para escritorio de advocacia, com foco em apresentacao de servicos e publicacao de artigos juridicos.

## Visao geral
- Home institucional com secoes de apresentacao, servicos e localizacao.
- Pagina de artigos de direito imobiliario com paginacao dinamica.
- Pagina de detalhe de artigo por ID na URL.
- Pagina de contato com envio via EmailJS.

## Stack tecnica
- HTML5
- CSS3
- JavaScript (vanilla)
- Bootstrap 5 (CDN)
- Bootstrap Icons (CDN)
- AOS para animacoes (CDN)
- EmailJS (CDN)

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

## Paginas e fluxo
1. `index.html` e o ponto de entrada.
2. `direito-imobiliario.html` lista os posts carregados de `bancoDados/bd_imobiliario.js`.
3. `post.html?id=N` mostra o artigo selecionado.
4. `pages/contato/contato.html` processa envio de formulario com EmailJS.

## Como executar localmente
Opcao com Python:

```powershell
cd e:\CodeBox\IA\Advocacia\advocaciaSite
python -m http.server 5500
```

Abra no navegador:
- `http://localhost:5500/index.html`

## Manutencao rapida

### Adicionar/editar posts imobiliarios
1. Edite `bancoDados/bd_imobiliario.js`.
2. Garanta que cada item tenha `id`, `title`, `desc` e `img`.
3. Teste listagem em `direito-imobiliario.html` e detalhe em `post.html?id=ID`.

### Ajustar comportamento global
- Arquivo: `javascript/script.js`.
- Responsavel por:
	- ano automatico do footer,
	- ajuste de altura do header fixo,
	- variavel de viewport para mobile,
	- posicionamento do banner principal.

### Ajustar visual
- Estilos globais: `css/style/style.css`.
- Home: `css/index.css`.
- Post individual: `css/posts/posts.css`.
- Contato: `pages/contato/contato.css`.

### Ordem de scripts (critico para posts)
- Em paginas de posts, carregar primeiro o banco de dados em `bancoDados/...`.
- Depois carregar o script consumidor em `javascript/...`.
- Exemplo atual:
	- `direito-imobiliario.html`: `bd_imobiliario.js` antes de `postsImobiliarios.js`.
	- `post.html`: `bd_imobiliario.js` antes de `posts/post.js`.

## Atencao com EmailJS
- Arquivo: `pages/contato/contato.js`.
- No estado atual, existe inicializacao no front-end.
- Recomenda-se limitar dominio/origem e templates no painel do EmailJS para evitar abuso.
- Para endurecimento de seguranca, migrar envio para backend e remover identificadores sensiveis do cliente.

## Checklist antes de publicar
- Conferir links e navegacao entre paginas.
- Validar formulario de contato.
- Testar responsividade (mobile e desktop).
- Confirmar textos institucionais: telefone, email e endereco.