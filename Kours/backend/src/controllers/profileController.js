const { validationResult } = require('express-validator');
const {
  findUserById,
  findUserByEmailExcludingId,
  updateUserById,
  deleteUserById,
} = require('../models/profileModel');

function formatProfile(row) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    fieldOfStudy: row.field_of_study || '',
    academicLevel: row.academic_level || '',
    institution: row.institution || '',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function getTargetUserId(req) {
  if (req.params.id) {
    const parsedId = Number(req.params.id);
    return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
  }
  return req.user?.id || null;
}

async function getProfile(req, res, next) {
  try {
    const userId = getTargetUserId(req);
    if (!userId) {
      return res.status(400).json({ message: 'Identifiant utilisateur invalide' });
    }

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Profil introuvable' });
    }

    return res.status(200).json({ profile: formatProfile(user) });
  } catch (error) {
    return next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Données invalides',
        errors: errors.array(),
      });
    }

    const userId = getTargetUserId(req);
    if (!userId) {
      return res.status(400).json({ message: 'Identifiant utilisateur invalide' });
    }

    const existing = await findUserById(userId);
    if (!existing) {
      return res.status(404).json({ message: 'Profil introuvable' });
    }

    const {
      firstName,
      lastName,
      email,
      fieldOfStudy,
      academicLevel,
      institution,
    } = req.body;

    const emailTaken = await findUserByEmailExcludingId(email, userId);
    if (emailTaken) {
      return res.status(409).json({
        message: 'Cette adresse e-mail est déjà utilisée par un autre compte',
      });
    }

    const updated = await updateUserById(userId, {
      firstName,
      lastName,
      email,
      fieldOfStudy,
      academicLevel,
      institution,
    });

    return res.status(200).json({
      message: 'Profil mis à jour avec succès',
      profile: formatProfile(updated),
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteProfile(req, res, next) {
  try {
    const userId = getTargetUserId(req);
    if (!userId) {
      return res.status(400).json({ message: 'Identifiant utilisateur invalide' });
    }

    const deleted = await deleteUserById(userId);
    if (!deleted) {
      return res.status(404).json({ message: 'Profil introuvable' });
    }

    return res.status(200).json({ message: 'Compte supprimé avec succès' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};