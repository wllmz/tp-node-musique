module.exports = (server) => {
    const MusicController = require("../controllers/musicController");
    const jwtverifytoken = require("../middleware/jwtMiddleware");
    const { requireAdminRole } = require("../middleware/authJwt");

    server.route("/:moduleId/musics")
        .get(jwtverifytoken.verifyToken, MusicController.listAllMusic)
        .post(jwtverifytoken.verifyToken, MusicController.createMusic);

    server.route("/musics/:musicId")
        .delete(jwtverifytoken.verifyToken, requireAdminRole, MusicController.deleteMusic)
        .put(jwtverifytoken.verifyToken, requireAdminRole, MusicController.updateMusic)
        .get(jwtverifytoken.verifyToken,  MusicController.getMusicById);
}