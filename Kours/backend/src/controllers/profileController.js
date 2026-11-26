// backend/src/controllers/profileController.js
const { validationResult } = require('express-validator');
const profileModel = require('../models/profileModel');

async function getMyProfile(req, res, next) {
  try {
    const profile = await profileModel.findProfileById(req.user.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profil introuvable' });
    }
    return res.json(profile);
  } catch (err) {
    return next(err);
  }
}

async function updateMyProfile(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Données invalides',
        errors: errors.array(),
      });
    }

    const updated = await profileModel.updateProfileById(req.user.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      fieldOfStudy: req.body.fieldOfStudy ?? null,
      academicLevel: req.body.academicLevel ?? null,
      institution: req.body.institution ?? null,
    });

    return res.json(updated);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Cet email est déjà utilisé' });
    }
    return next(err);
  }
}

async function deleteMyAccount(req, res, next) {
  try {
    const deleted = await profileModel.deleteUserById(req.user.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Compte introuvable' });
    }
    return res.json({ message: 'Compte supprimé avec succès' });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
};