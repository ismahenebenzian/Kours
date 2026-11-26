const express = require('express');

const authController = require('../controllers/authController');
const supabaseAuthMiddleware = require('../middlewares/supabaseAuthMiddleware');

const router = express.Router();

// Synchroniser l'utilisateur Supabase avec MySQL
router.post('/sync', supabaseAuthMiddleware, authController.syncUser);

module.exports = router;