const express = require('express');
const router = express.Router();
const { getHowItWorks } = require('../controllers/howItWorksController');

router.get('/', getHowItWorks);

module.exports = router;