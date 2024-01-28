const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let voteSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Remplacez 'User' par le nom de votre modèle d'utilisateur
  },
  music_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Music' // Remplacez 'Music' par le nom de votre modèle musical
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  created_at: {
    type: Date,
    default: Date.now,
}, 
module_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Module',
},

});


module.exports = mongoose.model('Vote', voteSchema);