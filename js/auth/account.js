document.addEventListener("DOMContentLoaded", () => {
    // 1. Récupération des éléments du formulaire
    const nameInput = document.getElementById("NameInput");
    const surnameInput = document.getElementById("SurnameInput");
    const adresseInput = document.getElementById("AdresseInput");
    const villeInput = document.getElementById("VilleInput");
    const zipInput = document.getElementById("ZipInput");
    const allergieInput = document.getElementById("AllergieInput");
    const nbConvivesInput = document.getElementById("NbConvivesInput");
    const phoneInput = document.getElementById("PhoneInput");
    
    const accountForm = document.querySelector("form");
    const btnDeleteAccount = document.querySelector(".btn-danger");

    // 2. Charger les données de l'utilisateur connecté
    loadUserProfile();

    async function loadUserProfile() {
        try {
            // Remplacez l'URL si votre endpoint pour récupérer le profil est différent
            const response = await fetch("http://localhost:8000/api/account/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Si vous utilisez un token JWT / Session :
                    // "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // Non authentifié -> redirection vers la connexion
                    window.location.replace("/login");
                    return;
                }
                throw new Error("Erreur lors de la récupération des données utilisateur");
            }

            const user = await response.json();

            // Remplissage des champs du formulaire
            nameInput.value = user.nom || "";
            surnameInput.value = user.prenom || "";
            adresseInput.value = user.adresse || "";
            villeInput.value = user.ville || "";
            zipInput.value = user.codePostal || "";
            allergieInput.value = user.allergies || "";
            nbConvivesInput.value = user.nbConvives || "";
            phoneInput.value = user.telephone || "";

        } catch (error) {
            console.error("🔴 Erreur :", error);
            alert("Impossible de charger les informations du compte.");
        }
    }

    // 3. Mettre à jour les informations de l'utilisateur
    accountForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Empêcher le rechargement de la page

        const updatedUser = {
            nom: nameInput.value.trim(),
            prenom: surnameInput.value.trim(),
            adresse: adresseInput.value.trim(),
            ville: villeInput.value.trim(),
            codePostal: zipInput.value.trim(),
            allergies: allergieInput.value.trim(),
            nbConvives: parseInt(nbConvivesInput.value) || 0,
            telephone: phoneInput.value.trim()
        };

        try {
            // Remplacez l'URL selon votre route Symfony (PUT ou PATCH)
            const response = await fetch("http://localhost:8000/api/account/me", {
                method: "PUT", // ou "PATCH"
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser)
            });

            if (response.ok) {
                alert("✅ Vos informations ont été mises à jour avec succès !");
            } else {
                const errorData = await response.json();
                alert(`❌ Erreur lors de la mise à jour : ${errorData.message || "Echec de l'opération"}`);
            }

        } catch (error) {
            console.error("🔴 Erreur réseau :", error);
            alert("Erreur de connexion avec le serveur.");
        }
    });

    // 4. Suppression de compte (Optionnel)
    if (btnDeleteAccount) {
        btnDeleteAccount.addEventListener("click", async () => {
            const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
            
            if (confirmDelete) {
                try {
                    const response = await fetch("http://localhost:8000/api/account/me", {
                        method: "DELETE"
                    });

                    if (response.ok) {
                        alert("Votre compte a été supprimé avec succès.");
                        window.location.replace("/");
                    } else {
                        alert("Erreur lors de la suppression du compte.");
                    }
                } catch (error) {
                    console.error("🔴 Erreur :", error);
                }
            }
        });
    }
});