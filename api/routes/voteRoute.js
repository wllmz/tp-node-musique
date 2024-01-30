module.exports = (server) => {
    const voteController = require("../controllers/voteController");
    const jwtverifytoken = require("../middleware/jwtMiddleware");

    /**
     * @swagger
     * /votes/musics/{musicId}:
     *   get:
     *     summary: Récupère tous les votes pour une musique donnée
     *     tags: [Votes]
     *     parameters:
     *       - in: path
     *         name: musicId
     *         required: true
     *         description: ID de la musique pour laquelle récupérer les votes
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Liste des votes pour la musique
     *       401:
     *         description: Non autorisé
     *   post:
     *     summary: Crée un vote pour une musique
     *     tags: [Votes]
     *     parameters:
     *       - in: path
     *         name: musicId
     *         required: true
     *         description: ID de la musique à voter
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Vote créé
     *       401:
     *         description: Non autorisé
     */
    server.route("/votes/musics/:musicId")
        .get(jwtverifytoken.verifyToken, voteController.getAllVotesForMusic)
        .post(jwtverifytoken.verifyToken, voteController.createVote);

    /**
     * @swagger
     * /votes/{voteId}:
     *   get:
     *     summary: Récupère un vote par son ID
     *     tags: [Votes]
     *     parameters:
     *       - in: path
     *         name: voteId
     *         required: true
     *         description: ID du vote à récupérer
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Détails du vote
     *       401:
     *         description: Non autorisé
     *   put:
     *     summary: Met à jour un vote
     *     tags: [Votes]
     *     parameters:
     *       - in: path
     *         name: voteId
     *         required: true
     *         description: ID du vote à mettre à jour
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Vote mis à jour
     *       401:
     *         description: Non autorisé
     *   delete:
     *     summary: Supprime un vote
     *     tags: [Votes]
     *     parameters:
     *       - in: path
     *         name: voteId
     *         required: true
     *         description: ID du vote à supprimer
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Vote supprimé
     *       401:
     *         description: Non autorisé
     */
    server.route("/votes/:voteId")
        .delete(jwtverifytoken.verifyToken, voteController.deleteVote)
        .put(jwtverifytoken.verifyToken, voteController.updateVote)
        .get(jwtverifytoken.verifyToken,  voteController.getVoteById);
}
