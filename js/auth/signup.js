// Implémenter le Javascript
const inputName = document.getElementById("NameInput");
const inputSurname = document.getElementById("SurnameInput");
const inputAdresse = document.getElementById("AdresseInput");
const inputCity = document.getElementById("CityInput");
const inputZip = document.getElementById("ZipInput");
const inputEmail = document.getElementById("EmailInput");
const inputPhone = document.getElementById("PhoneInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidatePassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");

inputName.addEventListener("keyup", validateForm);
inputSurname.addEventListener("keyup", validateForm);
inputAdresse.addEventListener("keyup", validateForm);
inputCity.addEventListener("keyup", validateForm);
inputZip.addEventListener("keyup", validateForm);
inputEmail.addEventListener("keyup", validateForm);
inputPhone.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidatePassword.addEventListener("keyup", validateForm);

// Fonction qui permet de valider l'ensemble du formulaire
function validateForm() {
    const nameOk = validateRequired(inputName);
    const surnameOk = validateRequired(inputSurname);
    const adresseOk = validateRequired(inputAdresse);
    const cityOk = validateRequired(inputCity);
    const zipOk = validateZipCode(inputZip);
    const emailOk = validateEmail(inputEmail);
    const passwordOk = validatePasswords(inputPassword, inputValidatePassword); // 👈 Appel corrigé
    const phoneOk = validatePhone(inputPhone);

    // Active/désactive le bouton en fonction de la validation
    btnValidation.disabled = !(nameOk && surnameOk && adresseOk && cityOk && zipOk && emailOk && passwordOk && phoneOk);
}

// Fonction pour valider les champs requis
function validateRequired(input) {
    if (input.value.trim() !== '') {
        input.classList.add("is-valid");
        input.classList.remove('is-invalid');
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add('is-invalid');
        return false;
    }
}

// Fonction pour valider le code postal (5 chiffres)
function validateZipCode(input) {
    const zip = input.value.trim();
    if (/^\d{5}$/.test(zip)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction pour valider l'email
function validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction UNIFIÉE pour valider les mots de passe (complexité + correspondance)
function validatePasswords(passwordInput, confirmPasswordInput) {
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // 1. Vérifie que les deux champs ne sont pas vides
    if (password === '' || confirmPassword === '') {
        passwordInput.classList.remove("is-valid");
        passwordInput.classList.add("is-invalid");
        confirmPasswordInput.classList.remove("is-valid");
        confirmPasswordInput.classList.add("is-invalid");
        return false;
    }

    // 2. Vérifie que les mots de passe correspondent
    if (password !== confirmPassword) {
        passwordInput.classList.remove("is-valid");
        passwordInput.classList.add("is-invalid");
        confirmPasswordInput.classList.remove("is-valid");
        confirmPasswordInput.classList.add("is-invalid");
        return false;
    }

    // 3. Vérifie la complexité du mot de passe (8+ caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordInput.classList.remove("is-valid");
        passwordInput.classList.add("is-invalid");
        confirmPasswordInput.classList.remove("is-valid");
        confirmPasswordInput.classList.add("is-invalid");
        return false;
    }

    // Si tout est valide
    passwordInput.classList.add("is-valid");
    passwordInput.classList.remove("is-invalid");
    confirmPasswordInput.classList.add("is-valid");
    confirmPasswordInput.classList.remove("is-invalid");
    return true;
}

// Fonction pour valider le téléphone
function validatePhone(input) {
    const phone = input.value.replace(/\D/g, '');
    if (/^\d{10}$/.test(phone)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}
