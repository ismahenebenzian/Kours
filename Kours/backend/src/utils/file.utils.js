const fs = require('fs/promises');


// Supprimer un fichier
async function deleteFile(filePath) {

    if (!filePath) {
        return;
    }

    try {

        await fs.unlink(filePath);

    } catch (error) {

        if (error.code !== 'ENOENT') {
            console.error(
                "Erreur de suppression du fichier :",
                error
            );
        }
    }
}


// Vérifier la signature d'un PDF
async function isPdfFile(filePath) {

    const file = await fs.open(filePath, 'r');

    try {

        const buffer = Buffer.alloc(5);

        await file.read(buffer, 0, 5, 0);

        return buffer.toString() === '%PDF-';

    } finally {

        await file.close();
    }
}


module.exports = {
    deleteFile,
    isPdfFile
};