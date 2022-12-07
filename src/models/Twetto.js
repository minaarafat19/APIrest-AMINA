const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schema = new Schema({
  text: String,
  isSurvey: Boolean,

  //les reponses possible des questions
  answers: [String],

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Twetto", schema, "twettos");
