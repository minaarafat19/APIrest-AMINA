const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//const schema = require("./user");

const schema = new Schema({
  answers: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  tweeto: {
    type: Schema.Types.ObjectId,
    ref: "Twetto",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("TwettoAnswers", schema, "twettoanswers");
