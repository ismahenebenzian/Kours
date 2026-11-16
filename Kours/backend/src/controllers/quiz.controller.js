
const { generateQuiz } = require('../services/ollama.service');

async function createQuiz(req, res) {
    try {
        const { courseText, count } = req.body;

        if (
            typeof courseText !== 'string' ||
            !courseText.trim() ||
            !Number.isInteger(count) ||
            count < 1 ||
            count > 50
        ) {
            return res.status(400).json({
                success: false,
                error: 'Données invalides.'
            });
        }

        const quiz = await generateQuiz(courseText, count);

        const questions = quiz.questions;

        if (!Array.isArray(questions)) {
            throw new Error('Format de quiz invalide.');
        }

        const validQuestions = questions.filter(question => {
            if (
                !question?.text?.trim() ||
                !Array.isArray(question.options) ||
                question.options.length !== 4
            ) {
                return false;
            }

            const validOptions = question.options.every(option =>
                typeof option.text === 'string' &&
                option.text.trim() &&
                typeof option.isCorrect === 'boolean'
            );

            const correctCount = question.options.filter(
                option => option.isCorrect
            ).length;

            return validOptions && correctCount === 1;
        });

        if (validQuestions.length === 0) {
            throw new Error('Aucune question valide générée.');
        }

        res.json({
            success: true,
            questions: validQuestions.slice(0, count),
            count: Math.min(validQuestions.length, count)
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = { createQuiz };
