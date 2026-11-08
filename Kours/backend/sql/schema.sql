-- CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci -> gérer accents et caractères spéciaux
CREATE DATABASE IF NOT EXISTS Kours
	CHARACTER SET utf8mb4 
    COLLATE utf8mb4_0900_ai_ci;
USE Kours;

CREATE TABLE `etablissements` (
  `id_etablissement` int PRIMARY KEY AUTO_INCREMENT,
  `nom_etablissement` varchar(150) NOT NULL,
  `ville` varchar(100)
);

CREATE TABLE `domaines` (
  `id_domaine` int PRIMARY KEY AUTO_INCREMENT,
  `nom_domaine` varchar(100) UNIQUE NOT NULL
);

CREATE TABLE `utilisateurs` (
  `id_utilisateur` int PRIMARY KEY AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(150) UNIQUE NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` ENUM ('visiteur', 'etudiant', 'contributeur', 'administrateur') DEFAULT 'etudiant',
  `domaine_etude` varchar(100),
  `niveau_academique` varchar(50),
  `date_inscription` datetime DEFAULT (now())
);

CREATE TABLE `groupes_prives` (
  `id_groupe` int PRIMARY KEY AUTO_INCREMENT,
  `nom_groupe` varchar(100) NOT NULL,
  `code_acces` varchar(50) UNIQUE NOT NULL,
  `id_createur` int NOT NULL,
  `date_creation` datetime DEFAULT (now())
);

CREATE TABLE `membres_groupe` (
  `id_groupe` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  `role_membre` ENUM ('admin', 'membre') NOT NULL DEFAULT 'membre',
  `date_adhesion` datetime DEFAULT (now()),
  PRIMARY KEY (`id_groupe`, `id_utilisateur`)
);

CREATE TABLE `demandes_acces` (
  `id_demande` int PRIMARY KEY AUTO_INCREMENT,
  `id_groupe` int NOT NULL,
  `id_utilisateur` int NOT NULL COMMENT 'Utilisateur qui demande à rejoindre le groupe',
  `statut` ENUM ('en_attente', 'acceptee', 'refusee') NOT NULL DEFAULT 'en_attente',
  `date_demande` datetime DEFAULT (now()),
  `date_reponse` datetime COMMENT 'Renseignée quand un admin du groupe accepte ou refuse'
);

CREATE TABLE `documents` (
  `id_document` int PRIMARY KEY AUTO_INCREMENT,
  `titre` varchar(200) NOT NULL,
  `description` text,
  `chemin_fichier_pdf` varchar(255) NOT NULL,
  `auteur_enseignant` varchar(150),
  `annee_academique` varchar(20),
  `engagement_honneur` boolean NOT NULL DEFAULT false,
  `type_document` ENUM ('cours_complet', 'fiche_revision', 'resume', 'sujet', 'sujet_corrige', 'correction', 'autre') NOT NULL DEFAULT 'cours_complet',
  `statut_publication` ENUM ('brouillon', 'en_attente', 'publie', 'refuse', 'retire') NOT NULL DEFAULT 'brouillon' COMMENT 'brouillon = enregistré non soumis · en_attente = soumis, à valider par l’admin · publie = validé · refuse = refusé à la validation · retire = retiré après signalement (le document reste en base pour conserver l’historique des signalements)',
  `visibilite` ENUM ('public', 'prive') DEFAULT 'public',
  `date_depot` datetime DEFAULT (now()),
  `id_utilisateur` int NOT NULL,
  `id_domaine` int NOT NULL,
  `id_etablissement` int
);

CREATE TABLE `document_groupe` (
  `id_document` int NOT NULL,
  `id_groupe` int NOT NULL,
  PRIMARY KEY (`id_document`, `id_groupe`)
);

CREATE TABLE `commentaires` (
  `id_commentaire` int PRIMARY KEY AUTO_INCREMENT,
  `contenu` text NOT NULL,
  `page_annotation` int,
  `date_publication` datetime DEFAULT (now()),
  `id_utilisateur` int NOT NULL,
  `id_document` int NOT NULL
);

CREATE TABLE `evaluations` (
  `id_evaluation` int PRIMARY KEY AUTO_INCREMENT,
  `note` int,
  `liker` boolean DEFAULT false,
  `date_evaluation` datetime DEFAULT (now()),
  `id_utilisateur` int NOT NULL,
  `id_document` int NOT NULL
);

CREATE TABLE `quiz` (
  `id_quiz` int PRIMARY KEY AUTO_INCREMENT,
  `titre` varchar(200) NOT NULL,
  `type_quiz` ENUM ('manuel', 'ia') DEFAULT 'manuel',
  `id_document` int NOT NULL,
  `id_createur` int NOT NULL,
  `date_creation` datetime DEFAULT (now())
);

CREATE TABLE `questions` (
  `id_question` int PRIMARY KEY AUTO_INCREMENT,
  `enonce` text NOT NULL,
  `marge_texte_source` varchar(255),
  `id_quiz` int NOT NULL
);

CREATE TABLE `reponses` (
  `id_reponse` int PRIMARY KEY AUTO_INCREMENT,
  `texte_reponse` text NOT NULL,
  `est_correcte` boolean DEFAULT false,
  `id_question` int NOT NULL
);

CREATE TABLE `tentatives_quiz` (
  `id_tentative` int PRIMARY KEY AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `id_quiz` int NOT NULL,
  `score` int NOT NULL DEFAULT 0 COMMENT 'Nombre de bonnes réponses (ex : 8 pour « 8 / 10 »)',
  `nb_questions` int NOT NULL DEFAULT 0 COMMENT 'Nombre de questions au moment de la tentative (score maximal)',
  `points_gagnes` int NOT NULL DEFAULT 0 COMMENT 'Points obtenus (écran résultat : « +80 points »)',
  `statut` ENUM ('en_cours', 'terminee', 'abandonnee') NOT NULL DEFAULT 'en_cours' COMMENT 'abandonnee = bouton « Quitter »',
  `date_debut` datetime DEFAULT (now()),
  `date_fin` datetime COMMENT 'NULL tant que la tentative n’est pas terminée ; durée = date_fin - date_debut'
);

CREATE TABLE `reponses_utilisateur` (
  `id_tentative` int NOT NULL,
  `id_question` int NOT NULL,
  `id_reponse` int COMMENT 'Option choisie ; NULL si la question a été passée sans réponse',
  `date_reponse` datetime DEFAULT (now()),
  PRIMARY KEY (`id_tentative`, `id_question`)
);

CREATE TABLE `notes_cloud` (
  `id_note` int PRIMARY KEY AUTO_INCREMENT,
  `titre` varchar(200) NOT NULL,
  `contenu_texte` text,
  `date_derniere_modif` datetime DEFAULT (now()),
  `id_utilisateur` int NOT NULL,
  `id_document` int
);

CREATE TABLE `signalements` (
  `id_signalement` int PRIMARY KEY AUTO_INCREMENT,
  `motif` text NOT NULL,
  `statut` ENUM ('en_attente', 'traite', 'rejete') DEFAULT 'en_attente',
  `date_signalement` datetime DEFAULT (now()),
  `id_utilisateur` int NOT NULL,
  `id_document` int NOT NULL,
  `id_administrateur` int COMMENT 'Renseigné uniquement quand un administrateur traite le signalement',
  `date_traitement` datetime COMMENT 'Renseignée au traitement'
);

CREATE TABLE `favoris` (
  `id_utilisateur` int NOT NULL,
  `id_document` int NOT NULL,
  `date_ajout` datetime DEFAULT (now()),
  PRIMARY KEY (`id_utilisateur`, `id_document`)
);

CREATE TABLE `logs_administration` (
  `id_log` int PRIMARY KEY AUTO_INCREMENT,
  `id_administrateur` int NOT NULL,
  `action` varchar(100) NOT NULL,
  `details` text,
  `date_action` datetime DEFAULT (now())
);

CREATE TABLE `annonces_globales` (
  `id_annonce` int PRIMARY KEY AUTO_INCREMENT,
  `titre` varchar(150) NOT NULL,
  `contenu` text NOT NULL,
  `id_administrateur` int NOT NULL,
  `date_publication` datetime DEFAULT (now()),
  `date_expiration` datetime
);

CREATE TABLE `quotas_utilisateurs` (
  `id_utilisateur` int PRIMARY KEY,
  `cours_deposes` int DEFAULT 0,
  `points_gagnes` int DEFAULT 0,
  `acces_illimite` boolean DEFAULT false
);

CREATE TABLE `notifications` (
  `id_notification` int PRIMARY KEY AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `titre` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `lu` boolean DEFAULT false,
  `lien_redirection` varchar(255),
  `date_creation` datetime DEFAULT (now())
);

CREATE TABLE `progression_lecture` (
  `id_utilisateur` int NOT NULL,
  `id_document` int NOT NULL,
  `derniere_page` int DEFAULT 1,
  `pourcentage_avance` int DEFAULT 0,
  `date_derniere_consultation` datetime DEFAULT (now()),
  PRIMARY KEY (`id_utilisateur`, `id_document`)
);

CREATE INDEX `membres_groupe_index_0` ON `membres_groupe` (`id_utilisateur`);

CREATE UNIQUE INDEX `demandes_acces_index_1` ON `demandes_acces` (`id_groupe`, `id_utilisateur`);

CREATE INDEX `demandes_acces_index_2` ON `demandes_acces` (`id_groupe`, `statut`);

CREATE UNIQUE INDEX `evaluations_index_3` ON `evaluations` (`id_utilisateur`, `id_document`);

CREATE INDEX `tentatives_quiz_index_4` ON `tentatives_quiz` (`id_utilisateur`, `id_quiz`);

CREATE INDEX `tentatives_quiz_index_5` ON `tentatives_quiz` (`id_quiz`);

CREATE INDEX `reponses_utilisateur_index_6` ON `reponses_utilisateur` (`id_reponse`);

ALTER TABLE `membres_groupe` COMMENT = 'Un utilisateur peut appartenir à plusieurs groupes, un groupe a plusieurs membres.';

ALTER TABLE `demandes_acces` COMMENT = 'Une seule ligne par couple (groupe, utilisateur) : une nouvelle demande remet le statut à en_attente. Acceptation = ligne ajoutée dans membres_groupe.';

ALTER TABLE `tentatives_quiz` COMMENT = 'Le pourcentage de réussite se calcule : score / nb_questions. Meilleur score = MAX(score) par utilisateur et par quiz.';

ALTER TABLE `reponses_utilisateur` COMMENT = 'Une réponse par question et par tentative (QCM à réponse unique). Bonne réponse = reponses.est_correcte de l’option choisie ; la liste « À revoir » se déduit des mauvaises réponses.';

ALTER TABLE `groupes_prives` ADD FOREIGN KEY (`id_createur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `membres_groupe` ADD FOREIGN KEY (`id_groupe`) REFERENCES `groupes_prives` (`id_groupe`) ON DELETE CASCADE;

ALTER TABLE `membres_groupe` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `demandes_acces` ADD FOREIGN KEY (`id_groupe`) REFERENCES `groupes_prives` (`id_groupe`) ON DELETE CASCADE;

ALTER TABLE `demandes_acces` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `documents` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `documents` ADD FOREIGN KEY (`id_domaine`) REFERENCES `domaines` (`id_domaine`) ON DELETE RESTRICT;

ALTER TABLE `documents` ADD FOREIGN KEY (`id_etablissement`) REFERENCES `etablissements` (`id_etablissement`) ON DELETE SET NULL;

ALTER TABLE `document_groupe` ADD FOREIGN KEY (`id_document`) REFERENCES `documents` (`id_document`) ON DELETE CASCADE;

ALTER TABLE `document_groupe` ADD FOREIGN KEY (`id_groupe`) REFERENCES `groupes_prives` (`id_groupe`) ON DELETE CASCADE;

ALTER TABLE `commentaires` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `commentaires` ADD FOREIGN KEY (`id_document`) REFERENCES `documents` (`id_document`) ON DELETE CASCADE;

ALTER TABLE `evaluations` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `evaluations` ADD FOREIGN KEY (`id_document`) REFERENCES `documents` (`id_document`) ON DELETE CASCADE;

ALTER TABLE `quiz` ADD FOREIGN KEY (`id_document`) REFERENCES `documents` (`id_document`) ON DELETE CASCADE;

ALTER TABLE `quiz` ADD FOREIGN KEY (`id_createur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `questions` ADD FOREIGN KEY (`id_quiz`) REFERENCES `quiz` (`id_quiz`) ON DELETE CASCADE;

ALTER TABLE `reponses` ADD FOREIGN KEY (`id_question`) REFERENCES `questions` (`id_question`) ON DELETE CASCADE;

ALTER TABLE `tentatives_quiz` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `tentatives_quiz` ADD FOREIGN KEY (`id_quiz`) REFERENCES `quiz` (`id_quiz`) ON DELETE CASCADE;

ALTER TABLE `reponses_utilisateur` ADD FOREIGN KEY (`id_tentative`) REFERENCES `tentatives_quiz` (`id_tentative`) ON DELETE CASCADE;

ALTER TABLE `reponses_utilisateur` ADD FOREIGN KEY (`id_question`) REFERENCES `questions` (`id_question`) ON DELETE CASCADE;

ALTER TABLE `reponses_utilisateur` ADD FOREIGN KEY (`id_reponse`) REFERENCES `reponses` (`id_reponse`) ON DELETE SET NULL;

ALTER TABLE `notes_cloud` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `notes_cloud` ADD FOREIGN KEY (`id_document`) REFERENCES `documents` (`id_document`) ON DELETE SET NULL;

ALTER TABLE `favoris` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `favoris` ADD FOREIGN KEY (`id_document`) REFERENCES `documents` (`id_document`) ON DELETE CASCADE;

ALTER TABLE `progression_lecture` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `progression_lecture` ADD FOREIGN KEY (`id_document`) REFERENCES `documents` (`id_document`) ON DELETE CASCADE;

ALTER TABLE `signalements` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `signalements` ADD FOREIGN KEY (`id_document`) REFERENCES `documents` (`id_document`) ON DELETE CASCADE;

ALTER TABLE `signalements` ADD FOREIGN KEY (`id_administrateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE SET NULL;

ALTER TABLE `logs_administration` ADD FOREIGN KEY (`id_administrateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE RESTRICT;

ALTER TABLE `annonces_globales` ADD FOREIGN KEY (`id_administrateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `utilisateurs` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `quotas_utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;

ALTER TABLE `notifications` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE;


--SHOW TABLES;