//Pegar o ano atual
document.getElementById('year').textContent = new Date().getFullYear();

const postsPerPage = 6;
let currentPage = 1;

if (typeof posts === "undefined") {
  console.error("Erro: variável 'posts' não está definida. Verifique a ordem dos scripts.");
} else {
  renderizarPosts(currentPage);
  configurarPaginacao();
}

// Renderiza os posts na tela
function renderizarPosts(page) {
  const postsSelecionados = buscarPosts(page, postsPerPage);
  const container = document.getElementById("posts-container");
  container.innerHTML = "";
  
  postsSelecionados.forEach((post) => {
    const postHTML = `
    <div class="col-md-4" data-aos="fade-up">
      <div class="card h-100 shadow-sm">
        <img src="${post.img}" class="card-img-top" alt="${post.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text flex-grow-1">${post.desc}</p>
          <div class="mt-auto">
            <a href="post.html?id=${post.id}" class="btn btn-outline-teal mt-3" target="_blank">
              <span>Leia mais </span> <i class="bi bi-arrow-right-circle ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>`;
    container.insertAdjacentHTML("beforeend", postHTML);
  });

  AOS.refresh(); // ✅ Atualiza os elementos com animação
  console.log(`Renderizando página ${page} com ${postsSelecionados.length} posts`);
}

// Simula busca paginada no "banco de dados"
function buscarPosts(page, limit) {
  const start = (page - 1) * limit;
  const end = start + limit;
  return posts.slice(start, end);
}

// Cria os botões de paginação
function configurarPaginacao() {
  const totalPaginas = Math.ceil(posts.length / postsPerPage);
  const paginacao = document.getElementById("pagination");
  paginacao.innerHTML = "";

  // 👇 Verifica se há menos de 6 posts
  if (totalPaginas <= 1) {
    return;
  }


  const paginasPorBloco = 10;
  const blocoAtual = Math.floor((currentPage - 1) / paginasPorBloco);
  const inicio = blocoAtual * paginasPorBloco + 1;
  const fim = Math.min(inicio + paginasPorBloco - 1, totalPaginas);

  // Botão "Primeira Página"
  if (currentPage > 1) {
    const liPrimeira = document.createElement("li");
    liPrimeira.className = "page-item";
    liPrimeira.innerHTML = `<a class="page-link" href="#"><i class="bi bi-chevron-double-left"></i></a>`;
    liPrimeira.addEventListener("click", function (e) {
      e.preventDefault();
      currentPage = 1;
      renderizarPosts(currentPage);
      configurarPaginacao();
      AOS.refresh();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginacao.appendChild(liPrimeira);
  }

  //Botão "Anterior"
  if (blocoAtual > 0) {
    const liAnterior = document.createElement("li");
    liAnterior.className = "page-item";
    liAnterior.innerHTML = `<a class="page-link" href="#">«</a>`;
    liAnterior.addEventListener("click", function (e) {
      e.preventDefault();
      currentPage = inicio - paginasPorBloco;
      renderizarPosts(currentPage);
      configurarPaginacao();
      AOS.refresh();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginacao.appendChild(liAnterior);
  }

  // Botões de páginas do bloco atual
  for (let i = inicio; i <= fim; i++) {
    const li = document.createElement("li");
    li.className = "page-item" + (i === currentPage ? " active" : "");
    li.innerHTML = `
    <a class="page-link d-flex align-items-center gap-2" href="#">
      ${i} <i class="bi bi-arrow-right-circle"></i>
    </a>`;
    li.addEventListener("click", function (e) {
      e.preventDefault();
      currentPage = i;
      renderizarPosts(currentPage);
      configurarPaginacao();
      AOS.refresh();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginacao.appendChild(li);
  }


  // Botão "Próximo"
  if (fim < totalPaginas) {
    const liProximo = document.createElement("li");
    liProximo.className = "page-item";
    liProximo.innerHTML = `<a class="page-link" href="#">»</a>`;
    liProximo.addEventListener("click", function (e) {
      e.preventDefault();
      currentPage = fim + 1;
      renderizarPosts(currentPage);
      configurarPaginacao();
      AOS.refresh();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginacao.appendChild(liProximo);
  }

  // Botão "Última Página"
  if (currentPage < totalPaginas) {
    const liUltima = document.createElement("li");
    liUltima.className = "page-item";
    liUltima.innerHTML = `<a class="page-link" href="#"><i class="bi bi-chevron-double-right"></i></a>`;
    liUltima.addEventListener("click", function (e) {
      e.preventDefault();
      currentPage = totalPaginas;
      renderizarPosts(currentPage);
      configurarPaginacao();
      AOS.refresh();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginacao.appendChild(liUltima);
  }

}
// function configurarPaginacao() {
//   const totalPaginas = Math.ceil(posts.length / postsPerPage);
//   const paginacao = document.getElementById("pagination");
//   paginacao.innerHTML = "";

//   for (let i = 1; i <= totalPaginas; i++) {
//     const li = document.createElement("li");
//     li.className = "page-item" + (i === currentPage ? " active" : "");
//     li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
//     li.addEventListener("click", function (e) {
//       e.preventDefault();
//       currentPage = i;
//       renderizarPosts(currentPage);
//       configurarPaginacao();
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     });
//     paginacao.appendChild(li);
//   }
// }

// Inicializa a página
renderizarPosts(currentPage);
configurarPaginacao();