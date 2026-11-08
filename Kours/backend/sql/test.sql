USE Kours;

-- Insertion de données de test
-- Insérer un établissement
INSERT INTO `etablissements` (`nom_etablissement`, `ville`) 
VALUES ('Université de Dijon', 'Nevers');

-- Insérer un domaine d'étude
INSERT INTO `domaines` (`nom_domaine`) 
VALUES ('Informatique');

-- Insérer un utilisateur (Étudiant / Contributeur)
INSERT INTO `utilisateurs` (`nom`, `prenom`, `email`, `mot_de_passe`, `role`, `domaine_etude`, `niveau_academique`) 
VALUES ('Dupont', 'Alice', 'alice.dupont@etu.fr', '$2y$10$ExempleHashMotDePasseSecurise', 'contributeur', 'Informatique', 'BUT 2');

-- Initialiser son quota associé (grâce à la relation 1-1 avec quotas_utilisateurs)
INSERT INTO `quotas_utilisateurs` (`id_utilisateur`, `cours_deposes`, `points_gagnes`, `acces_illimite`) 
VALUES (LAST_INSERT_ID(), 0, 0, false);

-- Récupérer l'ID de l'utilisateur inséré pour la suite (ici ID = 1)
-- Insérer un document associé
INSERT INTO `documents` (`titre`, `description`, `chemin_fichier_pdf`, `auteur_enseignant`, `annee_academique`, `engagement_honneur`, `type_document`, `statut_publication`, `visibilite`, `id_utilisateur`, `id_domaine`, `id_etablissement`) 
VALUES ('Cours complet d\'Algorithmique', 'Introduction aux graphes.', '/uploads/cours_algo_m1.pdf', 'Dr. Martin', '2025-2026', true, 'cours_complet', 'publie', 'public', 1, 1, 1');

-- Requêtes de consultation courantes
-- Afficher la liste des documents publiés avec les infos de l'auteur et du domaine
SELECT 
    d.id_document,
    d.titre,
    d.type_document,
    d.annee_academique,
    CONCAT(u.prenom, ' ', u.nom) AS auteur,
    dom.nom_domaine,
    e.nom_etablissement
FROM `documents` d
JOIN `utilisateurs` u ON d.id_utilisateur = u.id_utilisateur
JOIN `domaines` dom ON d.id_domaine = dom.id_domaine
LEFT JOIN `etablissements` e ON d.id_etablissement = e.id_etablissement
WHERE d.statut_publication = 'publie' AND d.visibilite = 'public';

-- Suivi de la progression de lecture d'un utilisateur sur un document
-- Enregistrer ou mettre à jour la progression de lecture (Upsert)
INSERT INTO `progression_lecture` (`id_utilisateur`, `id_document`, `derniere_page`, `pourcentage_avance`, `date_derniere_consultation`)
VALUES (1, 1, 12, 45, NOW())
ON DUPLICATE KEY UPDATE 
    `derniere_page` = VALUES(`derniere_page`),
    `pourcentage_avance` = VALUES(`pourcentage_avance`),
    `date_derniere_consultation` = NOW();

-- Tests des fonctionnalités interactives (Quiz et évaluations)
INSERT INTO `evaluations` (`note`, `liker`, `id_utilisateur`, `id_document`) 
VALUES (5, true, 1, 1)
ON DUPLICATE KEY UPDATE 
    `note` = VALUES(`note`),
    `liker` = VALUES(`liker`);

-- Enregistrer une tentative de quiz et calculer le taux de réussite
-- Créer une tentative de quiz
INSERT INTO `tentatives_quiz` (`id_utilisateur`, `id_quiz`, `score`, `nb_questions`, `points_gagnes`, `statut`, `date_debut`) 
VALUES (1, 1, 8, 10, 80, 'terminee', NOW());

-- Récupérer le meilleur score de l'utilisateur pour un quiz donné (comme indiqué dans vos commentaires de table)
SELECT 
    id_utilisateur,
    id_quiz,
    MAX(score) AS meilleur_score,
    MAX(nb_questions) as total_questions,
    ROUND((MAX(score) / MAX(nb_questions)) * 100, 2) AS pourcentage_reussite
FROM `tentatives_quiz`
WHERE `id_utilisateur` = 1 AND `id_quiz` = 1
GROUP BY `id_utilisateur`, `id_quiz`;

-- Tests de la gestion des groupes privés et demandes d'accès
-- 1. Un utilisateur crée un groupe privé
INSERT INTO `groupes_prives` (`nom_groupe`, `code_acces`, `id_createur`) 
VALUES ('Révisions M1 Info - Groupe 3', 'SECURE123', 1);

-- 2. Un autre utilisateur (ex: ID 2) demande à rejoindre le groupe
INSERT INTO `demandes_acces` (`id_groupe`, `id_utilisateur`, `statut`) 
VALUES (1, 2, 'en_attente');

-- 3. Un administrateur du groupe accepte la demande (passe le statut à acceptee et ajoute l'utilisateur aux membres)
UPDATE `demandes_acces` 
SET `statut` = 'acceptee', `date_reponse` = NOW() 
WHERE `id_groupe` = 1 AND `id_utilisateur` = 2;

-- Ajout effectif dans les membres du groupe
INSERT INTO `membres_groupe` (`id_groupe`, `id_utilisateur`, `role_membre`) 
VALUES (1, 2, 'membre');
