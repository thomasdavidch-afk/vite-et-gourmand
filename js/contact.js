(function () {

    // --- SÉLECTION DES ÉLÉMENTS ---
    const form     = document.querySelector("form");
    const nom      = document.querySelector("input[name='nom']");
    const tel      = document.querySelector("input[name='telephone']");
    const email    = document.querySelector("input[name='email']");
    const sujet    = document.querySelector("input[name='sujet']");
    const message  = document.querySelector("textarea[name='message']");
    const checkbox = document.querySelector("input[type='checkbox']");
    const bouton   = document.querySelector("button[type='submit']");

    // --- FONCTION : Afficher une erreur sous un champ ---
    function afficherErreur(input, msg) {
        supprimerErreur(input);
        input.classList.add("is-invalid");
        const div = document.createElement("div");
        div.className = "invalid-feedback";
        div.textContent = msg;
        input.parentNode.appendChild(div);
    }

    // --- FONCTION : Supprimer une erreur ---
    function supprimerErreur(input) {
        input.classList.remove("is-invalid");
        input.classList.remove("is-valid");
        const existing = input.parentNode.querySelector(".invalid-feedback");
        if (existing) existing.remove();
    }

    // --- FONCTION : Marquer un champ comme valide ---
    function marquerValide(input) {
        supprimerErreur(input);
        input.classList.add("is-valid");
    }

    // --- VALIDATION EN TEMPS RÉEL ---
    nom.addEventListener("input", () => {
        if (nom.value.trim().length < 3) {
            afficherErreur(nom, "Le nom doit contenir au moins 3 caractères.");
        } else {
            marquerValide(nom);
        }
    });

    email.addEventListener("input", () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email.value.trim())) {
            afficherErreur(email, "Veuillez entrer un email valide.");
        } else {
            marquerValide(email);
        }
    });

    tel.addEventListener("input", () => {
        const regexTel = /^(\+33|0)[1-9](\d{8})$/;
        const valeur = tel.value.trim().replace(/\s/g, "");
        if (valeur !== "" && !regexTel.test(valeur)) {
            afficherErreur(tel, "Format invalide (ex: 0612345678 ou +33612345678).");
        } else {
            marquerValide(tel);
        }
    });

    sujet.addEventListener("input", () => {
        if (sujet.value.trim().length < 5) {
            afficherErreur(sujet, "Le sujet doit contenir au moins 5 caractères.");
        } else {
            marquerValide(sujet);
        }
    });

    message.addEventListener("input", () => {
        if (message.value.trim().length < 20) {
            afficherErreur(message, "Le message doit contenir au moins 20 caractères.");
        } else {
            marquerValide(message);
        }
    });

    // --- SOUMISSION DU FORMULAIRE ---
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let valide = true;

        // --- Revalidation complète à la soumission ---
        if (nom.value.trim().length < 3) {
            afficherErreur(nom, "Le nom doit contenir au moins 3 caractères.");
            valide = false;
        } else {
            marquerValide(nom);
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email.value.trim())) {
            afficherErreur(email, "Veuillez entrer un email valide.");
            valide = false;
        } else {
            marquerValide(email);
        }

        const regexTel = /^(\+33|0)[1-9](\d{8})$/;
        const valeurTel = tel.value.trim().replace(/\s/g, "");
        if (valeurTel !== "" && !regexTel.test(valeurTel)) {
            afficherErreur(tel, "Format invalide (ex: 0612345678 ou +33612345678).");
            valide = false;
        }

        if (sujet.value.trim().length < 5) {
            afficherErreur(sujet, "Le sujet doit contenir au moins 5 caractères.");
            valide = false;
        } else {
            marquerValide(sujet);
        }

        if (message.value.trim().length < 20) {
            afficherErreur(message, "Le message doit contenir au moins 20 caractères.");
            valide = false;
        } else {
            marquerValide(message);
        }

        if (!checkbox.checked) {
            afficherErreur(checkbox, "Vous devez accepter avant d'envoyer.");
            valide = false;
        } else {
            supprimerErreur(checkbox);
        }

        if (!valide) return;

        // --- SIMULATION D'ENVOI ---
        bouton.disabled = true;
        bouton.textContent = "Envoi en cours...";

        setTimeout(() => {

            // --- Supprimer le formulaire ---
            form.innerHTML = "";

            // --- Message de succès ---
            const success = document.createElement("div");
            success.className = "alert alert-success text-center fs-5 mt-4";
            success.innerHTML = `
                ✅ <strong>Message envoyé avec succès !</strong><br>
                Merci <strong>${nom.value.trim()}</strong>, nous vous répondrons à <strong>${email.value.trim()}</strong> dans les plus brefs délais.
            `;
            form.parentNode.appendChild(success);

        }, 1500);
    });

})();
