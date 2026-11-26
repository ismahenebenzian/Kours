const courseModel = require('../models/course.model');


// Déposer un cours
async function depositCourse(data, file, userId) {

    // Rechercher le domaine
    const domaine = await courseModel.findDomainByName(
        data.domaine.trim()
    );

    if (!domaine) {
        const error = new Error("Ce domaine n'existe pas.");
        error.status = 400;
        throw error;
    }

    // Rechercher l'établissement
    const etablissement =
        await courseModel.findEstablishmentByName(
            data.etablissement.trim()
        );

    if (!etablissement) {
        const error = new Error("Cet établissement n'existe pas.");
        error.status = 400;
        throw error;
    }

    const course = {

        titre: data.titre.trim(),

        niveau: data.niveau.trim(),

        description: data.description?.trim() || null,

        chemin_fichier_pdf:
            'documents/' + file.filename,

        auteur_enseignant:
            data.enseignant?.trim() || null,

        annee_academique:
            data.annee_universitaire.trim(),

        engagement_honneur: true,

        type_document: data.type_document,

        statut_publication: 'en_attente',

        visibilite: data.visibilite,

        id_utilisateur: userId,

        id_domaine: domaine.id_domaine,

        id_etablissement: etablissement.id_etablissement
    };

    const courseId = await courseModel.createCourse(course);

    return courseId;
}


// Récupérer tous les cours
async function getAllCourses() {

    return await courseModel.getAllCourses();
}


// Récupérer un cours par ID
async function getCourseById(id) {

    return await courseModel.getCourseById(id);
}


module.exports = {
    depositCourse,
    getAllCourses,
    getCourseById
};