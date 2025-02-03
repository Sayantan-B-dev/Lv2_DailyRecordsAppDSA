const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StreetArtSchema = new Schema({
  platform: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  numOfQuestions: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("StreetArt", StreetArtSchema);
