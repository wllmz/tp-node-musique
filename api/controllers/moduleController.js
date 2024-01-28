const Module = require("../models/moduleModel");


exports.listAllModules = async(req, res) => {
    try {
        const Modules = await Module.find({});
        res.status(200);
        res.json(Modules);

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." })
    }
}

exports.listAllModulesFuturs = async (req, res) => {
    try {
        const currentDateTime = new Date();
        const modules = await Module.find({ expiration_date: { $gt: currentDateTime } });
        res.status(200).json(modules);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};


exports.createModule = async (req, res) => {
    try {
        if (new Date(req.body.expiration_date) <= new Date()) {
            return res.status(400).send({ message: "La date d'expiration doit être dans le futur." });
        }

        const newModule = new Module(req.body);
        const module = await newModule.save();
        res.status(201).json(module);
    } catch (error) {
        res.status(500).send({ message: 'Erreur' });
    }
};

exports.deleteModule = async (req, res) => {
    try {
        const result = await Module.deleteOne({ _id: req.params.moduleId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Post non trouvé" });
        } else {
            res.status(200).json({ message: "Post supprimé avec succès" });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });
    }
};

exports.updateModule = async (req, res) => {
    try {
        if (req.body.expiration_date && new Date(req.body.expiration_date) <= new Date()) {
            return res.status(400).send({ message: "La date d'expiration doit être dans le futur." });
        }

        const updatedModule = await Module.findByIdAndUpdate(req.params.moduleId, req.body, { new: true });
        if (!updatedModule) {
            res.status(404).json({ message: "Post non trouvé" });
        } else {
            res.status(200).json(updatedModule);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

exports.getModuleById = async (req, res) => {
    try {
        const module = await Module.findById(req.params.moduleId);
        if (!module) {
            return res.status(404).json({ message: "Post non trouvé" });
        }
        res.json(module);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
};