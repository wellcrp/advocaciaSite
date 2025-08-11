//Pegar o ano atual
document.getElementById('year').textContent = new Date().getFullYear();

const posts = [
      {
        id: 1,
        title: "Contrato de Compra e Venda",
        desc: "Saiba os principais cuidados na hora de assinar um contrato de compra e venda de imóveis.",
        img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 2,
        title: "Regularização de Imóvel",
        desc: "Entenda como funciona o processo de regularização de um imóvel e quais documentos são necessários.",
        img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 3,
        title: "Locação de Imóvel",
        desc: "Direitos e deveres de locadores e locatários no contrato de aluguel.",
        img: "https://images.unsplash.com/photo-1581093588401-7a4f2ecb3784?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 4,
        title: "Documentação Imobiliária",
        desc: "Documentos necessários para compra, venda e locação de imóveis.",
        img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 5,
        title: "Direitos do Inquilino",
        desc: "Conheça os principais direitos do inquilino em contratos de aluguel.",
        img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 6,
        title: "Investimento Imobiliário",
        desc: "Dicas para quem quer investir no mercado imobiliário com segurança.",
        img: "https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=800&q=80",
      },
    ];

const postsPerPage = 3;
let currentPage = 1;

function renderPosts(page) {
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsToShow = posts.slice(start, end);

    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    postsToShow.forEach(post => {
        const postHTML = `
          <div class="col-md-4">
            <div class="card shadow-sm h-100">
              <img src="${post.img}" class="card-img-top" alt="${post.title}">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text flex-grow-1">${post.desc}</p>
                <a href="post.html?id=${post.id}" target="_blank" class="btn btn-primary">Leia mais</a>
              </div>
            </div>
          </div>
        `;
        container.insertAdjacentHTML("beforeend", postHTML);
      });
    }

function setupPagination() {
      const pageCount = Math.ceil(posts.length / postsPerPage);
      const paginationUl = document.getElementById("pagination");
      paginationUl.innerHTML = "";

      for (let i = 1; i <= pageCount; i++) {
        const li = document.createElement("li");
        li.className = "page-item" + (i === currentPage ? " active" : "");
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener("click", function(e) {
          e.preventDefault();
          currentPage = i;
          renderPosts(currentPage);
          setupPagination();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        paginationUl.appendChild(li);
      }
}

// Inicializa posts e paginação
renderPosts(currentPage);
setupPagination();  