import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/nosmenus", "Nos Menus", "/pages/nosmenus.html"),
    new Route("/MenuJoyeuxNoelIndien", "Menu Joyeux Noel Indien", "/pages/MenuJoyeuxNoelIndien.html"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Vite & Gourmand";