const courseModel = require('../models/course.model');


// Déposer un cours
async function depositCourse(data, file, userId) {

    const course = {

        titre: data.titre.trim(),

        niveau: data.niveau.trim(),

        description: data.description?.trim() || null,

        chemin_fichier_pdf:
            'documents/' + file.filename,

        auteur_enseignant:
            data.enseignant?.trim() || null,

        annee_academique:
            data.annee_universitaire,

        engagement_honneur: true,

        type_document: data.type_document,

        statut_publication: 'en_attente',

        visibilite: data.visibilite,

        id_utilisateur: userId,

        id_domaine: Number(data.domaine_id),

        id_etablissement: Number(data.etablissement_id)
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