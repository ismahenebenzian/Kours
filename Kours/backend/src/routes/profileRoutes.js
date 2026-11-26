const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const { updateProfileValidation } = require('../validators/profileValidator');
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/profileController');

router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, updateProfileValidation, updateProfile);
router.delete('/me', authMiddleware, deleteProfile);

router.get('/:id', authMiddleware, getProfile);
router.put('/:id', authMiddleware, updateProfileValidation, updateProfile);
router.delete('/:id', authMiddleware, deleteProfile);

module.exports = router;