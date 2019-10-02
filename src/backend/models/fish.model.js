const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fishSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    fishType: {type: String, required: true},
    tempBottom: {type: Number, required: true},
    tempTop: {type: Number, required: true},
    phBottom: {type: Number, required: true},
    phTop: {type: Number, required: true},
    diet: {type: String, required: true},
    size: {type: Number, required: true},
    temperament: {type: String, required: true},
    tankMates: {type: Array, required: false},
    enemies: {type: Array, required: false},
    imgURL: {type: String, required: true}
},
{
    timestamps: true
});

const Fish = mongoose.model("Fish", fishSchema);

module.exports = Fish;