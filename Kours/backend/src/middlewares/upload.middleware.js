
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Dossier de stockage des documents
const uploadDirectory = path.join(
    __dirname,
    '../upload/documents'
);

// creer dossier s'il n'existe pas
fs.mkdirSync(uploadDirectory, { recursive: true });

// Configuration du stockage
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {

        // Générer un nom de fichier unique
        const uniqueName = crypto.randomUUID();

        // Conserver l'extension PDF
        cb(null, uniqueName + '.pdf');
    }
});

// Vérification du fichier
const fileFilter = (req, file, cb) => {

    const extension = path.extname(file.originalname).toLowerCase();

    if (
        extension === '.pdf' &&
        file.mimetype === 'application/pdf'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Seuls les fichiers PDF sont autorisés.'));
    }
};

// Configuration générale
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 Mo maximum
    }
});

// Un seul fichier PDF par dépôt
const uploadPdf = upload.single('fichier');

module.exports = uploadPdf;
