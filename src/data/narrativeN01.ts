export type CharacterKey = 'AMADOU' | 'GASSAMA' | 'DJELI' | 'MERE' | 'AWA' | 'MOUSSA' | 'FATOU' | 'NARRATOR';

export interface StoryBeat {
  id: string;
  character?: CharacterKey;
  text?: string;
  subText?: string;
  type?: 'dialogue' | 'narration' | 'interactive' | 'visual' | 'choice' | 'big-moment' | 'quote' | 'mission' | 'recap';
  interactiveType?: 'WAVE_ALERT' | 'CHOICE_SYSTEM' | 'DEVALUATION_SLIDER' | 'QUIZ' | 'RECAP_STATS' | 'BRANCHING_REVEAL' | 'ASSET_MATCH' | 'NEWS_SWIPE' | 'LIQUIDITY_CHOICE' | 'MISSION_N02' | 'BLOCKCHAIN_VISUALIZER' | 'ANALOGY_MATCHER' | 'CLASSIFICATION_EXERCISE' | 'MISSION_N03' | 'WAVE_VS_BITCOIN';
  interactiveData?: any;
  autoContinue?: boolean;
  condition?: {
    choice?: string;
  };
}

export interface Scene {
  id: string;
  title: string;
  beats: StoryBeat[];
}

export const AVATARS: Record<CharacterKey, string> = {
  AMADOU: 'https://res.cloudinary.com/drxouwbms/image/upload/v1775914590/Untitled_design_3_fl5yai.png',
  GASSAMA: 'https://res.cloudinary.com/drxouwbms/image/upload/v1775914358/Untitled_design_1_y47ewg.png',
  DJELI: 'https://res.cloudinary.com/drxouwbms/image/upload/v1775914519/Untitled_design_2_dgkeh6.png',
  MERE: 'https://res.cloudinary.com/drxouwbms/image/upload/v1775922105/Untitled_design_4_mbwf9k.png',
  AWA: 'https://res.cloudinary.com/drxouwbms/image/upload/v1775923106/Untitled_design_5_ocze3i.png',
  MOUSSA: 'https://res.cloudinary.com/drxouwbms/image/upload/v1776502094/Untitled_design_2_p6fryd.png',
  FATOU: 'https://res.cloudinary.com/drxouwbms/image/upload/v1776502720/Untitled_design_3_j5hbsa.png',
  NARRATOR: ''
};

export const NARRATIVE_N01: Scene[] = [
  {
    id: 's0',
    title: 'Le Taxi',
    beats: [
      { id: 's0b0', character: 'DJELI', type: 'dialogue', text: "Laissez-moi vous raconter l'histoire d'Amadou Diallo. Je l'ai vu naître à la connaissance, un soir de fin de mois, avec cent mille francs CFA sur son téléphone et personne pour lui dire ce qu'il devait en faire." },
      { id: 's0b1', type: 'narration', text: "C'est un vendredi. Dix-huit heures trente. Le soleil commence à rougir au-dessus de la Médina. Amadou est dans le taxi. Il regarde son téléphone comme si ce qu'il y lit pouvait s'effacer si on le fixe trop longtemps." },
      { id: 's0b2', type: 'interactive', interactiveType: 'WAVE_ALERT', text: "Son premier salaire. Pour la première fois de sa vie, l'argent vient de lui.", subText: "100 000 FCFA · Virement reçu" },
      { id: 's0b3', character: 'MERE', type: 'dialogue', text: "« Cet argent, tu le gardes. Tu mets ce que tu peux sous le matelas. On ne sait jamais ce qui peut arriver avec les banques. »", subText: "Le taxi le dépose devant la maison familiale. Sa mère est dans la cour, elle étend du linge à la lumière déclinante." },
      { id: 's0b4', character: 'GASSAMA', type: 'dialogue', text: "« Mets tout en banque. Sérieusement. La SGBS donne deux virgule cinq pour cent. L'argent sous le matelas, c'est de l'argent qui dort. »", subText: "Son téléphone vibre. C'est Gassama. Son ami d'enfance — il parle avec la certitude de quelqu'un qui n'a encore jamais vraiment perdu." },
      { id: 's0b5', character: 'AWA', type: 'dialogue', text: "« Achète de l'or au marché. C'est ce qui garde sa valeur. Les billets, ça brûle. L'or, ça reste. »", subText: "Sa tante Awa passe dans laavoid  cour. Elle a entendu." },
      { id: 's0b6', type: 'narration', text: "Trois personnes. Trois conseils. Aucun n'explique pourquoi. Et cent mille francs qui attendent.", subText: "Amadou doit choisir." }
    ]
  },
  {
    id: 's1',
    title: 'Le Choix',
    beats: [
      { id: 's1b0', type: 'interactive', interactiveType: 'CHOICE_SYSTEM', 
      text: "Choisis une direction pour tes 100 000 FCFA", 
      subText: "Aminata doit décider. Sa mère, Gassama ou Tante AWA ?",
      interactiveData: [
        { id: 'A', title: 'Matelas', desc: 'Comme sa mère. Concret. On peut le toucher.', icon: 'Home', accent: 'bg-blue-500' },
        { id: 'B', title: 'Banque', desc: 'Comme Gassama. 2.5% intérêts.', icon: 'Landmark', accent: 'bg-purple-500' },
        { id: 'C', title: 'Or', desc: 'Comme tante Awa. Garde sa valeur.', icon: 'Coins', accent: 'bg-highlight' }
      ]
    }]
  },
  {
    id: 's2',
    title: 'Révélation',
    beats: [
      { id: 's2intro', type: 'big-moment', text: "3 ANS PLUS TARD", subText: "Que reste-t-il de ses 100 000 FCFA ?" },
      { id: 's2reveal', type: 'interactive', interactiveType: 'BRANCHING_REVEAL', text: "Révélation des résultats" },

      // Choice A specific beats
      { id: 's2b1a', type: 'narration', condition: { choice: 'A' }, text: "Tu as perdu 11 100 FCFA. Sans rien dépenser. L'inflation a mangé ton épargne en silence.", subText: "Matelas, banque, or — chacun expose à un risque différent." },

      // Choice B specific beats
      { id: 's2b1b', type: 'narration', condition: { choice: 'B' }, text: "Tu as gagné des billets — mais perdu du pouvoir d'achat. La banque donne moins que ce que l'inflation prend.", subText: "Matelas, banque, or — chacun expose à un risque différent." },

      // Choice C specific beats
      { id: 's2b1c', type: 'narration', condition: { choice: 'C' }, text: "L'or a monté — cette fois. Mais si l'or avait chuté de 30% ? Tout était au même endroit.", subText: "Matelas, banque, or — chacun expose à un risque différent." },

      { id: 's2b2', type: 'narration', text: "Tout mettre au même endroit, c'est parier. Pas protéger. Pour comprendre à quel point c'est dangereux, il faut remonter à une nuit précise.", subText: "Une nuit où des millions d'Africains ont tout perdu sans rien décider." },
      { id: 's2b3', type: 'big-moment', text: "11 JANVIER 1994 · DANS LA NUIT", subText: "Le FCFA a été dévalué de 50%. Du jour au lendemain. Sans que personne au Sénégal vote pour ça." },
      { id: 's2b4', type: 'quote', text: "La grand-mère d'Amadou avait 300 000 FCFA à la banque. Le 12 janvier au matin : 150 000 FCFA réels.", subText: "« Je reste convaincu que la dévaluation est une erreur. » — Houphouët-Boigny." }
    ]
  },
  {
    id: 's3',
    title: 'La Cour',
    beats: [
      { id: 's3b0', type: 'narration', text: "La Cour · Médina · Nuit.", subText: "Djéli WÔY est assis sur le banc. Boubou noir brodé de fils dorés. Un bâton garni de cauris." },

      // Choice A specific opening
      { id: 's3ctxA', condition: { choice: 'A' }, type: 'narration', text: "Amadou a 88 900 FCFA réels. Il a suivi sa mère — et il a perdu sans rien faire. « Maître, comment l'argent peut-il bouger sans qu'on le touche ? »" },
      // Choice B specific opening
      { id: 's3ctxB', condition: { choice: 'B' }, type: 'narration', text: "Amadou a 95 724 FCFA réels. Il a suivi Gassama. Plus de billets, moins de pouvoir d'achat. « Maître, j'ai fait le bon geste. Pourquoi je perds quand même ? »" },
      // Choice C specific opening
      { id: 's3ctxC', condition: { choice: 'C' }, type: 'narration', text: "Amadou a 120 000 FCFA réels. L'or a monté — cette fois. Mais tout était au même endroit. « Maître, j'ai eu de la chance. Et si l'or avait baissé ? »" },

      { id: 's3b1', character: 'DJELI', type: 'dialogue', text: "« Tu sais ce que c'est ? »" },
      { id: 's3b1_a', character: 'AMADOU', type: 'dialogue', text: "« Un cauri. On en voyait chez mon grand-père. »" },
      { id: 's3b2', character: 'DJELI', type: 'dialogue', text: "« Pendant des siècles, ça, c'était de l'argent. Transportable. Durable. Fongible. Des siècles de commerce ouest-africain ont reposé sur ce petit coquillage. Et puis les Européens ont découvert les gisements. Ils en ont importé des tonnes. Tout ce que nos ancêtres avaient épargné ne valait plus rien. »", subText: "Parce que quelqu'un d'autre contrôlait l'offre." },
      { id: 's3b3', character: 'AMADOU', type: 'dialogue', text: "« Donc ni le matelas ni la banque ne protège vraiment. »" },
      { id: 's3b4', character: 'DJELI', type: 'dialogue', text: "« Le matelas ne protège pas de l'inflation. La banque ne protège pas de la dévaluation. Les deux sont des illusions de sécurité. La vraie question : quel argent a une offre que personne ne contrôle ? »" },
      { id: 's3b5', character: 'DJELI', type: 'dialogue', text: "« On leur a pris les cauris. On leur a imposé leurs francs. On a décidé pour eux ce que valait leur travail. Bitcoin n'a pas de siège social à Paris. Bitcoin est ce que nos ancêtres auraient voulu : une monnaie que personne ne peut décider de dévaluer la nuit. »" },
      { id: 's3b6', character: 'AMADOU', type: 'dialogue', text: "« Maître — combien rapporte la banque exactement ? »" },
      { id: 's3b7', character: 'DJELI', type: 'dialogue', text: "« La SGBS te donne deux virgule cinq pour cent par an. Pour tes cent mille francs, ça fait deux mille cinq cents. Et l'inflation ? Trois à quatre pour cent. La banque te donne moins que ce que l'inflation te prend. Tu gagnes des billets, mais tu perds du pouvoir d'achat. »" },
      { id: 's3b8', character: 'DJELI', type: 'dialogue', text: "« La vraie réponse, c'est de ne pas choisir. C'est de répartir. Quarante pour cent en banque — la liquidité. Quarante pour cent dans un projet — la croissance. Vingt pour cent en or ou en actifs — la protection. Pas tout au même endroit. Jamais. »" },
      { id: 's3b9', type: 'narration', text: "C'est la première nuit. Amadou rentre dans sa chambre, ouvre son ordinateur, et tape : « Bitcoin offre maximale ».", subText: "Vingt-deux ans. Cent mille francs. La première question posée à l'argent." }
    ]
  },
  {
    id: 's5',
    title: 'Devaluation',
    beats: [
      { id: 's5b0', type: 'interactive', interactiveType: 'DEVALUATION_SLIDER', text: "La grand-mère d'Amadou. 300 000 FCFA. Vingt ans à vendre du poisson à Soumbédioune.", subText: "Glisse pour passer du 11 au 12 janvier." }
    ]
  },
  {
    id: 's6',
    title: 'Quiz',
    beats: [
      { id: 's6b0', type: 'interactive', interactiveType: 'QUIZ', text: "Séquence de validation", subText: "Shell / Cauris pour indices." }
    ]
  },
  {
    id: 's7',
    title: 'Bilan',
    beats: [
      { id: 's7b0', type: 'mission', text: "🎯 MISSION TERRAIN · +100 XP", subText: "Compare le FCFA et Wave sur les 5 qualités. Partage dans la communauté." },
      { id: 's7b1', type: 'recap', text: "BILAN · N0.1", subText: "3 RÈGLES D'OR" },
      { id: 's7b2', character: 'DJELI', type: 'dialogue', text: "« Un savoir véritable n'est pas fait pour être gardé. Il est fait pour être transmis. »", subText: "DJÉLI WÔY · ÉPILOGUE" }
    ]
  }
];

export const QUIZ_N01 = [
  { 
    q: "Pourquoi les cauris ont-ils échoué ?", 
    o: ["Trop faciles à perdre", "Les Africains ont arrêté d'y croire", "Les Européens ont importé des tonnes", "Les gouvernements les ont interdits"], 
    ok: 2, 
    hint: "Quelqu'un d'autre a contrôlé l'offre...",
    fb: "Européens → gisements océan Indien → tonnes importées → inflation massive. Le problème : quelqu'un d'autre contrôlait l'offre."
  },
  { 
    q: "11 jan 1994. FCFA dévalué de 50%. Grand-mère : 300 000 FCFA. Le 12 au matin ?", 
    o: ["300 000", "270 000", "150 000", "0"], 
    ok: 2, 
    hint: "C'est la moitié de la valeur.",
    fb: "300 000 × 50% = 150 000 perdus. En une nuit. Décision : France + FMI."
  },
  { 
    q: "200K sous le matelas, inflation 4%, 14 ans. Valeur réelle ?", 
    o: ["200 000", "280 000", "~115 000", "160 000"], 
    ok: 2, 
    hint: "L'argent perd de la valeur avec le temps.",
    fb: "200 000 ÷ (1.04)^14 = 115 473 FCFA. Perte : 84 527 sans jamais dépenser."
  },
  { 
    q: "Quel est le point faible de Bitcoin ?", 
    o: ["Transportable", "Divisible", "Stable à court terme", "Durable"], 
    ok: 2, 
    hint: "Regarde le prix sur une journée...",
    fb: "La volatilité court terme est la seule faiblesse. Long terme : +200 000% en 10 ans."
  },
  { 
    q: "Pourquoi répartir 40/40/20 ?", 
    o: ["Maximiser les gains", "Éviter la faillite", "Protéger contre plusieurs risques", "Les intérêts"], 
    ok: 2, 
    hint: "Ne pas mettre tous les œufs dans le même panier.",
    fb: "Chaque part protège contre un risque différent. Tout en banque = tout exposé au même risque."
  }
];
