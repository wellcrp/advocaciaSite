//Pegar o ano atual
document.getElementById('year').textContent = new Date().getFullYear();

// POSTS FICTÍCIOS
// const posts = [
//     { titulo: "Alterações no Código Civil", conteudo: "As recentes alterações no Código Civil afetam diretamente contratos e obrigações." },
//     { titulo: "Direitos Trabalhistas", conteudo: "Conheça seus direitos no ambiente de trabalho e como se proteger." },
//     { titulo: "Reforma Tributária", conteudo: "Impactos da nova reforma tributária para empresas e cidadãos." },
//     { titulo: "Direito de Família", conteudo: "Entenda os direitos e deveres em casos de separação e guarda." },
//     { titulo: "Direito Penal", conteudo: "Saiba como funciona o processo penal no Brasil." },
//     { titulo: "Aposentadoria", conteudo: "Tudo sobre aposentadoria e benefícios previdenciários." }
// ];

// let currentPage = 1;
// const postsPerPage = 3;

// function renderPosts() {
//     const start = (currentPage - 1) * postsPerPage;
//     const end = start + postsPerPage;
//     const paginatedPosts = posts.slice(start, end);

//     const container = document.getElementById("post-container");
//     container.innerHTML = "";
//     paginatedPosts.forEach(post => {
//         const div = document.createElement("div");
//         div.classList.add("col-md-4");
//         div.innerHTML = `
//             <div class="card h-100 p-3">
//                 <h4>${post.titulo}</h4>
//                 <p>${post.conteudo}</p>
//             </div>
//         `;
//         container.appendChild(div);
//     });

//     renderPagination();
// }

// function renderPagination() {
//     const totalPages = Math.ceil(posts.length / postsPerPage);
//     const pagination = document.getElementById("pagination");
//     pagination.innerHTML = "";

//     for (let i = 1; i <= totalPages; i++) {
//         const btn = document.createElement("button");
//         btn.classList.add("btn", i === currentPage ? "btn-primary" : "btn-outline-primary");
//         btn.innerText = i;
//         btn.onclick = () => {
//             currentPage = i;
//             renderPosts();
//         };
//         pagination.appendChild(btn);
//     }
// }

// renderPosts();