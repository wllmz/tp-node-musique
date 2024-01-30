const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const port = 5000;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/tp-music");
const cors = require('cors');


const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


const option = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Api Node",
        version: "1.0.0",
        description: "A simple API",
      },
      servers: [
        {
          url: "http://localhost:5000/",
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: { 
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', 
          },
        },
      },
      security: [
        {
          BearerAuth: [], 
        },
      ],
    },
    apis: ["../api/routes/*.js"],
  };

const swaggerSpec = swaggerJSDoc(option);

server.use('/api-test', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  



server.use(cors());

server.use(cors({
    origin: 'http://localhost:3000'
  }));
  

const db = mongoose.connection;


db.on('error', (error) => {
    console.error('Erreur de connexion à MongoDB:', error);
});


db.once('open', () => {
    console.log('Connecté avec succès à MongoDB');
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


const userRoute = require("../api/routes/userRoute");
userRoute(server);

const moduleRoute = require("../api/routes/moduleRoute");
moduleRoute(server);

const musicRoute = require("../api/routes/musicRoute");
musicRoute(server);

const voteRoute = require("../api/routes/voteRoute");
voteRoute(server);



server.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

