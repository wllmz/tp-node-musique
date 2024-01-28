const Music = require("../models/musicModel");


exports.listAllMusic = async (req, res) => {
    try {
        const moduleId = req.params.moduleId;
        const musics = await Music.find({ module_id: moduleId });
        res.status(200).json(musics);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

exports.createMusic = async (req, res) => {
    const userId = req.user.id; // L'ID de l'utilisateur est récupéré du token JWT par le middleware
    const moduleId = req.params.moduleId;

    try {
        const existingMusic = await Music.findOne({ user_id: userId, module_id: moduleId });
        if (existingMusic) {
            return res.status(400).json({ message: "Vous avez déjà créé une musique pour ce module." });
        }

        const newMusic = new Music({
            ...req.body,
            module_id: moduleId,
            user_id: userId
        });

        const music = await newMusic.save();
        res.status(201).json(music);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
};

exports.deleteMusic = async (req, res) => {
    try {
        const result = await Music.deleteOne({ _id: req.params.musicId });
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

exports.updateMusic = async (req, res) => {
    try {
        const updatedMusic = await Music.findByIdAndUpdate(
            req.params.musicId,
            req.body,
            { new: true } 
        );

        if (!updatedMusic) {
            res.status(404).json({ message: "Post non trouvé" });
        } else {
            res.status(200).json(updatedMusic);
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });
    }
};

exports.getMusicById = async (req, res) => {
    try {
        const music = await Music.findById(req.params.musicId);
        if (!music) {
            return res.status(404).json({ message: "Post non trouvé" });
        }
        res.json(music);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
};