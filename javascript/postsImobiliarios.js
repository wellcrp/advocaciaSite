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

  // postsSelecionados.forEach(post => {
  //   const postHTML = `
  //     <div class="col-md-4">
  //       <div class="card h-100 shadow-sm">
  //         <img src="${post.img}" class="card-img-top" alt="${post.title}">
  //         <div class="card-body d-flex flex-column">
  //           <h5 class="card-title">${post.title}</h5>
  //           <p class="card-text flex-grow-1">${post.desc}</p>
  //            <div class="mt-auto">
  //             <a href="post.html?id=${post.id}" class="btn btn-outline-teal mt-3" target="_blank">Leia mais <i class="bi bi-arrow-right-circle ms-2"></i></a>
  //            </div>
  //         </div>
  //       </div>
  //     </div>`;
  //   container.insertAdjacentHTML("beforeend", postHTML);
  // });

  postsSelecionados.forEach((post, index) => {
    const destaqueClass = index === 1 ? "col-md-12" : "col-md-4";
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

  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement("li");
    li.className = "page-item" + (i === currentPage ? " active" : "");

    li.innerHTML = `
      <a class="page-link d-flex align-items-center gap-2" href="#">
        ${i} <i class="bi bi-arrow-right-circle"></i>
      </a>
    `;

    li.addEventListener("click", function (e) {
      e.preventDefault();
      currentPage = i;
      renderizarPosts(currentPage); // Certifique-se que os cards tenham data-aos
      configurarPaginacao();
      AOS.refresh(); // Atualiza os efeitos
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    paginacao.appendChild(li);
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