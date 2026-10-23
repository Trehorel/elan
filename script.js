const sports = [
  {
    nom: "Course",
    accroche: "Un pied devant l’autre, partout.",
    description: "Il suffit d’une paire de chaussures. Idéal pour progresser en endurance et se vider la tête.",
    jauges: [["Endurance", 90], ["Force", 45], ["Souplesse", 30]],
    seance: "Débutant : 1 min de course, 2 min de marche, 8 fois. 3 fois par semaine."
  },
  {
    nom: "Natation",
    accroche: "Tout le corps, sans impact.",
    description: "L’eau porte le corps : parfaite pour ménager les articulations tout en travaillant le souffle.",
    jauges: [["Endurance", 85], ["Force", 65], ["Souplesse", 70]],
    seance: "Débutant : 6 × 50 m en alternant crawl et dos, 30 s de pause entre chaque."
  },
  {
    nom: "Vélo",
    accroche: "De la distance sans forcer.",
    description: "On avance loin à son rythme, en solo ou en groupe, en ville comme sur les petites routes.",
    jauges: [["Endurance", 90], ["Force", 60], ["Souplesse", 35]],
    seance: "Débutant : 45 min à allure de conversation, sur un parcours plat."
  },
  {
    nom: "Football",
    accroche: "L’effort qui passe tout seul.",
    description: "Sprints, changements de direction et esprit d’équipe : on oublie qu’on s’entraîne.",
    jauges: [["Endurance", 75], ["Force", 55], ["Souplesse", 50]],
    seance: "Débutant : échauffement, jeu à 5 contre 5 sur petit terrain, 2 × 15 min."
  },
  {
    nom: "Tennis",
    accroche: "Vivacité et précision.",
    description: "Un sport de duel qui travaille les réflexes, les appuis et la concentration.",
    jauges: [["Endurance", 65], ["Force", 50], ["Souplesse", 60]],
    seance: "Débutant : 10 min d’échanges en mini-tennis, puis 20 min de jeu libre."
  }
];

const onglets = document.querySelector(".tabs");
const panneau = document.getElementById("panel");

// Création des boutons d'onglets
sports.forEach((sport, i) => {
  const bouton = document.createElement("button");
  bouton.type = "button";
  bouton.setAttribute("role", "tab");
  bouton.textContent = sport.nom;
  bouton.addEventListener("click", () => afficher(i));
  onglets.appendChild(bouton);
});

// Affichage d'un sport dans le panneau
function afficher(i) {
  const sport = sports[i];

  [...onglets.children].forEach((bouton, j) => {
    bouton.setAttribute("aria-selected", j === i);
  });

  panneau.innerHTML = `
    <div>
      <h3>${sport.nom}</h3>
      <p><strong>${sport.accroche}</strong></p>
      <p>${sport.description}</p>
      <div class="session">
        <strong>Séance type</strong>
        ${sport.seance}
      </div>
    </div>
    <div>
      ${sport.jauges.map(([label, valeur]) => `
        <div class="meter">
          <label><span>${label}</span><span>${valeur} %</span></label>
          <div class="bar"><i data-w="${valeur}"></i></div>
        </div>
      `).join("")}
    </div>
  `;

  // Double requestAnimationFrame pour que la jauge s'anime depuis 0
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      panneau.querySelectorAll("i").forEach((barre) => {
        barre.style.width = barre.dataset.w + "%";
      });
    });
  });
}

afficher(0);

// En-tête qui se réduit au défilement
const entete = document.querySelector("header");
addEventListener("scroll", () => {
  entete.classList.toggle("small", scrollY > 40);
}, { passive: true });
