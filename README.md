# advocaciaSite

Site institucional estático para escritório de advocacia, com foco em apresentação de serviços e publicação de artigos jurídicos.

## Visão geral
- Home institucional com seções de apresentação, serviços e localização.
- Página de artigos de direito imobiliário com paginação dinâmica.
- Página de detalhe de artigo por ID na URL.
- Página de contato com envio via EmailJS.

## Stack técnica
- HTML5
- CSS3
- JavaScript (vanilla)
- Bootstrap 5 (CDN)
- Bootstrap Icons (CDN)
- AOS para animações (CDN)
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

## Páginas e fluxo
1. `index.html` é o ponto de entrada.
2. `direito-imobiliario.html` lista os posts carregados de `bancoDados/bd_imobiliario.js`.
3. `post.html?id=N` mostra o artigo selecionado.
4. `pages/contato/contato.html` processa envio de formulário com EmailJS.

## Como executar localmente
Opção com Python:

```powershell
cd e:\CodeBox\IA\Advocacia\advocaciaSite
python -m http.server 5500
```

Abra no navegador:
- `http://localhost:5500/index.html`

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

## Atenção com EmailJS
- Arquivo: `pages/contato/contato.js`.
- No estado atual, existe inicialização no front-end.
- Recomenda-se limitar domínio/origem e templates no painel do EmailJS para evitar abuso.
- Para endurecimento de segurança, migrar envio para backend e remover identificadores sensíveis do cliente.

## Checklist antes de publicar
- Conferir links e navegação entre páginas.
- Validar formulário de contato.
- Testar responsividade (mobile e desktop).
- Confirmar textos institucionais: telefone, email e endereço.