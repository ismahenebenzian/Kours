const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Serveur Node.js opérationnel !' });
});

app.post('/data', (req, res) => {
  res.json({ recu: req.body });
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});