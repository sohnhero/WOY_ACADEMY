import { Scene, CharacterKey } from './narrativeN01'; // inheriting types

export const NARRATIVE_N02: Scene[] = [
  {
    id: 'n02',
    title: "C'est quoi un marché financier ?",
    beats: [
    // ════════════════════════════════════════════════════════════════════════
    // S0 — MISE EN SCÈNE
    // ════════════════════════════════════════════════════════════════════════
    { id: 's0intro', type: 'big-moment', text: "TROIS JOURS PLUS TARD", subText: "Module N0.2 : Les Marchés" },
    { 
      id: 's0b1', 
      type: 'narration', 
      text: "Amadou a mis ses 40 000 FCFA à la banque. 2,5% par an. Il reçoit un message de son oncle Moussa :", 
      subText: "Son premier investissement 'officiel'." 
    },
    { 
      id: 's0b2', 
      type: 'dialogue', 
      character: 'MOUSSA',
      text: "« Sonatel a monté de 8% cette semaine. La BRVM est en forme. »", 
      subText: "Message de l'Oncle Moussa." 
    },
    { 
      id: 's0b3', 
      type: 'narration', 
      text: "Amadou ne comprend pas. Qu'est-ce que la BRVM ? Pourquoi le prix de Sonatel monte ? Qui décide ?", 
      subText: "Tout lui semble abstrait." 
    },
    { 
      id: 's0b4', 
      type: 'dialogue', 
      character: 'GASSAMA', 
      text: "« Bitcoin bro, ça monte toujours. Tu devrais tout mettre là-dedans. »", 
      subText: "Gassama lui envoie un message au même moment." 
    },
    { 
      id: 's0b5', 
      type: 'narration', 
      text: "Deux conseils. Deux marchés. Aucune explication.", 
      subText: "Amadou repense au marché de Sandaga. Quelque chose commence à faire sens." 
    },
    { 
      id: 's0b6', 
      type: 'narration', 
      text: "Qui fixe le prix de Sonatel à la BRVM ? Qui fixe le prix du Bitcoin ? Est-ce la même logique ?", 
      subText: "Il doit décider quoi faire de son argent." 
    },

    // ════════════════════════════════════════════════════════════════════════
    // S1 — SIMULATION (Choix initial)
    // ════════════════════════════════════════════════════════════════════════
    { 
      id: 's1choice', 
      type: 'interactive', 
      interactiveType: 'CHOICE_SYSTEM', 
      text: "Choisis une direction pour tes 40 000 FCFA", 
      subText: "Aucune étiquette n'indique laquelle est 'bonne'.",
      interactiveData: [
        { id: 'A', title: 'SONATEL (BRVM)', desc: "L'oncle Moussa dit que ça monte. Sonatel est une vraie entreprise.", icon: 'TrendingUp', accent: 'bg-green-600' },
        { id: 'B', title: 'BITCOIN', desc: "Gassama dit que \"ça monte toujours.\"", icon: 'Bitcoin', accent: 'bg-yellow-500' },
        { id: 'C', title: 'OBSERVER', desc: "Je ne comprends pas encore pourquoi les prix bougent.", icon: 'HelpCircle', accent: 'bg-white/10' }
      ]
    },

    // ════════════════════════════════════════════════════════════════════════
    // S2 — RÉVÉLATION
    // ════════════════════════════════════════════════════════════════════════
    // Visual Reveal of the market logics via narrative blocks
    { id: 's2intro', type: 'narration', text: "Le marché de Sandaga vs la Bourse.", subText: "Les mêmes lois s'appliquent partout." },
    { 
      id: 's2b1', 
      type: 'dialogue', 
      character: 'FATOU',
      text: "Au marché de Sandaga : Ce matin, 5 acheteurs se battent pour le dernier wax. Je monte mon prix. C'est normal. Personne ne l'a décidé.", 
      subText: "L'offre et la demande ont décidé." 
    },
    { 
      id: 's2b2', 
      type: 'narration', 
      text: "À la BRVM : Sonatel publie +22% de bénéfices. Des milliers d'investisseurs veulent l'action. Plus d'acheteurs que de vendeurs → le prix monte.", 
      subText: "L'offre et la demande ont décidé." 
    },
    { 
      id: 's2b3', 
      type: 'narration', 
      text: "Sur Bitcoin : BlackRock demande un ETF. Des millions d'institutionnels arrivent. Nouveaux acheteurs → BTC passe de 45 000$ à 73 000$.", 
      subText: "L'offre et la demande ont décidé." 
    },
    { 
      id: 's2b4', 
      type: 'narration', 
      text: "Le cacao ivoirien a fait ×4 en un an (2024). L'offre a baissé (climat). La demande n'a pas changé. Ce n'était pas Abidjan qui décidait.", 
      subText: "L'offre et la demande. Toujours." 
    },
    { 
      id: 's2b5', 
      type: 'big-moment', 
      text: "PLUS D'ACHETEURS → PRIX MONTE\nPLUS DE VENDEURS → PRIX BAISSE", 
      subText: "La loi fondamentale de tout marché." 
    },
    // We add a bridge beat to transition
    { 
      id: 's2b6', 
      type: 'narration', 
      text: "L'oncle Moussa pense que la BRVM et Bitcoin sont deux mondes séparés. Djéli WÔY sait que c'est le même marché de Sandaga.", 
      subText: "Même loi. Actifs différents." 
    },

    // ════════════════════════════════════════════════════════════════════════
    // S3 — DJÉLI WÔY
    // ════════════════════════════════════════════════════════════════════════
    { 
      id: 's3intro', 
      type: 'narration', 
      text: "La Cour · Médina.", 
      subText: "Amadou rentre du marché. Il a vu Fatou négocier ses tissus." 
    },
    { 
      id: 's3b1', 
      type: 'dialogue', 
      character: 'AMADOU', 
      text: "« Je crois que j'ai compris. Le prix du mil au marché de Sandaga, c'est pareil que le Bitcoin sur Binance. L'offre et la demande. »", 
      subText: "Djéli WÔY sourit doucement." 
    },
    { 
      id: 's3b2', 
      type: 'dialogue', 
      character: 'DJELI', 
      text: "« Le prix du mil à Sandaga n'est pas fixé par décret. Ni par le gouvernement, ni par la banque. Il est fixé par combien de personnes ont faim et combien de sacs il y a. »", 
      subText: "" 
    },
    { 
      id: 's3b3', 
      type: 'dialogue', 
      character: 'DJELI', 
      text: "« Bitcoin, c'est pareil. La BRVM, c'est pareil. L'or, c'est pareil. La différence est dans ce qu'on achète et pourquoi. Pas dans la loi qui le gouverne. »", 
      subText: "Qui est le plus nombreux aujourd'hui ?" 
    },
    { 
      id: 's3b4', 
      type: 'dialogue', 
      character: 'GASSAMA', 
      text: "« Bitcoin bro, ça monte toujours. Parce que c'est Bitcoin ! »", 
      subText: "Gassama surgit, fidèle à lui-même." 
    },
    { 
      id: 's3b5', 
      type: 'dialogue', 
      character: 'AMADOU', 
      text: "« Plus d'acheteurs que de vendeurs. Quand la Fed a monté ses taux à 5,25% en 2022, BTC a perdu 65%. Ça monte... sauf quand la macro dit non. »", 
      subText: "Gassama reste silencieux." 
    },

    // ════════════════════════════════════════════════════════════════════════
    // S5 — EXERCICES INTERACTIFS
    // ════════════════════════════════════════════════════════════════════════
    // Asset Match Matrix
    { 
      id: 's5a1', 
      type: 'narration', 
      text: "Il existe 5 grandes catégories de marchés. Sauras-tu y classer ces 10 actifs mondiaux ?", 
      subText: "EXERCICE : CLASSIFICATION" 
    },
    { 
      id: 's5a2', 
      type: 'interactive', 
      interactiveType: 'ASSET_MATCH', 
      text: "Classe les 10 actifs", 
      subText: "Glisse et dépose dans les 5 colonnes." 
    },
    
    // News Impact / Demand predictor
    { 
      id: 's5b1', 
      type: 'narration', 
      text: "Les informations (news) modifient le rapport de force entre acheteurs et vendeurs. Testons ton instinct.", 
      subText: "EXERCICE : OFFRE ET DEMANDE" 
    },
    { 
      id: 's5b2', 
      type: 'interactive', 
      interactiveType: 'NEWS_SWIPE', 
      text: "Évalue l'impact de ces 5 news sur le prix du Bitcoin.", 
      subText: "Prix monte ? Prix baisse ? Neutre ?" 
    },

    // Liquidity Urgency
    { 
      id: 's5c1', 
      type: 'narration', 
      text: "L'offre et la demande c'est bien, mais que se passe-t-il quand tu as besoin de vendre EN URGENCE ?", 
      subText: "EXERCICE : LA LIQUIDITÉ" 
    },
    { 
      id: 's5c2', 
      type: 'interactive', 
      interactiveType: 'LIQUIDITY_CHOICE', 
      text: "Urgence médicale : tu as besoin de 500 000 FCFA dans 1 heure.", 
      subText: "Lequel de ces actifs te sauvera ?" 
    },

    // ════════════════════════════════════════════════════════════════════════
    // S6 — QUIZ (5 questions)
    // ════════════════════════════════════════════════════════════════════════
    { 
      id: 's6quiz', 
      type: 'interactive', 
      interactiveType: 'QUIZ', 
      text: "Validation des connaissances", 
      subText: "5 Questions" 
    },

    // ════════════════════════════════════════════════════════════════════════
    // S7 — MISSION TERRAIN & RECAP
    // ════════════════════════════════════════════════════════════════════════
    { id: 's7recap', type: 'interactive', interactiveType: 'MISSION_N02', text: "MISSION TERRAIN", subText: "Pratique réelle" }
  ]
}];

export const QUIZ_N02 = [
  {
    q: "En Janvier 2024, les ETF Bitcoin sont approuvés aux USA. Des millions d'investisseurs institutionnels peuvent acheter du BTC. Que se passe-t-il ?",
    o: [
      "A. Le prix baisse — plus d'offre de BTC",
      "B. Le prix monte — plus d'acheteurs que de vendeurs",
      "C. Le prix reste stable — achat au prix du marché",
      "D. Le prix baisse — ils vendent leurs autres actifs"
    ],
    ok: 1, // B
    hint: "La loi fondamentale : plus d'acheteurs = ?",
    fb: "Exact. BTC est passé de 45K$ à 73K$ en 2 mois. La même loi que Sandaga."
  },
  {
    q: "La Fed américaine monte ses taux à 5,25% en 2022. Quel est l'impact sur le Bitcoin (macroéconomie) ?",
    o: [
      "A. BTC monte — les investisseurs fuient le dollar",
      "B. BTC est neutre — les taux US n'impactent pas la crypto",
      "C. BTC baisse — crédit cher = vente des actifs risqués",
      "D. BTC monte — l'inflation baisse"
    ],
    ok: 2, // C
    hint: "Hausse des taux = crédit cher = que font les investisseurs par rapport au risque ?",
    fb: "Exact. BTC a fait -65% en 2022. La macro décide de la tendance générale."
  },
  {
    q: "Aminata a urgemment besoin de cash. Elle possède 500K FCFA en tokens peu connus (volume = 8K FCFA/jour). Que se passe-t-il si elle vend tout de suite ?",
    o: [
      "A. Elle récupère 500 000 FCFA",
      "B. Elle récupère ~250 000 FCFA (braderie par manque d'acheteurs)",
      "C. Elle ne peut pas vendre",
      "D. Elle récupère 480 000 FCFA (simples frais)"
    ],
    ok: 1, // B
    hint: "Volume de 8K = très peu d'acheteurs disponibles aujourd'hui.",
    fb: "Exact. Manque de liquidité = devoir brader. Règle absolue des investissements."
  },
  {
    q: "Le cacao a fait ×4 en un an (2023-2024). Pourquoi selon la loi des marchés ?",
    o: [
      "A. L'État ivoirien a augmenté son prix par 4",
      "B. La demande mondiale de chocolat a quadruplé",
      "C. Climat + logistique (offre réduite) face à une demande stable",
      "D. Spéculation artificielle locale"
    ],
    ok: 2, // C
    hint: "Loi : offre baisse + demande stable = ?",
    fb: "Exact. Moins de sacs de cacao mais autant d'acheteurs = prix explose."
  },
  {
    q: "Pourquoi l'affirmation de Gassama 'Le Bitcoin, ça monte toujours' est-elle fausse ?",
    o: [
      "A. Bitcoin a trop de concurrents",
      "B. La macroéconomie (ex: taux Fed) peut forcer des baisses massives",
      "C. Le Bitcoin est conçu pour être stable",
      "D. Gassama a raison sur le court terme."
    ],
    ok: 1, // B
    hint: "Rappelle-toi l'année 2022 et les taux de la Fed.",
    fb: "Exact. La macroéconomie aux USA impacte directement les prix à Dakar."
  }
];
