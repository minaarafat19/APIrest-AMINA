// LES MODELS POUR LA BASE DE DONNEE

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// INFORMATION DE L UTILISATEUR
const schema = new Schema({
  username: String,

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//User: identifiant locale au code , user: collections dans la base de donnee
module.exports = model("User", schema, "users");
