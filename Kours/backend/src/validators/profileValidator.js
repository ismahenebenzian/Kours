// backend/src/validators/profileValidator.js
const { body } = require('express-validator');

const updateProfileValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('Le prénom est obligatoire')
    .isLength({ max: 100 })
    .withMessage('Le prénom est trop long'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Le nom est obligatoire')
    .isLength({ max: 100 })
    .withMessage('Le nom est trop long'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage("Format d'email invalide")
    .normalizeEmail(),
  body('fieldOfStudy')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 120 }),
  body('academicLevel')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 80 }),
  body('institution')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 150 }),
];

module.exports = {
  updateProfileValidation,
};