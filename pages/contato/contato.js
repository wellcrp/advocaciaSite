emailjs.init("GzHHlrKimlrr1Lh4u");
const SERVICE_ID = "service_jy7ixng";
const TEMPLATE_ID = "template_w8rn2qn";

const form = document.getElementById("contactForm");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, this)
        .then(function () {
            alert("Mensagem enviada com sucesso!");
            form.reset();
        })
        .catch(function (error) {
            console.error("Erro ao enviar:", error);
            alert("Falha ao enviar. Tente novamente mais tarde.");
        });
});
