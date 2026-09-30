function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
}

function buscarPostPorId(id) {
    return posts.find(post => post.id === id);
}

function extrairParagrafos(post) {
    if (Array.isArray(post.content) && post.content.length > 0) {
        return post.content.filter(Boolean);
    }

    if (typeof post.content === "string" && post.content.trim() !== "") {
        return post.content
            .split(/\n\s*\n/g)
            .map((p) => p.trim())
            .filter(Boolean);
    }

    return [post.desc].filter(Boolean);
}

function montarResumo(paragrafos, fallback) {
    const base = paragrafos.join(" ").trim() || (fallback || "");
    if (base.length <= 170) return base;
    return `${base.slice(0, 167).trim()}...`;
}

function formatarDataAtual() {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).format(new Date());
}

function calcularTempoLeitura(texto) {
    const palavras = (texto || "").trim().split(/\s+/).filter(Boolean).length;
    const tempo = Math.max(1, Math.ceil(palavras / 180));
    return `${tempo} min de leitura`;
}

function atualizarProgressoLeitura() {
    const progressBar = document.getElementById("reading-progress-bar");
    const postCard = document.getElementById("post-content");
    if (!progressBar || !postCard) return;

    const rect = postCard.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const total = rect.height + viewport;
    const lido = viewport - rect.top;
    const percentual = Math.min(100, Math.max(0, (lido / total) * 100));

    progressBar.style.width = `${percentual}%`;
}

function renderizarPost() {
    const id = getPostIdFromURL();
    const post = buscarPostPorId(id);
    const container = document.getElementById("post-content");
    const headingTitle = document.querySelector(".post-title");
    const headingSubtitle = document.querySelector(".post-subtitle");
    const readingTime = document.getElementById("post-reading-time");
    const postDate = document.getElementById("post-date");

    if (!post) {
        container.innerHTML = `<div class="alert alert-danger m-4">❌ Post não encontrado.</div>`;
        return;
    }

    const paragrafos = extrairParagrafos(post);
    const resumo = montarResumo(paragrafos, post.desc);
    const htmlParagrafos = paragrafos.map((paragrafo) => `<p>${paragrafo}</p>`).join("");

    document.title = `${post.title} | Cardoso & Muscelli`;

    if (headingTitle) {
        headingTitle.textContent = post.title;
    }

    if (headingSubtitle) {
        headingSubtitle.textContent = resumo;
    }

    if (readingTime) {
        readingTime.innerHTML = `<i class="bi bi-clock-history"></i> ${calcularTempoLeitura(paragrafos.join(" "))}`;
    }

    if (postDate) {
        postDate.innerHTML = `<i class="bi bi-calendar3"></i> ${formatarDataAtual()}`;
    }

    container.innerHTML = `
    <article aria-label="Conteúdo do artigo">
    <img src="${post.img}" alt="${post.title}">
        <div class="card-body article-content">
      <p class="article-lead">Este conteúdo tem caráter informativo e foi preparado para orientar decisões iniciais com mais segurança.</p>
            ${htmlParagrafos}
    </div>
    </article>`;

    atualizarProgressoLeitura();
}

document.addEventListener("DOMContentLoaded", renderizarPost);
window.addEventListener("scroll", atualizarProgressoLeitura, { passive: true });
window.addEventListener("resize", atualizarProgressoLeitura);