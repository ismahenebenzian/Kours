const { deleteFile } = require('../utils/file.utils');

// Vérifier qu'une valeur est une chaîne non vide
function isNonEmptyString(value) {
    return (
        typeof value === 'string' &&
        value.trim().length > 0
    );
}

// Vérifier le format d'une année universitaire
function isValidAcademicYear(value) {
    if (!/^\d{4}-\d{4}$/.test(value)) {
        return false;
    }

    const [start, end] = value.split('-').map(Number);

    return end === start + 1;
}

// Vérifier les informations du document
async function validateCourse(req, res, next) {

    const {
        titre,
        description,
        domaine,
        niveau,
        etablissement,
        type_document,
        enseignant,
        annee_universitaire,
        visibilite,
        engagement
    } = req.body;

    const errors = [];

    if (!isNonEmptyString(titre)) {
        errors.push("Le titre est obligatoire.");
    }

    if (
        description !== undefined &&
        typeof description !== 'string'
    ) {
        errors.push("La description doit être un texte.");
    }

    if (!isNonEmptyString(domaine)) {
        errors.push("Le domaine est obligatoire.");
    }

    if (!isNonEmptyString(niveau)) {
        errors.push("Le niveau est obligatoire.");
    }

    if (!isNonEmptyString(etablissement)) {
        errors.push("L'établissement est obligatoire.");
    }

    const allowedTypes = [
        'cours_complet',
        'fiche_revision',
        'resume',
        'sujet',
        'sujet_corrige',
        'correction',
        'autre'
    ];

    if (!allowedTypes.includes(type_document)) {
        errors.push("Le type de document est invalide.");
    }

    if (
        enseignant !== undefined &&
        typeof enseignant !== 'string'
    ) {
        errors.push("Le nom de l'enseignant doit être un texte.");
    }

    if (
        !isNonEmptyString(annee_universitaire) ||
        !isValidAcademicYear(annee_universitaire.trim())
    ) {
        errors.push(
            "L'année universitaire doit respecter le format 2025-2026."
        );
    }

    if (!['public', 'prive'].includes(visibilite)) {
        errors.push("La visibilité doit être public ou prive.");
    }

    if (engagement !== 'true' && engagement !== true) {
        errors.push(
            "Vous devez accepter l'engagement sur l'honneur."
        );
    }

    if (errors.length > 0) {

        await deleteFile(req.file?.path);

        return res.status(400).json({
            success: false,
            message: "Les informations du document sont invalides.",
            errors
        });
    }

    next();
}

module.exports = {
    validateCourse
};