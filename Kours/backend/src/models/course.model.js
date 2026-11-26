const db = require('../config/db');


// Rechercher un domaine par son nom
async function findDomainByName(name) {

    const sql = `
        SELECT id_domaine
        FROM domaines
        WHERE LOWER(TRIM(nom_domaine)) = LOWER(TRIM(?))
        LIMIT 1
    `;

    const [rows] = await db.promise().execute(sql, [name]);

    return rows[0];
}


// Rechercher un établissement par son nom
async function findEstablishmentByName(name) {

    const sql = `
        SELECT id_etablissement
        FROM etablissements
        WHERE LOWER(TRIM(nom_etablissement)) = LOWER(TRIM(?))
        LIMIT 1
    `;

    const [rows] = await db.promise().execute(sql, [name]);

    return rows[0];
}


// Déposer un nouveau cours
async function createCourse(course) {

    const sql = `
        INSERT INTO documents (
            titre,
            niveau,
            description,
            chemin_fichier_pdf,
            auteur_enseignant,
            annee_academique,
            engagement_honneur,
            type_document,
            statut_publication,
            visibilite,
            id_utilisateur,
            id_domaine,
            id_etablissement
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        course.titre,
        course.niveau,
        course.description,
        course.chemin_fichier_pdf,
        course.auteur_enseignant,
        course.annee_academique,
        course.engagement_honneur,
        course.type_document,
        course.statut_publication,
        course.visibilite,
        course.id_utilisateur,
        course.id_domaine,
        course.id_etablissement
    ];

    const [result] = await db.promise().execute(sql, values);

    return result.insertId;
}


// Récupérer tous les cours publics
async function getAllCourses() {

    const sql = `
        SELECT
            d.id_document,
            d.titre,
            d.niveau,
            d.description,
            d.type_document,
            d.auteur_enseignant,
            d.annee_academique,
            d.visibilite,
            u.nom,
            u.prenom,
            dom.nom_domaine,
            e.nom_etablissement

        FROM documents d

        JOIN utilisateurs u
            ON d.id_utilisateur = u.id_utilisateur

        JOIN domaines dom
            ON d.id_domaine = dom.id_domaine

        LEFT JOIN etablissements e
            ON d.id_etablissement = e.id_etablissement

        WHERE d.statut_publication = 'publie'
        AND d.visibilite = 'public'
    `;

    const [rows] = await db.promise().execute(sql);

    return rows;
}


// Récupérer un cours public par son ID
async function getCourseById(id) {

    const sql = `
        SELECT
            id_document,
            titre,
            niveau,
            description,
            auteur_enseignant,
            annee_academique,
            type_document,
            visibilite,
            id_utilisateur,
            id_domaine,
            id_etablissement

        FROM documents

        WHERE id_document = ?
        AND statut_publication = 'publie'
        AND visibilite = 'public'
    `;

    const [rows] = await db.promise().execute(sql, [id]);

    return rows[0];
}


module.exports = {
    findDomainByName,
    findEstablishmentByName,
    createCourse,
    getAllCourses,
    getCourseById
};