(function () {

    const cards        = document.querySelectorAll("#listeMenus .card[data-theme]");
    const themeRadios  = document.querySelectorAll("input[name='theme']");
    const budgetRange  = document.getElementById("budgetRange");
    const budgetLabel  = document.getElementById("budgetLabel");
    const prixMax      = document.getElementById("prixMax");
    const prixMin      = document.getElementById("prixMin");
    const vegetarien   = document.getElementById("vegetarien");
    const listeMenus   = document.getElementById("listeMenus");

    budgetRange.addEventListener("input", function () {
        budgetLabel.textContent = "0 € à " + this.value + " €";
        filtrer();
    });

    themeRadios.forEach(radio => radio.addEventListener("change", filtrer));
    prixMax.addEventListener("change", filtrer);
    prixMin.addEventListener("change", filtrer);
    vegetarien.addEventListener("change", filtrer);

    function filtrer() {
        const themeSelectionne = document.querySelector("input[name='theme']:checked")?.value || "tous";
        const budgetMax        = parseInt(budgetRange.value);
        const vegetarienCoche  = vegetarien.checked;

        let cardsVisibles = [];

        cards.forEach(card => {
            const theme  = card.dataset.theme;
            const prix   = parseInt(card.dataset.prix);
            const isVege = card.dataset.vegetarien === "true";

            let visible = true;

            if (themeSelectionne !== "tous" && theme !== themeSelectionne) visible = false;
            if (prix > budgetMax) visible = false;
            if (vegetarienCoche && !isVege) visible = false;

            card.style.display = visible ? "" : "none";
            if (visible) cardsVisibles.push({ card, prix });
        });

        if (prixMin.checked || prixMax.checked) {
            const ordre = prixMin.checked ? 1 : -1;
            cardsVisibles.sort((a, b) => (a.prix - b.prix) * ordre);
            cardsVisibles.forEach(item => listeMenus.appendChild(item.card));
        }

        let msgVide = document.getElementById("msgVide");
        if (cardsVisibles.length === 0) {
            if (!msgVide) {
                msgVide = document.createElement("p");
                msgVide.id = "msgVide";
                msgVide.className = "text-muted text-center mt-4 w-100";
                msgVide.textContent = "😔 Aucun menu ne correspond à vos critères.";
                listeMenus.appendChild(msgVide);
            }
        } else {
            if (msgVide) msgVide.remove();
        }
    }
})();