const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let moduleSchema = new Schema({
    module: {
        type: String,
        required: true,
    },     
    created_at: {
        type: Date,
        default: Date.now
    },
    expiration_date: {
        type: Date,
        required: true,
    }

});

module.exports = mongoose.model('Module', moduleSchema);