//Pegar o ano atual
document.getElementById('year').textContent = new Date().getFullYear();

// Seleciona todos os links com a classe 'navegationServices'
const navLinks = document.querySelectorAll(".navegationServices");

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault(); // Evita o comportamento padrão

        // Pega o ID do link clicado (ex: 'quem-somos', 'servicos', etc.)
        const sectionId = this.id;

        // Define a URL base (ajuste conforme seu projeto)
        const baseOrigin = window.location.origin;

        // Monta a URL final com o hash
        const urlFinal = baseOrigin + "/advocaciaSite/index.html#" + sectionId;

        // Redireciona para a página principal com o hash
        window.location.href = urlFinal;
    });
});