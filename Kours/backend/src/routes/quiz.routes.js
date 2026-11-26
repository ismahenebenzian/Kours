
const express = require('express');
const router = express.Router();

const { createQuiz } = require('../controllers/quiz.controller');

router.post('/generate-quiz', createQuiz);

module.exports = router;
