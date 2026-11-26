// backend/app.js
const express = require('express');
const profileRoutes = require('./src/routes/profileRoutes');
const howItWorksRoutes = require('./src/routes/howItWorksRoutes');

const app = express();

app.use(express.json());

app.use('/api/how-it-works', howItWorksRoutes);

// CORS simple pour autoriser le frontend Vite/React en local
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-user-id');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  return next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Serveur Kours opérationnel !' });
});

app.use('/api/profile', profileRoutes);

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Erreur serveur',
  });
});

module.exports = app;