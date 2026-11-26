const howItWorksData = {
  hero: {
    badge: '100% Gratuit · Étudiants & Campus',
    title: 'Comment fonctionne Kours ?',
    subtitle:
      'Trouve des cours, fiches de révision et quiz partagés entre campus, révise efficacement et partage tes notes à ton tour.',
  },
  steps: [
    {
      stepNumber: 1,
      title: 'Recherche et explore par matière ou campus',
      description:
        'Filtre les cours PDF, résumés et fiches par domaine, niveau ou établissement pour comparer les méthodes et compléter tes notes.',
      ctaLabel: 'Explorer les cours',
      ctaTarget: '/explorer',
    },
    {
      stepNumber: 2,
      title: 'Révise avec les quiz, fiches et échanges',
      description:
        'Teste tes connaissances avec des quiz manuels ou générés par IA (avec liens vers le cours source), et pose tes questions en commentaire.',
      ctaLabel: 'Découvrir les quiz',
      ctaTarget: '/explorer',
    },
    {
      stepNumber: 3,
      title: 'Dépose tes cours et débloque plus d’avantages',
      description:
        'Ajoute tes PDF avec les métadonnées obligatoires et la validation du droit d’auteur pour aider la communauté et progresser vers les lectures illimitées.',
      ctaLabel: 'Partager un cours',
      ctaTarget: '/dashboard',
    },
  ],
  highlights: [
    {
      id: 'free-community',
      title: 'Gratuit et collaboratif',
      text: 'Une plateforme pensée par et pour les étudiants, sans mur payant bloquant l’accès aux ressources partagées.',
    },
    {
      id: 'unlimited-reads',
      title: 'Incitation au partage (lectures illimitées)',
      text: 'Dépose 1 à 2 cours utiles pour faire avancer ta jauge de lectures illimitées et gagner des points/likes.',
    },
    {
      id: 'copyright-moderation',
      title: 'Droit d’auteur & signalement',
      text: 'Chaque dépôt exige un engagement sur l’honneur et des métadonnées claires ; un bouton « Signaler » permet une modération rapide.',
    },
  ],
  faq: [
    {
      question: 'Puis-je consulter des cours d’autres universités ou filières ?',
      answer:
        'Oui : même si ton profil indique ton domaine, ton niveau et ton établissement, l’accès aux ressources publiques reste ouvert entre campus.',
    },
    {
      question: 'Comment fonctionne la génération de quiz par IA ?',
      answer:
        'L’IA s’appuie sur le texte du cours afin de générer des questions et de fournir des repères renvoyant vers le document source pour vérifier la fiabilité.',
    },
    {
      question: 'Que faire si un document enfreint le droit d’auteur ?',
      answer:
        'Clique sur le bouton « Signaler » sur la fiche du cours : le signalement est transmis à l’équipe de modération pour traitement.',
    },
  ],
};

function getHowItWorks(req, res) {
  return res.status(200).json(howItWorksData);
}

module.exports = {
  getHowItWorks,
};