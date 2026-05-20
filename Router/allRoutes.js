import Route from "./Route.js";


//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []),
    new Route("/nosmenus", "Nos Menus", "/pages/nosmenus.html", []),
    new Route("/MenuJoyeuxNoelIndien", "Menu Joyeux Noel Indien", "/pages/MenuJoyeuxNoelIndien.html", []),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "/js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"], "/js/auth/signup.js"),
    new Route("/account", "Mon Compte", "/pages/auth/account.html", ["client", "admin", "employe"]),
    new Route("/editPassword", "Changement mot de passe", "/pages/auth/editPassword.html", ["client", "admin", "employe"]),
    new Route("/allCommandes", "Vos commandes", "/pages/commandes/allCommandes.html", ["client"]),
    new Route("/infoCommande", "Etape 1 : Commande", "/pages/commandes/infoCommande.html", [], "/js/order/infoCommande.js"),
    new Route("/choixCommande", "Etape 2 : Commande", "/pages/commandes/choixCommande.html", []),
    new Route("/confirmationCommande", "Etape 3 : Confirmation Commande", "/pages/commandes/confirmationCommande.html", []),
    new Route("/contact", "Contactez-nous", "/pages/contact.html", []),
    new Route("/accountAdmin", "Mon Compte Administrateur", "/pages/auth/accountAdmin.html", ["admin"]),
    new Route("/accountEmploye", "Mon Compte Employe", "/pages/auth/accountEmploye.html", ["employe"]),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Vite & Gourmand";