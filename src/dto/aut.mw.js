//MIDDLEWARE AUTHENTIFICATION

const User = require("../models/user");

const isAuthenticated = async (req, res, next) => {
  try {
    const username = req.headers.username;
    //const data = req.body.data;

    if (!username) {
      res.status(401).send("Connecte toi first");
      return;
    }
    const user = await User.findOne({ username: username });

    //res.status(200).json({ username: username });

    console.log("user", user);

    if (!user) {
      res.status(401).send("verifie l'orthographe !");

      return;
    }

    //COMMENT PASSER AU PROCHAIN MIDDLEWARE
    //ICI ON FAIT PASSER LES INFORMATIONS USER=USER AU PROCHAIN MW!
    req.user = user;
  } catch (error) {
    res.status(500).send("ERROR AUTH");
    console.log(error);
  }
  next();
};
module.exports = { isAuthenticated };
