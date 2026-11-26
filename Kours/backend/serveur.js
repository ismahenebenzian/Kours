// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.json());

// app.get('/', (req, res) => {
//   res.json({ message: 'Serveur Node.js opérationnel !' });
// });

// app.post('/data', (req, res) => {
//   res.json({ recu: req.body });
// });

// app.listen(port, () => {
//   console.log(`Serveur en écoute sur http://localhost:${port}`);
// });



// backend/serveur.js
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});