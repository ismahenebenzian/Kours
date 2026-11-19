ce qui se passe ?
react_frontend (Formulaire de dépôt)
--> route-course.routes.js (POST /api/course)
--> route Express (course.routes.js)
--> Middleware Multer(Récupère et vérifie le fichier PDF)
--> Controller(Vérifie et traite les informations reçues)
--> Service / Model (applique les règles métier et enregistre les informations) 
--> mysql (métadonnée de cours)
--> stockage (fichier pdf)

Les routes utilisés : 

- pour deposer un cours --> POST /api/courses
- pour afficher un cours --> GET /api/courses
- pour consulter un cours --> GET /api/courses/ :id
- recuperer les filtre --> GET /api/courses/filters
- afficher les commentaires --> GET /api/course//id/comments
- ajouter un commentaire --> POST /api/courses/:id/comments
- signaler un cours --> POST /api/courses/ :id/report 


Avant de coder : 

1 - configurer upload des pdfs

--- Pour commencer les fichiers déposé seront enregistrés dans uploat/documents
--- et pour cela nous avons besoin d'installer Multer c'est lui qui va vérifier si il s'agit réellement de 
fichier pdf combien sa taille... 

2 - comment le fichier sera recu ?
- envoie de fichier pdf 
--> multer (qui verifie)
--> src/upload/documents (pdf enregistré sur le serveur)

Pour le code de Multer :
1 -- on va faire les import 
    - importer un module dans le node.js (ce qui va permettre a express de recevoir des fichiers envoyés depuis un formulaire HTTP)
    - importer module path pour manipuler les chemins des fichiers et les dossiers (pour determiner ou enregistrer les PDFs)
    - importer fs pour manipuler fichiers et les dossiers(creer dossier, supprimer, lire) 
    - importer module crypto pour generer un id unique pour chaque PDF

2 -- determiner le dossier de stockage (le code assemble le chemin de fichier actuel)
    __dirname : chemin absolu du dossier dans lequel se trouve actuellement le fichier js (dossier actuel du code)

3 -- creer auto le dossier
ici on doit creer le dossier destiné a recevoir les PDF
pour eviter a chaque installation de creer manuellement le dossier de stockage

4 -- configurer stockage Multer : pour definir comment et où les fichiers seront enregistrés sur le disque

on utilise diskstorage pour enregistrer les pdfs directement dans un dossier de notre serveur pour ce faire :
--> destination : où enregistrer le fichier
--> filename : sous quel nom enregistré le fichier 
cb(null, uploadDirectory) --> on dit a multer : pas d'erreru tu peux enregistrer le fichier dans ce dossier 
 







