const form = document.getElementById("formInfoCommande");
const btnContinuer = document.querySelector('button[type="submit"]');

// Expressions régulières
const regexTelephone = /^(\+33|0)[1-9](\d{2}){4}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexCodePostal = /^\d{5}$/;

// Pré-remplir les champs si des données existent déjà en sessionStorage
const savedData = sessionStorage.getItem("infoCommande");
if (savedData) {
    const data = JSON.parse(savedData);
    document.getElementById("nomComplet").value = data.nomComplet || "";
    document.getElementById("telephone").value = data.telephone || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("numeroRue").value = data.numeroRue || "";
    document.getElementById("nomRue").value = data.nomRue || "";
    document.getElementById("codePostal").value = data.codePostal || "";
    document.getElementById("ville").value = data.ville || "";
    document.getElementById("date").value = data.date || "";
    document.getElementById("heure").value = data.heure || "";
    document.getElementById("autresInfos").value = data.autresInfos || "";
}

// Fonction utilitaire pour appliquer le feedback visuel
function appliquerFeedback(id, estValide, estVide) {
    const input = document.getElementById(id);
    if (estVide) {
        input.classList.remove("is-valid", "is-invalid");
    } else if (estValide) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }
}

// Fonction qui vérifie si le formulaire est valide
function verifierFormulaire() {
    const nomComplet = document.getElementById("nomComplet").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const email = document.getElementById("email").value.trim();
    const numeroRue = document.getElementById("numeroRue").value.trim();
    const nomRue = document.getElementById("nomRue").value.trim();
    const codePostal = document.getElementById("codePostal").value.trim();
    const ville = document.getElementById("ville").value.trim();
    const date = document.getElementById("date").value;
    const heure = document.getElementById("heure").value;

    // Vérification date
    const dateChoisie = new Date(date);
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);
    const dateValide = date && dateChoisie >= aujourdhui;

    // Validations
    const telephoneValide = regexTelephone.test(telephone);
    const emailValide = regexEmail.test(email);
    const codePostalValide = regexCodePostal.test(codePostal);
    const champsTousRemplis = nomComplet && numeroRue && nomRue && ville && heure;

    // Feedbacks visuels
    appliquerFeedback("telephone", telephoneValide, telephone === "");
    appliquerFeedback("email", emailValide, email === "");
    appliquerFeedback("codePostal", codePostalValide, codePostal === "");

    // Activer ou désactiver le bouton
    if (champsTousRemplis && telephoneValide && emailValide && codePostalValide && dateValide) {
        btnContinuer.disabled = false;
    } else {
        btnContinuer.disabled = true;
    }
}

// Désactiver le bouton au chargement
btnContinuer.disabled = true;

// Écouter les changements sur tous les champs
document.getElementById("nomComplet").addEventListener("input", verifierFormulaire);
document.getElementById("telephone").addEventListener("input", verifierFormulaire);
document.getElementById("email").addEventListener("input", verifierFormulaire);
document.getElementById("numeroRue").addEventListener("input", verifierFormulaire);
document.getElementById("nomRue").addEventListener("input", verifierFormulaire);
document.getElementById("codePostal").addEventListener("input", verifierFormulaire);
document.getElementById("ville").addEventListener("input", verifierFormulaire);
document.getElementById("date").addEventListener("input", verifierFormulaire);
document.getElementById("heure").addEventListener("input", verifierFormulaire);

// Si pré-remplissage, on vérifie directement au chargement
if (savedData) verifierFormulaire();

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const infoCommande = {
        nomComplet: document.getElementById("nomComplet").value.trim(),
        telephone: document.getElementById("telephone").value.trim(),
        email: document.getElementById("email").value.trim(),
        numeroRue: document.getElementById("numeroRue").value.trim(),
        nomRue: document.getElementById("nomRue").value.trim(),
        codePostal: document.getElementById("codePostal").value.trim(),
        ville: document.getElementById("ville").value.trim(),
        date: document.getElementById("date").value,
        heure: document.getElementById("heure").value,
        autresInfos: document.getElementById("autresInfos").value.trim()
    };

    sessionStorage.setItem("infoCommande", JSON.stringify(infoCommande));

    // Navigation vers l'étape 2
    window.history.pushState({}, "", "/choixCommande");
    LoadContentPage();
});
