const API_BASE_URL = window.__API_BASE_URL__ || "http://localhost:3333/api";

function formatPhoneBR(value) {
    const digits = (value || "").replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isValidPhoneDigits(value) {
    const digits = (value || "").replace(/\D/g, "");
    return digits.length === 0 || digits.length === 10 || digits.length === 11;
}

function showMessage(text, isError) {
    const feedback = document.getElementById("contact-feedback");
    if (!feedback) {
        alert(text);
        return;
    }

    feedback.textContent = text;
    feedback.classList.remove("d-none", "alert-success", "alert-danger");
    feedback.classList.add(isError ? "alert-danger" : "alert-success");
}

const form = document.getElementById("contactForm");

if (form) {
    const emailInput = form.elements.namedItem("email");
    const telefoneInput = form.elements.namedItem("telefone");

    if (telefoneInput && "addEventListener" in telefoneInput) {
        telefoneInput.addEventListener("input", function () {
            this.value = formatPhoneBR(this.value);
            this.setCustomValidity(isValidPhoneDigits(this.value) ? "" : "Telefone invalido.");
        });
    }

    if (emailInput && "addEventListener" in emailInput) {
        emailInput.addEventListener("blur", function () {
            const normalized = this.value.trim().toLowerCase();
            this.value = normalized;
            this.setCustomValidity(isValidEmail(normalized) || normalized.length === 0 ? "" : "E-mail invalido.");
        });
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = form.querySelector("button[type='submit']");
        const nameInput = form.elements.namedItem("name");
        const messageInput = form.elements.namedItem("message");

        if (emailInput && "value" in emailInput) {
            const normalizedEmail = emailInput.value.trim().toLowerCase();
            emailInput.value = normalizedEmail;
            emailInput.setCustomValidity(isValidEmail(normalizedEmail) ? "" : "E-mail invalido.");
        }

        if (telefoneInput && "value" in telefoneInput) {
            telefoneInput.value = formatPhoneBR(telefoneInput.value);
            telefoneInput.setCustomValidity(isValidPhoneDigits(telefoneInput.value) ? "" : "Telefone invalido.");
        }

        form.classList.add("was-validated");
        if (!form.checkValidity()) {
            return;
        }

        const payload = {
            name: nameInput && "value" in nameInput ? nameInput.value.trim() : "",
            email: emailInput && "value" in emailInput ? emailInput.value.trim() : "",
            telefone: telefoneInput && "value" in telefoneInput ? telefoneInput.value.trim() : "",
            message: messageInput && "value" in messageInput ? messageInput.value.trim() : ""
        };

        try {
            if (submitButton) submitButton.disabled = true;

            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Falha ao enviar a mensagem.");
            }

            showMessage("Mensagem enviada com sucesso!", false);
            form.reset();
        } catch (error) {
            console.error("Erro ao enviar:", error);
            showMessage("Falha ao enviar. Tente novamente mais tarde.", true);
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
}
