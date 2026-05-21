// ============================================================
// DONNÉES DES MENUS
// ============================================================
const menus = {
    joyeuxNoel: {
        nom: "Menu Joyeux Noël Indien",
        prix: 27,
        minPersonnes: 20,
        entrees: ["Samoussas de Noël", "Tandoori Chicken", "Chaat de Betterave et Grenade"],
        plats: ["Rogan Josh de Noël", "Curry de Légumes d'Hiver", "Biryani de Noël aux Fruits Secs"],
        desserts: ["Gajar ka Halwa", "Kheer aux Fruits Secs", "Gulab Jamun Festif"],
        boissons: ["Lassi salé (yaourt, menthe, cumin)", "Mule de Noël (vodka, gingembre...)", "Vin Blanc Sec", "Vin Rouge Léger", "Eau Plate"]
    },
    vege: {
        nom: "Menu Le Végétarien",
        prix: 32,
        minPersonnes: 20,
        entrees: ["Falafels Maison", "Bruschettas Tomate Basilic", "Salade de Lentilles et Légumes"],
        plats: ["Curry de Pois Chiches", "Gratin de Légumes", "Pâtes aux Légumes Grillés"],
        desserts: ["Panna Cotta Vanille", "Compote Maison", "Cake aux Fruits Secs"],
        boissons: ["Smoothie Mangue", "Jus Détox Vert", "Infusion Verveine", "Lait d'Amande", "Eau Plate"]
    },
    seminaire: {
        nom: "Menu Séminaire",
        prix: 23,
        minPersonnes: 50,
        entrees: ["Mini Wraps Poulet Curry", "Verrines de Saumon et Avocat", "Salade de Quinoa Méditerranéenne"],
        plats: ["Poulet Grillé aux Herbes", "Saumon Sauce Citron", "Risotto aux Champignons"],
        desserts: ["Tiramisu Classique", "Salade de Fruits Frais", "Moelleux au Chocolat"],
        boissons: ["Eau Infusée Citron Menthe", "Jus de Fruits Frais", "Café Filtre", "Thé Vert", "Eau Plate"]
    },
    grandFormat: {
        nom: "Menu Le Grand Format",
        prix: 23,
        minPersonnes: 50,
        entrees: ["Assortiment de Beignets Salés", "Plateau de Charcuterie Artisanale", "Salade César XXL"],
        plats: ["Paëlla Géante", "Couscous Royal", "Lasagnes Maison"],
        desserts: ["Buffet de Desserts Variés", "Brownies Gourmands", "Cheesecake XXL"],
        boissons: ["Punch Maison", "Sangria Rouge", "Bière Artisanale", "Cola", "Eau Plate"]
    },
    maries: {
        nom: "Menu Vive les Mariés",
        prix: 28,
        minPersonnes: 50,
        entrees: ["Carpaccio de Saint-Jacques", "Foie Gras Maison", "Salade Gourmande aux Magrets"],
        plats: ["Filet de Bœuf Rossini", "Suprême de Volaille aux Morilles", "Dos de Cabillaud Beurre Blanc"],
        desserts: ["Pièce Montée", "Macarons Assortis", "Fraisier Élégant"],
        boissons: ["Champagne Brut", "Cocktail Spritz", "Vin Blanc Prestige", "Vin Rouge Réserve", "Eau Plate"]
    }
};

// ============================================================
// RÉFÉRENCES DOM
// ============================================================
const selectMenu         = document.getElementById("selectMenu");
const sectionChoix       = document.getElementById("sectionChoix");
const selectEntree       = document.getElementById("selectEntree");
const selectPlat         = document.getElementById("selectPlat");
const selectDessert      = document.getElementById("selectDessert");
const boissonsContainer  = document.getElementById("boissonsContainer");
const msgBoissons        = document.getElementById("msgBoissons");
const nbPersonnesInput   = document.getElementById("nbPersonnes");
const remiseInput        = document.getElementById("remise");
const prixBaseInput      = document.getElementById("prixBase");
const montantRemiseInput = document.getElementById("montantRemise");
const prixTotalInput     = document.getElementById("prixTotal");
const formChoixMenu      = document.getElementById("formChoixMenu");
// ⬇️ NOUVEAU : message d'erreur sous le champ nombre de personnes
const erreurPersonnes    = document.getElementById("erreurPersonnes");

// ============================================================
// FONCTION : Remplir un select avec des options
// ============================================================
function remplirSelect(selectElement, options) {
    selectElement.innerHTML = `<option selected disabled value="">-- Sélectionnez --</option>`;
    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        selectElement.appendChild(option);
    });
}

// ============================================================
// FONCTION : Générer les checkboxes des boissons
// ============================================================
function genererBoissons(boissons) {
    boissonsContainer.innerHTML = "";
    boissons.forEach((boisson, index) => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
            <div class="form-check">
                <input class="form-check-input boisson-check" type="checkbox" value="${boisson}" id="boisson${index}">
                <label class="form-check-label" for="boisson${index}">${boisson}</label>
            </div>
        `;
        boissonsContainer.appendChild(col);
    });

    boissonsContainer.addEventListener("change", (event) => {
        const checked = boissonsContainer.querySelectorAll(".boisson-check:checked");
        if (checked.length > 3) {
            event.target.checked = false;
            msgBoissons.classList.remove("d-none");
        } else {
            msgBoissons.classList.add("d-none");
        }
    });
}

// ============================================================
// FONCTION : Calculer les prix
// ============================================================
function calculerPrix() {
    const menuKey = selectMenu.value;
    const nbPersonnes = parseInt(nbPersonnesInput.value);
    const erreurPersonnes = document.getElementById("erreurPersonnes");

    if (!menuKey || isNaN(nbPersonnes) || nbPersonnes <= 0) {
        prixBaseInput.value      = "";
        montantRemiseInput.value = "";
        prixTotalInput.value     = "";
        remiseInput.value        = "";
        return;
    }

    if (nbPersonnes > 300) {
    nbPersonnesInput.classList.add("is-invalid");
    if (erreurPersonnes) {
        erreurPersonnes.textContent = "Le nombre maximum de personnes est de 300.";
        erreurPersonnes.classList.remove("d-none");
    }
    prixBaseInput.value      = "";
    montantRemiseInput.value = "";
    prixTotalInput.value     = "";
    remiseInput.value        = "";
    return;
}

    const menu = menus[menuKey];

    if (nbPersonnes < menu.minPersonnes) {
        nbPersonnesInput.classList.add("is-invalid");
        if (erreurPersonnes) {
            erreurPersonnes.textContent = `Minimum requis pour ce menu : ${menu.minPersonnes} personnes.`;
            erreurPersonnes.classList.remove("d-none");
        }
        prixBaseInput.value      = "";
        montantRemiseInput.value = "";
        prixTotalInput.value     = "";
        remiseInput.value        = "";
        return;
    }

    nbPersonnesInput.classList.remove("is-invalid");
    if (erreurPersonnes) erreurPersonnes.classList.add("d-none");

    const prixBase = menu.prix * nbPersonnes;
    const seuilRemise = menu.minPersonnes + 4;
    let tauxRemise = 0;
    let montantRemise = 0;
    let prixTotal = prixBase;

    if (nbPersonnes > seuilRemise) {
        tauxRemise = 10;
        montantRemise = prixBase * 0.10;
        prixTotal = prixBase - montantRemise;
    }

    prixBaseInput.value      = prixBase.toFixed(2) + " €";
    remiseInput.value        = tauxRemise > 0 ? tauxRemise + "%" : "Aucune remise";
    montantRemiseInput.value = montantRemise > 0 ? "-" + montantRemise.toFixed(2) + " €" : "0.00 €";
    prixTotalInput.value     = prixTotal.toFixed(2) + " €";
}

// ============================================================
// ÉVÉNEMENT : Changement de menu
// ============================================================
selectMenu.addEventListener("change", () => {
    const menuKey = selectMenu.value;
    const menu = menus[menuKey];

    // ⬇️ NOUVEAU : mettre à jour le placeholder avec le minimum du menu sélectionné
    nbPersonnesInput.min = menu.minPersonnes;
    nbPersonnesInput.placeholder = `Minimum ${menu.minPersonnes} personnes`;

    sectionChoix.classList.remove("d-none");

    remplirSelect(selectEntree, menu.entrees);
    remplirSelect(selectPlat, menu.plats);
    remplirSelect(selectDessert, menu.desserts);

    genererBoissons(menu.boissons);

    calculerPrix();
});

// ============================================================
// ÉVÉNEMENT : Changement nombre de personnes
// ============================================================
nbPersonnesInput.addEventListener("input", calculerPrix);

// ============================================================
// ÉVÉNEMENT : Soumission du formulaire
// ============================================================
formChoixMenu.addEventListener("submit", (e) => {
    e.preventDefault();

    const menuKey = selectMenu.value;
    if (!menuKey) {
        alert("Veuillez sélectionner un menu.");
        return;
    }

    const entree = selectEntree.value;
    if (!entree) {
        alert("Veuillez sélectionner une entrée.");
        return;
    }

    const plat = selectPlat.value;
    if (!plat) {
        alert("Veuillez sélectionner un plat.");
        return;
    }

    const dessert = selectDessert.value;
    if (!dessert) {
        alert("Veuillez sélectionner un dessert.");
        return;
    }

    const boissonsChoisies = [...boissonsContainer.querySelectorAll(".boisson-check:checked")]
        .map(cb => cb.value);
    if (boissonsChoisies.length === 0) {
        alert("Veuillez sélectionner au moins une boisson.");
        return;
    }

    const nbPersonnes = parseInt(nbPersonnesInput.value);
    const menu = menus[menuKey];

    if (isNaN(nbPersonnes) || nbPersonnes <= 0) {
        alert("Veuillez entrer un nombre de personnes valide.");
        return;
    }

    if (nbPersonnes < menu.minPersonnes) {
        alert(`Le minimum de personnes pour ce menu est de ${menu.minPersonnes} personnes.`);
        return;
    }

    if (nbPersonnes > 300) {
    alert("Le nombre maximum de personnes est de 300.");
    return;
}


    const choixCommande = {
        menu: menu.nom,
        prixParPersonne: menu.prix,
        entree,
        plat,
        dessert,
        boissons: boissonsChoisies,
        nbPersonnes,
        prixBase: prixBaseInput.value,
        remise: remiseInput.value,
        montantRemise: montantRemiseInput.value,
        prixTotal: prixTotalInput.value
    };

    sessionStorage.setItem("choixCommande", JSON.stringify(choixCommande));

    window.history.pushState({}, "", "/confirmationCommande");
    LoadContentPage();
});
