// ============================================================
// PAGE CONFIRMATION - Affichage du récapitulatif
// ============================================================

const infoCommande  = JSON.parse(sessionStorage.getItem("infoCommande")  || "{}");
const choixCommande = JSON.parse(sessionStorage.getItem("choixCommande") || "{}");

console.log("infoCommande :", infoCommande);
console.log("choixCommande :", choixCommande);

// Vérification : si données manquantes, rediriger vers l'accueil
if (!infoCommande.nomComplet || !choixCommande.menu) {
    window.history.pushState({}, "", "/");
    LoadContentPage();
}

// ============================================================
// INJECTION DU RÉCAPITULATIF DANS LA PAGE
// ============================================================

const section = document.querySelector("section");
const boutons = document.querySelector(".d-flex.justify-content-center");

const recap = document.createElement("div");
recap.className = "card text-start shadow-sm mb-5 mx-auto";
recap.style.maxWidth = "700px";

recap.innerHTML = `
    <div class="card-header bg-primary text-white fw-bold fs-5">
        📋 Récapitulatif de votre commande
    </div>
    <div class="card-body">

        <h5 class="fw-bold mb-3">👤 Informations client</h5>
        <ul class="list-unstyled mb-4">
            <li><strong>Nom :</strong> ${infoCommande.nomComplet}</li>
            <li><strong>Téléphone :</strong> ${infoCommande.telephone}</li>
            <li><strong>Email :</strong> ${infoCommande.email}</li>
            <li><strong>Adresse :</strong> ${infoCommande.numeroRue} ${infoCommande.nomRue}, ${infoCommande.codePostal} ${infoCommande.ville}</li>
            <li><strong>Date :</strong> ${infoCommande.date}</li>
            <li><strong>Heure :</strong> ${infoCommande.heure}</li>
            ${infoCommande.autresInfos ? `<li><strong>Infos complémentaires :</strong> ${infoCommande.autresInfos}</li>` : ""}
        </ul>

        <hr>

        <h5 class="fw-bold mb-3">🍽️ Détails du menu</h5>
        <ul class="list-unstyled mb-4">
            <li><strong>Menu :</strong> ${choixCommande.menu}</li>
            <li><strong>Entrée :</strong> ${choixCommande.entree}</li>
            <li><strong>Plat :</strong> ${choixCommande.plat}</li>
            <li><strong>Dessert :</strong> ${choixCommande.dessert}</li>
            <li><strong>Boissons :</strong> ${choixCommande.boissons?.join(", ")}</li>
            <li><strong>Nombre de personnes :</strong> ${choixCommande.nbPersonnes}</li>
        </ul>

        <hr>

        <h5 class="fw-bold mb-3">💰 Tarification</h5>
        <ul class="list-unstyled">
            <li><strong>Prix par personne :</strong> ${choixCommande.prixParPersonne} €</li>
            <li><strong>Prix de base :</strong> ${choixCommande.prixBase}</li>
            <li><strong>Remise :</strong> ${choixCommande.remise}</li>
            <li><strong>Montant remise :</strong> ${choixCommande.montantRemise}</li>
            <li class="fs-5 fw-bold text-success mt-2">💳 Prix Total : ${choixCommande.prixTotal}</li>
        </ul>

    </div>
`;

// Insérer le récap avant les boutons
section.insertBefore(recap, boutons);

// ============================================================
// ENVOI DES DONNÉES À L'API SYMFONY
// ============================================================

// Récupérer l'IRI du menu depuis l'API par son nom
fetch(`http://localhost:8000/api/menus?nom=${encodeURIComponent(choixCommande.menu)}`)
.then(res => res.json())
.then(menuData => {
    const membres = menuData["hydra:member"];

    if (!membres || membres.length === 0) {
        console.error("Menu introuvable dans l'API :", choixCommande.menu);
        return;
    }

    const menuIRI = membres[0]["@id"]; // ex: "/api/menus/3"

    const dataCommande = {
        datePrestation:  infoCommande.date,
        heureLivraison:  infoCommande.heure,
        nombrePersonne:  parseInt(choixCommande.nbPersonnes),
        prixMenu:        parseFloat(choixCommande.prixParPersonne),
        prixLivraison:   0.0,
        statut:          "en attente",
        menu:            menuIRI
    };

    console.log("Données envoyées :", dataCommande);

    return fetch("http://localhost:8000/api/commandes", {
        method: "POST",
        headers: {
            "Content-Type": "application/ld+json"
        },
        body: JSON.stringify(dataCommande)
    });
})
.then(res => {
    if (!res) return;
    return res.json();
})
.then(data => {
    if (!data) return;
    console.log("Commande enregistrée !", data);

    // Nettoyage sessionStorage après confirmation
    sessionStorage.removeItem("infoCommande");
    sessionStorage.removeItem("choixCommande");
})
.catch(err => {
    console.error("Erreur lors de l'envoi de la commande :", err);
});
