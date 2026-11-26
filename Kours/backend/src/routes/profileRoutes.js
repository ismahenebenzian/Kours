// backend/src/routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/authMiddleware');
const profileController = require('../controllers/profileController');
const { updateProfileValidation } = require('../validators/profileValidator');

router.use(requireAuth);

router.get('/me', profileController.getMyProfile);
router.put('/me', updateProfileValidation, profileController.updateMyProfile);
router.delete('/me', profileController.deleteMyAccount);

module.exports = router;