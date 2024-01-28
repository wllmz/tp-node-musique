module.exports = (server) => {
    const userController = require("../controllers/userController");
    const jwtverifytoken = require("../middleware/jwtMiddleware");
    const { requireAdminRole } = require("../middleware/authJwt");

    server.route("/register")
        .post(userController.register);

    server.route("/signin")
        .post(userController.userLogin);


    server.route("/alluser")
        .get(jwtverifytoken.verifyToken, requireAdminRole, userController.Alluser);
};