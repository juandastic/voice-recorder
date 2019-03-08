const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Voice = new Schema({
    voice_title: {
        type: String
    },
    voice_description: {
        type: String
    },
    voice_audio: {
        type: String
    }
});

module.exports = mongoose.model('Voice', Voice);