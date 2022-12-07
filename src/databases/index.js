//connexion de base de donnee!!
const mongoose = require("mongoose");
const { connect, set } = mongoose;

mongoose.connection.on("connected", () => {
  console.log("Connection mongodb Established");
});

mongoose.connection.on("reconnected", () => {
  console.log("Connection mongodb reEstablished");
});
mongoose.connection.on("disconnected", () => {
  console.log("Connection mongodb reEstablished");
});

mongoose.connection.on("close", () => {
  console.log("Connection close");
});
mongoose.connection.on("error", () => {
  console.log("DB ERROR", error);
});
//
set("debug", true);
connect(
  "mongodb+srv://Mina19:Root.123@cluster0.kjxwhkz.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

module.exports = mongoose;
