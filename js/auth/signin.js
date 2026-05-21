const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click", checkCredentials);

async function checkCredentials() {
    // Nettoyer les anciens messages d'erreur
    mailInput.classList.remove("is-invalid");
    passwordInput.classList.remove("is-invalid");

    const email = mailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validation simple
    if (!email || !password) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    try {
        // 🔗 Appeler l'API Symfony
        const response = await fetch('http://localhost:8000/api/utilisateurs/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            // ✅ Connexion réussie
            alert("✅ Vous êtes connecté !");

            // 🎫 Utiliser ta fonction setToken() existante
            const token = data.token || "token_" + data.id;
            setToken(token); // ← Utilise ta fonction globale

            // 🍪 Stocker le rôle (utilise ta fonction globale)
            setCookie(RoleCookieName, data.role || "client", 7); // ← Utilise ta fonction globale

            // 🔄 Rediriger
            window.location.replace('/');
        } else {
            // ❌ Erreur de connexion
            mailInput.classList.add("is-invalid");
            passwordInput.classList.add("is-invalid");
            alert("❌ Email ou mot de passe incorrect");
        }
    } catch (error) {
        console.error("🔴 Erreur réseau :", error);
        alert("Erreur de connexion au serveur. Vérifiez votre connexion.");
    }
}
