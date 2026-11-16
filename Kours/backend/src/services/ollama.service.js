
const { createQuizPrompt } = require('../prompts/quiz.prompt');

async function generateQuiz(courseText, count) {

    const response = await fetch(
        'http://127.0.0.1:11434/api/chat',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama3.2:3b',
                messages: [
                    {
                        role: 'user',
                        content: createQuizPrompt(courseText, count)
                    }
                ],
                format: 'json',
                stream: false,
                options: {
                    num_predict: 4096,
                    temperature: 0.2
                }
            }),
            signal: AbortSignal.timeout(120000)
        }
    );

    if (!response.ok) {
        throw new Error(`Erreur Ollama : ${await response.text()}`);
    }

    const data = await response.json();

    if (!data.message?.content) {
        throw new Error('Réponse vide de Ollama.');
    }

    return JSON.parse(data.message.content);
}

module.exports = { generateQuiz };
