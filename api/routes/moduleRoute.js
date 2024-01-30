module.exports = (server) => {
    const ModuleController = require("../controllers/moduleController");
    const jwtverifytoken = require("../middleware/jwtMiddleware");
    const { requireAdminRole } = require("../middleware/authJwt");

/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: API pour gérer les modules
 */

/**
 * @swagger
 * /modules:
 *   get:
 *     summary: Récupérer la liste de tous les modules
 *     tags: [Modules]
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Succès
 */
server.get("/modules", jwtverifytoken.verifyToken, ModuleController.listAllModules);

/**
 * @swagger
 * /modules/futurs:
 *   get:
 *     summary: Récupérer la liste de tous les modules futurs
 *     tags: [Modules]
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Succès
 */
server.get("/modules/futurs", jwtverifytoken.verifyToken, ModuleController.listAllModulesFuturs);

/**
 * @swagger
 * /modules/{moduleId}:
 *   get:
 *     summary: Récupérer un module par ID
 *     tags: [Modules]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: moduleId
 *         in: path
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: Succès
 */
server.get("/modules/:moduleId", jwtverifytoken.verifyToken, ModuleController.getModuleById);

/**
 * @swagger
 * /modules/{moduleId}:
 *   put:
 *     summary: Mettre à jour un module par ID
 *     tags: [Modules]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: moduleId
 *         in: path
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: Module mis à jour avec succès
 */
server.put("/modules/:moduleId", jwtverifytoken.verifyToken, requireAdminRole, ModuleController.updateModule);

/**
 * @swagger
 * /modules/{moduleId}:
 *   delete:
 *     summary: Supprimer un module par ID
 *     tags: [Modules]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: moduleId
 *         in: path
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       204:
 *         description: Module supprimé avec succès
 */
server.delete("/modules/:moduleId", jwtverifytoken.verifyToken, requireAdminRole, ModuleController.deleteModule);

/**
 * @swagger
 * /modules:
 *   post:
 *     summary: Créer un nouveau module
 *     tags: [Modules]
 *     security:
 *       - JWT: []
 *     responses:
 *       201:
 *         description: Module créé avec succès
 */
server.post("/modules", jwtverifytoken.verifyToken, requireAdminRole, ModuleController.createModule);

}