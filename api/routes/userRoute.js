module.exports = (server) => {
    const userController = require("../controllers/userController");
    const jwtverifytoken = require("../middleware/jwtMiddleware");
    const { requireAdminRole } = require("../middleware/authJwt");

    /**
     * @swagger
     * /register:
     *   post:
     *     summary: Enregistre un nouvel utilisateur
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - password
     *             properties:
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Utilisateur enregistré avec succès
     *       400:
     *         description: Erreur dans les données d'entrée
     */
    server.route("/register")
        .post(userController.register);

    /**
     * @swagger
     * /signin:
     *   post:
     *     summary: Connexion utilisateur
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - password
     *             properties:
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Connexion réussie
     *       401:
     *         description: Authentification échouée
     */
    server.route("/signin")
        .post(userController.userLogin);

    /**
     * @swagger
     * /alluser:
     *   get:
     *     summary: Récupère tous les utilisateurs (Admin seulement)
     *     tags: [User]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Liste de tous les utilisateurs
     *       401:
     *         description: Non autorisé
     */
    server.route("/alluser")
        .get(jwtverifytoken.verifyToken, requireAdminRole, userController.Alluser);
};
