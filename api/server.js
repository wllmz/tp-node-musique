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

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


const userRoute = require("../api/routes/userRoute");
userRoute(server);

const moduleRoute = require("../api/routes/moduleRoute");
moduleRoute(server);



// Démarrer le serveur
server.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

