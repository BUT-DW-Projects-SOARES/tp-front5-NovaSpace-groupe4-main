// Recherche statique NovaSpace : lit ?q= de l'URL et filtre un index local.

const INDEX = [
    { nom: "La Terre", mots: ["terre", "planete bleue", "ocean", "vie"], desc: "La planète où nous vivons : océans, continents et une atmosphère respirable.", page: "/src/pages/terre.html" },
    { nom: "Jupiter", mots: ["jupiter", "geante gazeuse", "grande tache rouge", "nasa goddard", "satellites"], desc: "La géante gazeuse, plus massive que toutes les autres planètes réunies, et son mystérieuse Grande Tache rouge.", page: "/src/pages/jupiter.html" },
    { nom: "Mars", mots: ["mars", "planete rouge", "olympus mons", "missions"], desc: "La planète rouge, abrite le plus haut volcan du système solaire et cible des futures missions habitées.", page: "/src/pages/mars.html" },
    { nom: "Mercure", mots: ["mercure", "proche du soleil", "petite", "rapide"], desc: "La plus petite planète, la plus proche du Soleil et la plus rapide en orbite." },
    { nom: "Vénus", mots: ["venus", "plus chaude", "acide sulfurique", "retour"], desc: "La plus chaude du système solaire, sous une épaisse couche de nuages d'acide sulfurique." },
    { nom: "Saturne", mots: ["saturne", "anneaux", "glace", "roche"], desc: "Célèbre pour ses anneaux de glace et de roche, la plus grande planète après Jupiter." },
    { nom: "Uranus", mots: ["uranus", "geante de glace", "incline", "cote"], desc: "Une géante de glace qui évolue sur le côté, avec des anneaux fins et très inclinés." },
    { nom: "Neptune", mots: ["neptune", "lointaine", "vents", "bleue"], desc: "La planète la plus lointaine, balayée par les vents les plus rapides du système solaire." },
    { nom: "Contact", mots: ["contact", "equipe", "message"], desc: "Écrire à l'équipe NovaSpace : questions, erreurs, difficultés d'accessibilité.", page: "/src/pages/contact.html" },
    { nom: "Plan du site", mots: ["plan", "carte", "navigation", "pages"], desc: "Retrouvez toutes les pages du site et les planètes à venir.", page: "/src/pages/plan.html" },
    { nom: "Accessibilité", mots: ["accessibilite", "rgaa", "wcag", "conformite", "defenseur"], desc: "Déclaration d'accessibilité du site et modalités de contact.", page: "/src/pages/accessibilite.html" },
];

// Normalise minuscules + accents pour la comparaison
const fold = (texte) =>
    texte
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

const correspond = (entree, mots) => {
    const texte = fold(`${entree.nom} ${entree.mots.join(" ")} ${entree.desc}`);
    return mots.every((mot) => texte.includes(mot));
};

const creerCarte = (entree) => {
    const article = document.createElement("article");
    article.className = "rounded-2xl border border-line bg-panel p-5";

    const titre = document.createElement("h3");
    titre.className = "text-lg font-semibold tracking-tight";
    titre.textContent = entree.nom;

    const description = document.createElement("p");
    description.className = "mt-2 leading-relaxed text-muted";
    description.textContent = entree.desc;

    let pied;
    if (entree.page) {
        pied = document.createElement("a");
        pied.href = entree.page;
        pied.className = "mt-3 inline-block font-semibold text-earth underline underline-offset-4";
        pied.textContent = "Lire la page";
    } else {
        pied = document.createElement("span");
        pied.className = "mt-3 inline-block text-sm text-muted";
        pied.textContent = "Page en préparation";
    }

    article.append(titre, description, pied);
    return article;
};

const zone = document.querySelector("#recherche-resultats");
const compteur = document.querySelector("#recherche-compteur");
const requete = new URLSearchParams(window.location.search).get("q")?.trim() ?? "";

if (!requete) {
    compteur.textContent = "Comment chercher ?";
    const aide = document.createElement("p");
    aide.className = "leading-relaxed text-muted";
    aide.textContent =
        "Utilise la barre de recherche du menu pour chercher une planète ou une page du site (ex. : Saturne, anneau, accessibilité).";
    zone.appendChild(aide);
} else {
    const mots = requete.toLowerCase().split(/\s+/).filter(Boolean).map(fold);
    const resultats = INDEX.filter((entree) => correspond(entree, mots));
    compteur.textContent = resultats.length
        ? `${resultats.length} résultat${resultats.length > 1 ? "s" : ""} pour « ${requete} »`
        : `Aucun résultat pour « ${requete} »`;

    if (resultats.length) {
        resultats.forEach((entree) => zone.appendChild(creerCarte(entree)));
    } else {
        const aide = document.createElement("p");
        aide.className = "leading-relaxed text-muted";
        aide.textContent = "Essaie un autre mot (ex. : Jupiter, anneau, accessibilité), ou consulte le plan du site pour voir toutes les pages.";
        const lien = document.createElement("a");
        lien.href = "/src/pages/plan.html";
        lien.className = "mt-3 inline-block font-semibold text-earth underline underline-offset-4";
        lien.textContent = "Voir le plan du site";
        aide.append(document.createTextNode(""), lien);
        zone.appendChild(aide);
    }
}
