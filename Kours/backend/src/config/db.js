const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;
app.use(express.json());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'user',
  password: 'user', 
  database: 'Kours'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
    return;
  }
  console.log('Connexion à MySQL réussie');
});
