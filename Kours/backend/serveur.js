
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const quizRoutes = require('./src/routes/quiz.routes');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Serveur Kours opérationnel !'
    });
});

app.post('/data', (req, res) => {
    res.json({ recu: req.body });
});

app.use('/api', quizRoutes);

app.listen(PORT, () => {
    console.log(`Serveur Kours : http://localhost:${PORT}`);
});
