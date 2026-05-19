import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/nosmenus", "Nos Menus", "/pages/nosmenus.html"),
    new Route("/MenuJoyeuxNoelIndien", "Menu Joyeux Noel Indien", "/pages/MenuJoyeuxNoelIndien.html"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html"),
    new Route("/account", "Mon Compte", "/pages/auth/account.html"),
    new Route("/editPassword", "Changement mot de passe", "/pages/auth/editPassword.html"),
    new Route("/allCommandes", "Vos commandes", "/pages/commandes/allCommandes.html"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Vite & Gourmand";