module.exports = (server) => {
    const MusicController = require("../controllers/musicController");
    const jwtverifytoken = require("../middleware/jwtMiddleware");

    /**
     * @swagger
     * /{moduleId}/musics:
     *   get:
     *     summary: Liste toutes les musiques pour un module donné
     *     tags: [Music]
     *     parameters:
     *       - in: path
     *         name: moduleId
     *         required: true
     *         description: ID du module pour lequel lister les musiques
     *         schema:
     *           type: string
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Liste des musiques
     *       401:
     *         description: Non autorisé
     *   post:
     *     summary: Crée une nouvelle musique pour un module
     *     tags: [Music]
     *     parameters:
     *       - in: path
     *         name: moduleId
     *         required: true
     *         description: ID du module pour lequel créer la musique
     *         schema:
     *           type: string
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               artist:
     *                 type: string
     *     responses:
     *       201:
     *         description: Musique créée
     *       401:
     *         description: Non autorisé
     */
    server.route("/:moduleId/musics")
        .get(jwtverifytoken.verifyToken, MusicController.listAllMusic)
        .post(jwtverifytoken.verifyToken, MusicController.createMusic);

    /**
     * @swagger
     * /musics/{musicId}:
     *   get:
     *     summary: Récupère une musique par son ID
     *     tags: [Music]
     *     parameters:
     *       - in: path
     *         name: musicId
     *         required: true
     *         description: ID de la musique à récupérer
     *         schema:
     *           type: string
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Détails de la musique
     *       401:
     *         description: Non autorisé
     *   put:
     *     summary: Met à jour une musique
     *     tags: [Music]
     *     parameters:
     *       - in: path
     *         name: musicId
     *         required: true
     *         description: ID de la musique à mettre à jour
     *         schema:
     *           type: string
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               artist:
     *                 type: string
     *     responses:
     *       200:
     *         description: Musique mise à jour
     *       401:
     *         description: Non autorisé
     *   delete:
     *     summary: Supprime une musique
     *     tags: [Music]
     *     parameters:
     *       - in: path
     *         name: musicId
     *         required: true
     *         description: ID de la musique à supprimer
     *         schema:
     *           type: string
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Musique supprimée
     *       401:
     *         description: Non autorisé
     */
    server.route("/musics/:musicId")
        .delete(jwtverifytoken.verifyToken, MusicController.deleteMusic)
        .put(jwtverifytoken.verifyToken, MusicController.updateMusic)
        .get(jwtverifytoken.verifyToken,  MusicController.getMusicById);
};
