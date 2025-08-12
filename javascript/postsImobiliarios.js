//Pegar o ano atual
document.getElementById('year').textContent = new Date().getFullYear();

const postsPerPage = 3;
let currentPage = 1;

if (typeof posts === "undefined") {
  console.error("Erro: variável 'posts' não está definida. Verifique a ordem dos scripts.");
} else {
  renderizarPosts(currentPage);
  configurarPaginacao();
}

// Simula busca paginada no "banco de dados"
function buscarPosts(page, limit) {
  const start = (page - 1) * limit;
  const end = start + limit;
  return posts.slice(start, end);
}


// Renderiza os posts na tela
function renderizarPosts(page) {
  const postsSelecionados = buscarPosts(page, postsPerPage);
  const container = document.getElementById("posts-container");
  container.innerHTML = "";

  postsSelecionados.forEach(post => {
    const postHTML = `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="${post.img}" class="card-img-top" alt="${post.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text flex-grow-1">${post.desc}</p>
            <a href="post.html?id=${post.id}" class="btn btn-primary mt-auto" target="_blank">Leia mais</a>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", postHTML);
  });

  console.log(`Renderizando página ${page} com ${postsSelecionados.length} posts`);

}

// Cria os botões de paginação
function configurarPaginacao() {
  const totalPaginas = Math.ceil(posts.length / postsPerPage);
  const paginacao = document.getElementById("pagination");
  paginacao.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement("li");
    li.className = "page-item" + (i === currentPage ? " active" : "");
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", function (e) {
      e.preventDefault();
      currentPage = i;
      renderizarPosts(currentPage);
      configurarPaginacao();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginacao.appendChild(li);
  }
}

// Inicializa a página
renderizarPosts(currentPage);
configurarPaginacao();