const courseService = require('../services/course.service');
const authModel = require('../models/authModel');

const {
    deleteFile,
    isPdfFile
} = require('../utils/file.utils');


// Déposer un cours
async function depositCourse(req, res) {

    try {

        // Vérifier la présence du fichier
        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Un fichier PDF est obligatoire."
            });
        }

        // Vérifier la signature du PDF
        if (!(await isPdfFile(req.file.path))) {

            await deleteFile(req.file.path);

            return res.status(400).json({
                success: false,
                message: "Le fichier PDF est invalide."
            });
        }

        // Récupérer l'utilisateur Supabase authentifié
        const supabaseId = req.supabaseUser?.id;

        if (!supabaseId) {

            await deleteFile(req.file.path);

            return res.status(401).json({
                success: false,
                message: "Vous devez être connecté."
            });
        }

        // Rechercher l'utilisateur dans MySQL
        const utilisateur =
            await authModel.findBySupabaseId(supabaseId);

        if (!utilisateur) {

            await deleteFile(req.file.path);

            return res.status(403).json({
                success: false,
                message: "Votre compte n'est pas synchronisé."
            });
        }

        // Récupérer son véritable identifiant MySQL
        const userId = utilisateur.id_utilisateur;

        // Enregistrer le cours
        const courseId = await courseService.depositCourse(
            req.body,
            req.file,
            userId
        );

        return res.status(201).json({
            success: true,
            message: "Cours déposé avec succès.",
            id_document: courseId
        });

    } catch (error) {

        await deleteFile(req.file?.path);

        console.error(error);

        if (error.status === 400) {

            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Erreur lors du dépôt du cours."
        });
    }
}


// Récupérer tous les cours
async function getAllCourses(req, res) {

    try {

        const courses = await courseService.getAllCourses();

        return res.status(200).json({
            success: true,
            total: courses.length,
            data: courses
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des cours."
        });
    }
}


// Récupérer un cours par son ID
async function getCourseById(req, res) {

    try {

        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {

            return res.status(400).json({
                success: false,
                message: "Identifiant invalide."
            });
        }

        const course = await courseService.getCourseById(id);

        if (!course) {

            return res.status(404).json({
                success: false,
                message: "Cours introuvable."
            });
        }

        return res.status(200).json({
            success: true,
            data: course
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération du cours."
        });
    }
}


module.exports = {
    depositCourse,
    getAllCourses,
    getCourseById
};