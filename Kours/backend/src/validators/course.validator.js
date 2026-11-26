const { deleteFile } = require('../utils/file.utils');

// Vérifier qu'une valeur est une chaîne non vide
function isNonEmptyString(value) {
    return (
        typeof value === 'string' &&
        value.trim().length > 0
    );
}

// Vérifier qu'un identifiant est un entier positif
function isPositiveInteger(value) {
    return (
        /^\d+$/.test(String(value)) &&
        Number(value) > 0
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
        domaine_id,
        niveau,
        etablissement_id,
        type_document,
        enseignant,
        annee_universitaire,
        visibilite,
        engagement
    } = req.body;

    const errors = [];

    // Vérification du titre
    if (!isNonEmptyString(titre)) {
        errors.push("Le titre est obligatoire.");
    }

    // Vérification de la description
    if (
        description !== undefined &&
        typeof description !== 'string'
    ) {
        errors.push("La description doit être un texte.");
    }

    // Vérification du domaine
    if (!isPositiveInteger(domaine_id)) {
        errors.push("Le domaine sélectionné est invalide.");
    }

    // Vérification du niveau
    if (!isNonEmptyString(niveau)) {
        errors.push("Le niveau est obligatoire.");
    }

    // Vérification de l'établissement
    if (!isPositiveInteger(etablissement_id)) {
        errors.push("L'établissement sélectionné est invalide.");
    }

    // Vérification du type de document
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

    // Vérification de l'enseignant
    if (
        enseignant !== undefined &&
        typeof enseignant !== 'string'
    ) {
        errors.push("Le nom de l'enseignant doit être un texte.");
    }

    // Vérification de l'année universitaire
    if (
        !isNonEmptyString(annee_universitaire) ||
        !isValidAcademicYear(annee_universitaire)
    ) {
        errors.push("L'année universitaire doit respecter le format 2025-2026.");
    }

    // Vérification de la visibilité
    if (!['public', 'prive'].includes(visibilite)) {
        errors.push("La visibilité doit être public ou prive.");
    }

    // Vérification de l'engagement
    if (engagement !== 'true' && engagement !== true) {
        errors.push("Vous devez accepter l'engagement sur l'honneur.");
    }

    // Si des erreurs existent
    if (errors.length > 0) {

    await deleteFile(req.file?.path);

    return res.status(400).json({
        success: false,
        message: "Les informations du document sont invalides.",
        errors
    });
}

    // Toutes les vérifications sont réussies
    next();
}

module.exports = {
    validateCourse
};
