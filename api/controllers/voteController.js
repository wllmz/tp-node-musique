const Vote = require('../models/voteModel');
const Music = require('../models/musicModel');

exports.createVote = async (req, res) => {
  const userId = req.user.id;
  const musicId = req.params.musicId;

  try {
    const music = await Music.findById(musicId);
    if (!music) {
      return res.status(404).json({ message: "Musique non trouvée." });
    }
    const moduleId = music.module_id;


    const existingVote = await Vote.findOne({
      user_id: userId,
      music_id: { $in: await Music.find({ module_id: moduleId }).distinct('_id') }
    });

    if (existingVote) {
      return res.status(400).json({ message: "Vous avez déjà voté pour une musique dans ce module." });
    }

    const newVote = new Vote({
      user_id: userId,
      music_id: musicId,
      rating: req.body.rating
    });

    await newVote.save();
    res.status(201).json(newVote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  exports.getAllVotesForMusic = async (req, res) => {
    try {
      const musicId = req.params.musicId;
      const votes = await Vote.find({ music_id: musicId });
      res.status(200).json(votes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  exports.getVoteById = async (req, res) => {
    try {
      const vote = await Vote.findById(req.params.voteId);
      if (!vote) return res.status(404).json({ message: 'Vote not found' });
      res.status(200).json(vote);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  exports.updateVote = async (req, res) => {
    try {
      const updatedVote = await Vote.findByIdAndUpdate(req.params.voteId, req.body, { new: true });
      if (!updatedVote) return res.status(404).json({ message: 'Vote not found' });
      res.status(200).json(updatedVote);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

 
  exports.deleteVote = async (req, res) => {
    try {
      const deletedVote = await Vote.findByIdAndDelete(req.params.voteId);
      if (!deletedVote) return res.status(404).json({ message: 'Vote not found' });
      res.status(200).json({ message: 'Vote deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
