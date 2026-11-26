const express = require('express');
const router = express.Router();
const multer = require('multer');

const courseController = require(
    '../controllers/course.controller'
);

const uploadPdf = require(
    '../middlewares/upload.middleware'
);

const supabaseAuthMiddleware = require(
    '../middlewares/supabaseAuthMiddleware'
);

const { validateCourse } = require(
    '../validators/course.validator'
);


// Déposer un cours
router.post(
    '/courses',
    supabaseAuthMiddleware,
    uploadPdf,
    validateCourse,
    courseController.depositCourse
);


// Récupérer tous les cours
router.get(
    '/courses',
    courseController.getAllCourses
);


// Récupérer un cours par son ID
router.get(
    '/courses/:id',
    courseController.getCourseById
);


// Gestion des erreurs d'upload
router.use((err, req, res, next) => {

    if (err instanceof multer.MulterError) {

        if (err.code === 'LIMIT_FILE_SIZE') {

            return res.status(413).json({
                success: false,
                message: "Le fichier ne doit pas dépasser 10 Mo."
            });
        }

        return res.status(400).json({
            success: false,
            message: "Erreur lors de l'envoi du fichier."
        });
    }

    if (err.message === 'Seuls les fichiers PDF sont autorisés.') {

        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    next(err);
});


module.exports = router;