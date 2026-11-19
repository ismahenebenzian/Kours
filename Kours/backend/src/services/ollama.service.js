const { createQuizPrompt } = require('../prompts/quiz.prompt');

async function generateQuiz(courseText, count) {
    const response = await fetch(
        process.env.CLOUDFLARE_WORKER_URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                courseText,
                count
            }),
            signal: AbortSignal.timeout(120000)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Erreur Cloudflare.');
    }

    if (!Array.isArray(data.questions)) {
        throw new Error('Réponse invalide de Cloudflare.');
    }

    return data;
}

module.exports = { generateQuiz };