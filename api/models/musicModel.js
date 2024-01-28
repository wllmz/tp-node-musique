const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let musicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    module_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module', 
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
});

module.exports = mongoose.model('Music', musicSchema);
