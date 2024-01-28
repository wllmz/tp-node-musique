module.exports = (server) => {
    const ModuleController = require("../controllers/moduleController");
    const jwtverifytoken = require("../middleware/jwtMiddleware");
    const { requireAdminRole } = require("../middleware/authJwt");

    server.route("/modules")
        .get(jwtverifytoken.verifyToken, ModuleController.listAllModules)
        .post(jwtverifytoken.verifyToken, requireAdminRole, ModuleController.createModule);

        server.route("/modules/futurs")
        .get(jwtverifytoken.verifyToken, ModuleController.listAllModulesFuturs);    

    server.route("/modules/:moduleId")
        .delete(jwtverifytoken.verifyToken, requireAdminRole, ModuleController.deleteModule)
        .put(jwtverifytoken.verifyToken, requireAdminRole, ModuleController.updateModule)
        .get(jwtverifytoken.verifyToken,  ModuleController.getModuleById);
}