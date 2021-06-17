const mongoose = require('mongoose');

const reqString = {
    type: String, 
    required: true
}

const profileSchema = new mongoose.Schema({
    guildID: reqString,
    userID: reqString,
    coins: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('profiles', profileSchema);