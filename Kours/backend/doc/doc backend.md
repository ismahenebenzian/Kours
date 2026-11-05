Dans le dossier backend la chaîne de fonctionnement est la suivante :

1. Frontend(React): l'utilisateur effectue une action(connexion, dépôt de cours, création d'un quiz, etc.)

2. routes/ : détermine quelle route API reçoit la demande et vers quel traitement elle doit être dirigée

3. middlewares/ : vérifie les autorisations de l'utilisateur (est-il connecté? Est-il administrateur? )

4. validators/ : vérifie que les données envoyées sont correctes (e-mail valide, champs obligatoires remplis....)

5. controllers/ : récupère la demande et organise les actions à effectuer

6. services/ : réalise les traitements métier nécessaires (génération de quiz avec Gemini, traitement des PDF, notifications,.....)

7. models/ : effectue les opérations nécessaires dans la base de données (ajouter, modifier, supprimer ou récupérer des informations)

8. Base de données MySQL : stocke les informations ou renvoie les données demandées 

9. Réponse au frontend : le backend renvoie le résultat au frontend, qui l'affiche à l'utilisateur


Les autres dossiers qui accompagnent le backend :
- config/ : Configuration de MySQL et de l'environnement
- utils/ : regroupe les fonctions utiles et réutilisables
- uploads/ : stocke les fichiers déposés par les utilisateurs, notamment les PDF
- sql/ : contient les scripts SQL pour créer et préparer la base de données
- docs/ : contient la documentation technique du backend



Les deux fichiers principaux :
- app.js : configure l'application Express et rassemble les routes et middlewares
- server.js : démarre le serveur backend
- config/db.js : etablie connexion avec mysql
.env : contient les informations privées de configuration
.env.example : donne un modèle de configuration sans secrets
.gitignore : empêche l'envoi de fichiers inutiles ou confidentiels