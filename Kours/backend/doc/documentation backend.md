Dans le dossier backend voila la chaine de fonctionnement :

1. Frontend(React): l'utilisateur effectue une action par exemple : connexion, dépôt de cours, création d'un quiz, etc

2. routes/ : détermine quelle route API reçoit la demande et vers quel traitement elle doit être dirigée

3. middlewares/ : vérifie les autorisations de l'utilisateur(si il est connecté? il est administrateur?)

4. validators/ : vérifie que les données envoyées sont correctes(e-mail valide, champs obligatoires remplis,.....)

5. controllers/ : récupère la demande et organise les actions à effectuer

6. services/ : réalise les traitements métier nécessaires(génération de quiz avec Gemini,traitement des PDF,notifications,....)

7. models/ : effectue les opérations nécessaires dans la base de données(ajouter,modifier,supprimer ou récupérer des informations)

8. Base de données mysql: stocke les informations ou bine il renvoie les données demandées

9. Réponse au frontend: le backend renvoie le résultat au frontend qui va l'affiche ensuite à l'utilisateur


Les autres dossiers qui accompagnent le backend :
- config/ : contient les configurations techniques : la connexion a mysql
- utils/ : regroupe les fonctions utiles et réutilisables
- uploads/ : stocke les fichiers déposés par les utilisateurs comme les pdfs
- sql/ : contient les scripts SQL pour créer et préparer la base de données
- docs/ : contient la documentation technique du backend, la liste API des routes, 



Les deux fichiers principaux :
- app.js : configure l'application Express et rassemble les routes et middlewares
- server.js : démarre le serveur backend