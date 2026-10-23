const sports = [
  {
    nom: "Course",
    accroche: "Un pied devant l’autre, partout.",
    description: "Il suffit d’une paire de chaussures. Idéal pour progresser en endurance et se vider la tête.",
    jauges: [["Endurance", 90], ["Force", 45], ["Souplesse", 30]]
  },
  {
    nom: "Natation",
    accroche: "Tout le corps, sans impact.",
    description: "L’eau porte le corps : parfaite pour ménager les articulations tout en travaillant le souffle.",
    jauges: [["Endurance", 85], ["Force", 65], ["Souplesse", 70]]
  },
  {
    nom: "Vélo",
    accroche: "De la distance sans forcer.",
    description: "On avance loin à son rythme, en solo ou en groupe, en ville comme sur les petites routes.",
    jauges: [["Endurance", 90], ["Force", 60], ["Souplesse", 35]]
  },
  {
    nom: "Football",
    accroche: "L’effort qui passe tout seul.",
    description: "Sprints, changements de direction et esprit d’équipe : on oublie qu’on s’entraîne.",
    jauges: [["Endurance", 75], ["Force", 55], ["Souplesse", 50]]
  },
  {
    nom: "Tennis",
    accroche: "Vivacité et précision.",
    description: "Un sport de duel qui travaille les réflexes, les appuis et la concentration.",
    jauges: [["Endurance", 65], ["Force", 50], ["Souplesse", 60]]
  }
];

// Séances par sport (même ordre que ci-dessus) : [texte, durée] pour débutant, intermédiaire, confirmé
const niveaux = [
  [
    ["1 min de course, 2 min de marche, 8 fois. 3 fois par semaine.", "30 min"],
    ["30 min d’endurance, puis 6 × 30 s rapides en fin de séance.", "45 min"],
    ["10 × 400 m à allure 5 km, 1 min de récupération.", "60 min"]
  ],
  [
    ["6 × 50 m en alternant crawl et dos, 30 s de pause.", "25 min"],
    ["8 × 100 m crawl, 20 s de pause, en gardant le même rythme.", "45 min"],
    ["4 × (200 m, 100 m, 50 m) en accélérant, 15 s de pause.", "60 min"]
  ],
  [
    ["Parcours plat à allure de conversation.", "45 min"],
    ["3 côtes de 3 min à effort soutenu, récupération en descente.", "1 h 30"],
    ["4 × 8 min à allure soutenue, 4 min de récupération.", "2 h"]
  ],
  [
    ["Échauffement, jeu à 5 contre 5 sur petit terrain, 2 × 15 min.", "40 min"],
    ["Circuit de passes, puis match à 7 contre 7, 2 × 25 min.", "70 min"],
    ["8 sprints de 20 m, puis match à 11, 2 × 30 min.", "90 min"]
  ],
  [
    ["10 min de mini-tennis, puis 20 min de jeu libre.", "40 min"],
    ["15 min d’échanges de fond de court, puis un set à points.", "60 min"],
    ["20 services d’entraînement, puis 2 sets complets.", "90 min"]
  ]
];

let sportActuel = 0;
let niveauActuel = 0;

const onglets = document.querySelector(".tabs");
const panneau = document.getElementById("panel");

// Création des boutons d'onglets (navigation aux flèches du clavier)
sports.forEach((sport, i) => {
  const bouton = document.createElement("button");
  bouton.type = "button";
  bouton.setAttribute("role", "tab");
  bouton.textContent = sport.nom;
  bouton.addEventListener("click", () => afficher(i));
  bouton.addEventListener("keydown", (e) => {
    const pas = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (pas) {
      const suivant = (i + pas + sports.length) % sports.length;
      afficher(suivant);
      onglets.children[suivant].focus();
    }
  });
  onglets.appendChild(bouton);
});

// Affichage d'un sport dans le panneau
function afficher(i) {
  sportActuel = i;
  const sport = sports[i];
  const [texte, duree] = niveaux[i][niveauActuel];

  [...onglets.children].forEach((bouton, j) => {
    bouton.setAttribute("aria-selected", j === i);
  });

  panneau.innerHTML = `
    <div>
      <h3>${sport.nom}</h3>
      <p><strong>${sport.accroche}</strong></p>
      <p>${sport.description}</p>
      <div class="lvls" role="group" aria-label="Niveau">
        ${["Débutant", "Intermédiaire", "Confirmé"].map((nom, k) => `
          <button type="button" data-l="${k}" aria-pressed="${k === niveauActuel}">${nom}</button>
        `).join("")}
      </div>
      <div class="session">
        <strong>Séance type · ${duree}</strong>
        ${texte}
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

  // Changement de niveau : on réaffiche le même sport
  panneau.querySelectorAll(".lvls button").forEach((bouton) => {
    bouton.addEventListener("click", () => {
      niveauActuel = Number(bouton.dataset.l);
      afficher(sportActuel);
    });
  });

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
