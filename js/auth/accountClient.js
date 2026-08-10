// On exécute directement sans DOMContentLoaded (adapté au routeur SPA)
initAccountPage();

async function initAccountPage() {
    // 1. Récupération des éléments du formulaire
    const nameInput = document.getElementById("NameInput");
    const surnameInput = document.getElementById("SurnameInput");
    const adresseInput = document.getElementById("AdresseInput");
    const villeInput = document.getElementById("VilleInput");
    const paysInput = document.getElementById("PaysInput");
    const phoneInput = document.getElementById("PhoneInput");

    const accountForm = document.querySelector("form");
    const btnDeleteAccount = document.querySelector(".btn-danger");

    // 2. Récupérer le token dans le localStorage (ou sessionStorage selon votre config)
    const token = getToken(); // Ou getCookie("accesstoken"); selon vos fonctions dans script.js

    if (!token) {
        console.warn("⚠️ Aucun token trouvé dans les cookies, redirection vers /signin");
        window.location.replace("/signin"); // Redirige vers /signin (conforme à votre allRoutes.js)
        return;
    }

    loadUserProfile();

    // 3. Charger les données de l'utilisateur connecté
    async function loadUserProfile() {
        try {
            const response = await fetch("http://localhost:8000/api/account/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token // <-- UTILISATION DE X-AUTH-TOKEN
                }
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    alert("Session expirée ou non autorisée.");
                    window.location.replace("/signin");
                    return;
                }
                throw new Error("Erreur lors de la récupération des données utilisateur");
            }

            const user = await response.json();
            console.log("Données utilisateur BDD reçues :", user);

            // Mapping exact avec l'Entity PHP Utilisateur
            if (nameInput) nameInput.value = user.nom || "";
            if (surnameInput) surnameInput.value = user.prenom || "";
            if (adresseInput) adresseInput.value = user.adressePostale || "";
            if (villeInput) villeInput.value = user.ville || "";
            if (paysInput) paysInput.value = user.pays || "";
            if (phoneInput) phoneInput.value = user.telephone || "";

        } catch (error) {
            console.error("🔴 Erreur :", error);
        }
    }

    await loadUserProfile();

    // 4. Mettre à jour les informations de l'utilisateur
    if (accountForm) {
        accountForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const updatedUser = {
                nom: nameInput ? nameInput.value.trim() : null,
                prenom: surnameInput ? surnameInput.value.trim() : null,
                adressePostale: adresseInput ? adresseInput.value.trim() : null,
                ville: villeInput ? villeInput.value.trim() : null,
                pays: paysInput ? paysInput.value.trim() : null,
                telephone: phoneInput ? phoneInput.value.trim() : null
            };

            try {
                const response = await fetch("http://localhost:8000/api/account/me", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-AUTH-TOKEN": token // <-- UTILISATION DE X-AUTH-TOKEN
                    },
                    body: JSON.stringify(updatedUser)
                });

                if (response.ok) {
                    alert("✅ Vos informations ont été mises à jour avec succès !");
                } else {
                    const errorData = await response.json();
                    alert(`❌ Erreur lors de la mise à jour : ${errorData.message || "Échec de l'opération"}`);
                }
            } catch (error) {
                console.error("🔴 Erreur réseau :", error);
            }
        });
    }

    // 5. Suppression de compte
    if (btnDeleteAccount) {
        btnDeleteAccount.addEventListener("click", async () => {
            if (confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
                try {
                    const response = await fetch("http://localhost:8000/api/account/me", {
                        method: "DELETE",
                        headers: {
                            "X-AUTH-TOKEN": token
                        }
                    });

                    if (response.ok) {
                        localStorage.removeItem("token");
                        alert("Votre compte a été supprimé.");
                        window.location.replace("/");
                    }
                } catch (error) {
                    console.error("🔴 Erreur lors de la suppression :", error);
                }
            }
        });
    }
}