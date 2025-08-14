document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("quem-somos").addEventListener("click", function(e) {
    e.preventDefault(); // evita o comportamento padrão do link

    // Pega a URL base do site (sem o path atual)
    const baseURL = window.location.href;
    const baseOrigin = window.location.origin;
    
    const urlFinal = baseOrigin + "/advocaciaSite/#quem-somos";
    console.log(urlFinal);

    // Redireciona para a home com o hash
     window.location.href = baseURL + "/#quem-somos";
});

function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
}

function buscarPostPorId(id) {
    return posts.find(post => post.id === id);
}

function renderizarPost() {
    const id = getPostIdFromURL();
    const post = buscarPostPorId(id);
    const container = document.getElementById("post-content");

    if (!post) {
        container.innerHTML = `<div class="alert alert-danger m-4">❌ Post não encontrado.</div>`;
        return;
    }

    container.innerHTML = `
    <img src="${post.img}" alt="${post.title}">
    <div class="card-body">
      <h2>${post.title}</h2>
      <p>${post.desc}</p>
    </div>`;
}

document.addEventListener("DOMContentLoaded", renderizarPost);