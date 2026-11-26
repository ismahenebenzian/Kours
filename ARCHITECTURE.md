Kours/                                  # Racine du dépôt
├── .vite/                              # Cache / métadonnées Vite
├── backend/                            # Partie serveur / API (à documenter côté backend)
└── Frontend/                           # Application React TypeScript (Vite)
    ├── index.html                      # Point d'entrée HTML
    ├── package.json                    # Dépendances et scripts npm
    ├── tsconfig*.json                  # Configuration TypeScript
    ├── vite.config.ts                  # Configuration du bundler Vite
    └── src/
        ├── App.tsx                     # Composant racine / page d'accueil sur la route "/"
        ├── main.tsx                    # Point d'entrée React (montage du router)
        ├── index.css / App.css         # Styles globaux (Tailwind CSS / CSS)
        ├── SupabaseClient.ts           # Initialisation du client Supabase
        ├── Types.ts                    # Définitions des types et interfaces TypeScript
        ├── assets/                     # Images et illustrations (ex: Dashboard/background.svg)
        ├── styles/                     # Feuilles de styles additionnelles
        ├── router/
        │   ├── index.tsx               # Définition des routes (createBrowserRouter)
        │   └── ProtectedRoute.tsx      # Garde d'accès aux routes privées (/dashboard)
        ├── pages/
        │   ├── home.tsx                # Page "Comment ça marche" (/how-it-works)
        │   ├── Explore.tsx             # Page publique d'exploration (/explore)
        │   ├── Domains.tsx             # Page des domaines / catégories (/domains)
        │   ├── Auth.tsx                # Page connexion / inscription (/auth, /register)
        │   ├── Dashboard.tsx           # Layout principal du tableau de bord (sidebar + header + Outlet)
        │   ├── CoursDetail.tsx         # Page détaillée d'un cours (/dashboard/cours/:id)
        │   └── NotFound.tsx            # Page d'erreur 404 / fallback
        └── components/
            ├── Logo.tsx                # Composant logo de la marque
            ├── navbar.tsx              # Barre de navigation publique
            ├── footer.tsx              # Pied de page public
            ├── GenererAvecIA.tsx       # Composant de génération de contenu assistée par IA
            ├── Pagination.tsx          # Composant de pagination des listes
            ├── PopUp.tsx               # Composant modale / fenêtre contextuelle
            ├── connexion-inscription/
            │   ├── Login.tsx           # Formulaire de connexion
            │   └── Register.tsx        # Formulaire d'inscription
            └── Dashboard/
                ├── Home/
                │   ├── Dash-home.tsx       # Vue d'accueil du tableau de bord
                │   ├── Profile.tsx         # Vue profil utilisateur (/dashboard/profil)
                │   ├── CTA-btn.tsx         # Boutons d'action (dont ShareCourseButton)
                │   ├── StatsCard.tsx       # Cartes de statistiques
                │   └── Suggestion-card.tsx # Cartes de suggestions de cours
                ├── MesCours/
                │   ├── MesCours.tsx        # Liste et gestion des cours de l'utilisateur
                │   ├── AddCoursForm.tsx    # Formulaire d'ajout d'un cours
                │   ├── CourCard.tsx        # Carte d'affichage d'un cours
                │   └── FiltersCard.tsx     # Filtres de recherche / tri des cours
                ├── Notes/
                │   └── Note.tsx            # Gestion et affichage des notes (/dashboard/notes)
                ├── EspacePrive/
                │   ├── EspacesPrive.tsx    # Liste / gestion des espaces privés
                │   ├── EspacesCard.tsx     # Carte d'un espace privé
                │   └── Demande.tsx         # Gestion des demandes d'accès / partage
                ├── explore/
                │   └── ExploreList.tsx     # Exploration de cours dans le dashboard
                └── Quiz/
                    ├── Quiz.tsx            # Module principal de quiz
                    └── QuizDemo.tsx        # Mode démonstration / aperçu de quiz