const { body } = require('express-validator');

const updateProfileValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('Le prénom est obligatoire')
    .isLength({ max: 100 })
    .withMessage('Le prénom ne doit pas dépasser 100 caractères'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Le nom est obligatoire')
    .isLength({ max: 100 })
    .withMessage('Le nom ne doit pas dépasser 100 caractères'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage("L'adresse e-mail est obligatoire")
    .isEmail()
    .withMessage("Format d'adresse e-mail invalide")
    .normalizeEmail(),

  body('fieldOfStudy')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 120 })
    .withMessage('Le domaine est trop long'),

  body('academicLevel')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 80 })
    .withMessage('Le niveau est trop long'),

  body('institution')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 150 })
    .withMessage("Le nom de l'établissement est trop long"),
];

module.exports = {
  updateProfileValidation,
};