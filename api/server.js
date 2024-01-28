const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const port = 5000;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/tp-music");
const cors = require('cors');


server.use(cors());

server.use(cors({
    origin: 'http://localhost:3000'
  }));
  

const db = mongoose.connection;

// Gestionnaire d'erreurs de connexion
db.on('error', (error) => {
    console.error('Erreur de connexion à MongoDB:', error);
});

// Confirmation de la connexion réussie
db.once('open', () => {
    console.log('Connecté avec succès à MongoDB');
});


const musicRoute = require("../api/routes/musicRoute");
musicRoute(server);

const voteRoute = require("../api/routes/voteRoute");
voteRoute(server);


// Démarrer le serveur
server.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

