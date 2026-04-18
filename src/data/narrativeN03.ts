import { Scene, StoryBeat } from './narrativeN01';

export const NARRATIVE_N03: Scene[] = [
  {
    id: 's0',
    title: 'La recherche',
    beats: [
      { id: 's0b0', type: 'narration', text: "Le lendemain de sa conversation avec l'oncle Moussa. Amadou est devant son écran.", subText: "Module N0.3 · C'est quoi la blockchain ?" },
      { id: 's0b1', type: 'dialogue', character: 'AMADOU', text: "Bon, voyons voir ce que Google dit sur ce fameux Bitcoin..." },
      { 
        id: 's0b2', 
        type: 'visual', 
        text: "Bitcoin — une cryptomonnaie basée sur la technologie blockchain.", 
        subText: "Résultat 1 : Wikipedia" 
      },
      { 
        id: 's0b3', 
        type: 'visual', 
        text: "La blockchain — une chaîne de blocs décentralisée utilisant un algorithme de consensus byzantin distribué.", 
        subText: "Résultat 2 : Site technique" 
      },
      { id: 's0b4', type: 'dialogue', character: 'AMADOU', text: "C'est quoi ce charabia ? 'Algorithme byzantin' ? On est en 2026 ou au Moyen Âge ?" },
      { id: 's0b5', type: 'dialogue', character: 'GASSAMA', text: "C'est trop compliqué, laisse tomber. Achète juste des coins et vends quand ça monte.", subText: "Réponse de Gassama sur WhatsApp." },
      { id: 's0b6', type: 'dialogue', character: 'DJELI', text: "« Le griot ne comprend pas les mots avant de comprendre les sens. »", subText: "Amadou se rappelle les paroles de Djéli WÔY." },
      { id: 's0b7', type: 'quote', text: "Comment faire confiance à quelque chose qu'on ne peut ni toucher ni voir ?", subText: "La question qui brûle les lèvres d'Amadou." }
    ]
  },
  {
    id: 's1',
    title: 'Le Choix',
    beats: [
      { 
        id: 's1choice', 
        type: 'choice', 
        text: "Amadou a trois attitudes possibles face à cette complexité. Laquelle choisis-tu ?", 
        interactiveType: 'CHOICE_SYSTEM',
        interactiveData: [
          { id: 'A', title: 'ACHETER SANS COMPRENDRE', desc: "Tout le monde dit que ça monte. Je verrai les résultats plus tard.", icon: 'TrendingUp', accent: 'bg-orange-500' },
          { id: 'B', title: 'IGNORER COMPLÈTEMENT', desc: "Gassama a raison, c'est trop compliqué. Je vais faire comme lui.", icon: 'ShieldAlert', accent: 'bg-red-500' },
          { id: 'C', title: 'COMPRENDRE LE MÉCASNISME', desc: "Si je comprends la base, je ferai de meilleures décisions.", icon: 'Search', accent: 'bg-highlight' }
        ]
      },
      { 
        id: 's1resA', 
        condition: { choice: 'A' }, 
        type: 'dialogue', 
        character: 'DJELI', 
        text: "Acheter sans comprendre, c'est devenir la proie de ceux qui comprennent, mon fils." 
      },
      { 
        id: 's1resB', 
        condition: { choice: 'B' }, 
        type: 'dialogue', 
        character: 'DJELI', 
        text: "L'ignorance est une prison dont les murs n'ont pas besoin de gardiens." 
      },
      { 
        id: 's1resC', 
        condition: { choice: 'C' }, 
        type: 'dialogue', 
        character: 'DJELI', 
        text: "La persévérance est la clé qui ouvre la porte du sens. Bien choisi." 
      }
    ]
  },
  {
    id: 's2',
    title: 'Révélation',
    beats: [
      { 
        id: 's2v1', 
        type: 'interactive', 
        interactiveType: 'WAVE_VS_BITCOIN', 
        text: "Comment fonctionne la confiance ?",
        interactiveData: {
          left: { title: 'WAVE (Banque)', desc: 'Un seul registre. Un seul point de contrôle.', icon: 'Landmark' },
          right: { title: 'BITCOIN', desc: 'Des milliers de copies. Personne ne contrôle.', icon: 'Bitcoin' }
        }
      },
      { 
        id: 's2b2', 
        type: 'big-moment', 
        text: "La blockchain Bitcoin n'a jamais été hackée depuis 2009.", 
        subText: "15 ans de résistance totale." 
      },
      { 
        id: 's2b3', 
        type: 'narration', 
        text: "Zéro succès de fraude malgré des billions de dollars en jeu. Pourquoi ?", 
        subText: "Parce que modifier un seul bloc invalide toute la chaîne." 
      },
      { 
        id: 's2steps', 
        type: 'recap', 
        text: "La blockchain en 3 étapes simples :",
        interactiveType: 'RECAP_STATS',
        interactiveData: [
          { label: 'ÉTAPE 1', value: 'TRANSACTION', desc: 'Diffusée sur des milliers de nœuds simultanément.' },
          { label: 'ÉTAPE 2', value: 'BLOCAGE', desc: 'Les mineurs regroupent les transactions et les valident.' },
          { label: 'ÉTAPE 3', value: 'CHAÎNE', desc: 'Le bloc est soudé à la chaîne pour toujours. Immuable.' }
        ]
      }
    ]
  },
  {
    id: 's3',
    title: 'La Sagesse des Griots',
    beats: [
      { id: 's3b0', type: 'dialogue', character: 'AMADOU', text: "Djéli, j'ai lu que la blockchain c'est comme une mémoire numérique géante..." },
      { id: 's3b1', type: 'dialogue', character: 'DJELI', text: "Pourquoi les griots étaient-ils importants selon toi ?" },
      { id: 's3b2', type: 'dialogue', character: 'AMADOU', text: "Parce qu'ils portaient la mémoire du peuple. Généalogie, accords..." },
      { id: 's3b3', type: 'dialogue', character: 'DJELI', text: "Et si quelqu'un voulait changer l'histoire ? Dire qu'une dette n'existait pas ?" },
      { id: 's3b4', type: 'dialogue', character: 'AMADOU', text: "Les autres griots diraient 'C'est faux !'. Ils ont tous la même mémoire." },
      { 
        id: 's3b5', 
        type: 'quote', 
        text: "Voilà. C'est la blockchain. Des milliers de griots numériques.", 
        subText: "Confier la mémoire à tout le monde plutôt qu'à personne en particulier." 
      },
      {
        id: 's3dialogue',
        type: 'dialogue',
        character: 'AWA',
        text: "Mais Aminata, comment on peut faire confiance à un ordinateur ?",
        subText: "Amadou imagine Aminata expliquant à sa grand-mère."
      },
      {
        id: 's3response',
        type: 'dialogue',
        character: 'AMADOU',
        text: "Le problème Grand-mère, c'est de faire confiance à UNE seule personne. La blockchain, c'est comme si 10 000 griots avaient la même histoire.",
      }
    ]
  },
  {
    id: 's4',
    title: 'Exploration Technique',
    beats: [
      { 
        id: 's4visualizer', 
        type: 'interactive', 
        interactiveType: 'BLOCKCHAIN_VISUALIZER', 
        text: "Touche un bloc pour essayer de modifier l'histoire..." 
      },
      {
        id: 's4analogies',
        type: 'interactive',
        interactiveType: 'ANALOGY_MATCHER',
        text: "Relie la sagesse de nos ancêtres à la technologie moderne."
      },
      {
        id: 's4classification',
        type: 'interactive',
        interactiveType: 'CLASSIFICATION_EXERCISE',
        text: "Blockchain Publique vs Privée : Saura-tu faire la différence ?"
      }
    ]
  },
  {
    id: 's5',
    title: 'Le Savoir',
    beats: [
      {
        id: 'recap_rules',
        type: 'mission',
        text: "3 Règles pour Aminata",
        subText: "Partager, Vérifier, Persévérer",
        interactiveType: 'MISSION_N03'
      }
    ]
  }
];

export const QUIZ_N03 = [
  {
    id: 'q1',
    question: "Pourquoi dit-on que la blockchain Bitcoin est 'immuable' ?",
    options: [
      { id: 'a', text: "Parce que Bitcoin est reconnu par les États" },
      { id: 'b', text: "Parce que les transactions sont cryptées par un mot de passe" },
      { id: 'c', text: "Parce que modifier un bloc invalide toute la chaîne, détecté par tous les nœuds" },
      { id: 'd', text: "Parce qu'elle est stockée sur des serveurs secrets" }
    ],
    correct: 'c',
    indices: [
      "Que se passe-t-il quand on modifie un seul bloc ?",
      "L'empreinte change et le bloc suivant ne reconnaît plus son parent.",
      "Toute la chaîne casse instantanément."
    ]
  },
  {
    id: 'q2',
    question: "Laquelle de ces analogies illustre le mieux la DÉCENTRALISATION ?",
    options: [
      { id: 'a', text: "Une empreinte digitale unique" },
      { id: 'b', text: "Le palabre au village où tous sont témoins" },
      { id: 'c', text: "Un porteur d'eau qui reçoit une récompense" },
      { id: 'd', text: "Le cahier de dettes de Sandaga" }
    ],
    correct: 'b',
    indices: [
      "Décentralisation = tout le monde vérifie, personne ne contrôle seul.",
      "Au palabre, est-ce qu'il y a un seul décideur ?",
      "Tous les anciens sont témoins, la fraude est impossible."
    ]
  },
  {
    id: 'q3',
    question: "Quelle est la principale différence entre une blockchain PUBLIQUE et PRIVÉE ?",
    options: [
      { id: 'a', text: "La publique est plus rapide" },
      { id: 'b', text: "La privée est sur mobile uniquement" },
      { id: 'c', text: "La publique ne peut pas être arrêtée, la privée est contrôlée par son propriétaire" },
      { id: 'd', text: "L'une utilise le PoW, l'autre le PoS" }
    ],
    correct: 'c',
    indices: [
      "Qui peut arrêter une blockchain privée ?",
      "Son propriétaire peut modifier les règles à tout moment.",
      "Sans décentralisation, c'est juste une base de données compliquée."
    ]
  },
  {
    id: 'q4',
    question: "Quelle est la différence entre PoW (Bitcoin) et PoS (Ethereum) ?",
    options: [
      { id: 'a', text: "PoW est plus rapide" },
      { id: 'b', text: "PoS utilise plus d'électricité" },
      { id: 'c', text: "PoW résout des maths (énergie), PoS mise des jetons (-99% d'énergie)" },
      { id: 'd', text: "PoW est plus adapté à l'Afrique" }
    ],
    correct: 'c',
    indices: [
      "Lequel demande de résoudre des calculs complexes ?",
      "Le Proof of Stake mise sur la garantie financière des validateurs.",
      "Ethereum a réduit sa conso de 99.95% avec le PoS."
    ]
  },
  {
    id: 'q5',
    question: "Quelle est l'attitude WÔY face à la complexité de Gassama ?",
    options: [
      { id: 'a', text: "Laisse tomber si c'est compliqué" },
      { id: 'b', text: "Acheter quand même sans comprendre" },
      { id: 'c', text: "Comprendre d'abord le sens via des analogies, puis décider" },
      { id: 'd', text: "Laisser un expert gérer pour nous" }
    ],
    correct: 'c',
    indices: [
      "Djéli dit : 'Le griot ne comprend pas les mots avant de comprendre...'",
      "Partir du connu vers l'inconnu.",
      "Comprendre c'est se protéger des arnaques."
    ]
  }
];
