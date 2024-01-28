module.exports = (server) => {
    const voteController = require("../controllers/voteController");
    const jwtverifytoken = require("../middleware/jwtMiddleware");

    server.route("/votes/musics/:musicId")
        .get(jwtverifytoken.verifyToken, voteController.getAllVotesForMusic)
        .post(jwtverifytoken.verifyToken, voteController.createVote);



        server.route("/votes/:voteId")
        .delete(jwtverifytoken.verifyToken, voteController.deleteVote)
        .put(jwtverifytoken.verifyToken, voteController.updateVote)
        .get(jwtverifytoken.verifyToken,  voteController.getVoteById);
}
