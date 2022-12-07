// LES MIDDLEWARES

const User = require("../models/user");
const Tweeto = require("../models/Twetto");
const { reset } = require("nodemon");
const Twetto = require("../models/Twetto");

const CreateUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    if (!username) {
      res.status(400).send("username is missing !");
      return;
    }
  } catch (error) {
    res.status(500).send("IL Y A UNE ERREUR");
    console.log(error);
  }
  next();
};

const EditUser = async (req, res, next) => {
  try {
    const username = req.user;
    const userExist = await User.exists({ user: username });
    //const username = req.params.username;
    const data = req.body.username;

    if (!data?.length) {
      res.status(400).send("U have to change the username in the body");
    }
    const user = await User.findOne({ username: username });

    if (!user) {
      res
        .status(404)
        .send("the user u are trying to edit is NOT IN MY DATABASE!");
      return;
    }
    //res.status(200).json(data);
    next();
  } catch (error) {
    res.status(500).send("il ya une erreur");
    console.log(error);
  }
};

const GetUserEdited = async (req, res, next) => {
  try {
    const username = req.user;
    if (!username) {
      res.status(400).send("username is missing !");
      return;
    }
  } catch (error) {
    res.status(500).send("IL Y A UNE ERREUR");
  }

  next();
};

const DeleteUser = async (req, res, next) => {
  try {
    const username = req.user;
    const userExist = await User.exists({ user: username });
    // const username = req.params.username;

    next();
  } catch (error) {
    res.status(500).send("ERROR DELETE");
  }
};

const fileActualite = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username }, { _id: 1 });
    if (!username) {
      res.status(401).send("il n'existe pas !");
      //console.log("trying to save user", users);
      return;
    }

    res.status(200).json({ user: username });
    console.log(user);

    next();
  } catch (error) {
    res.status(500).send("ERROR AUTH");
    console.log(error);
  }
};

const CreateTweeto = async (req, res, next) => {
  try {
    //const username = req.params.username;
    const username = req.user;
    //const userExist = await User.exists({ user: username.username });
    const text = req.body.text;
    const user = await User.findOne(
      { username: username.username },
      { _id: 1 }
    );

    if (!user) {
      res.status(400).send("The user cant create a post, cause NOT FOUND");
      return;
    }
    if (!text?.length) {
      res.status(400).send("Inserer du text dans le champ");
    }
  } catch (error) {
    res.status(500).send("Une erreur est survenue");
  }

  next();
};

const GetTweeto = async (req, res, next) => {
  try {
    const username = req.user;
    const userExist = await User.exists({ user: username });
    //const username = req.params.username;
    //const age=req.body.age;

    if (!userExist) {
      res.status(400).send("username is missing !");
      return;
    }
  } catch (error) {
    res.status(500).send("IL Y A UNE ERREUR");
  }

  next();
};

const EditTweeto = async (req, res, next) => {
  try {
    //const username = req.params.username;
    const username = req.user;
    //const userExist = await User.exists({ user: username });
    const data = req.body.text;
    const user = await User.findOne({ username: username.username });
    const tweeto = await Tweeto.findOne({ user: user.id }, { text: 1 });
    if (!data?.length) {
      res.status(400).send("U have to change the twee in the body");
    }

    if (!user) {
      res
        .status(404)
        .send("the user cant edit a tweet because is NOT IN MY DATABASE!");
      return;
    }
    //res.status(200).json(data);
    next();
  } catch (error) {
    res.status(500).send("il ya une erreur");
    console.log(error);
  }
};

const GetEditedTweeto = async (req, res, next) => {
  try {
    const username = req.user;
    //const age=req.body.age;

    if (!username) {
      res.status(400).send("username is missing CANT ACCESS to tweets!");
      return;
    }
  } catch (error) {
    res.status(500).send("IL Y A UNE ERREUR");
  }

  next();
};
const DeletTweeto = async (req, res, next) => {
  try {
    const id = req.params.id;
    //const user = await User.findOne({ _id: id });
    // const tweeto = await Tweeto.findOne({ user: user.id }, { text: 1 });
    if (!id?.length) {
      res.status(400).send("wriittee somee");
    }
    next();
  } catch (error) {
    res.status(500).send("ERROR DELETE");
    console.log(error);
  }
};

createSurveyTweto = async (req, res, next) => {
  try {
    const username = req.params.username;
    const survey = req.body.survey;
    const user = await User.findOne({ username: username }, { _id: 1 });

    if (!user) {
      res.status(400).send("The user cant create a survey, cause NOT FOUND");
      return;
    }
    if (!survey?.length) {
      res.status(400).send("Inserer du text dans le champ");
    }
  } catch (error) {
    res.status(500).send("Une erreur est survenue");
  }

  next();
};

const GiveSurveyAnswers = async (req, res, next) => {
  try {
    //const username = req.params.username;
    const username = req.user;
    const id = req.params.id;
    const answers = req.body.answers;
    const user = await User.findOne(
      { username: username.username },
      { _id: 1 }
    );

    if (!user) {
      res
        .status(400)
        .send(
          "The user is not in my DATABSE how do u want to give some answers "
        );
      return;
    }
    if (!answers?.length) {
      res.status(400).send("Inserer du text dans le champ");
    }
  } catch (error) {
    res.status(500).send("Une erreur est survenue");
  }

  next();
};
const GetSurveyAnswers = async (req, res, next) => {
  try {
    const id = req.params.id;
    //const age=req.body.age;

    if (!id) {
      res.status(400).send("id is missing !");
      return;
    }
  } catch (error) {
    res.status(500).send("IL Y A UNE ERREUR");
  }

  next();
};

const GetAllAnsweredSurveyForEachUser = async (req, res, next) => {
  try {
    const username = req.user;
    const userExist = await User.exists({ user: username });

    if (!userExist) {
      res
        .status(404)
        .send("Cant print all survey answers cause User not Found");
      return;
    }
    console.log("tet", username);
    if (!username) {
      res.status(400).send("username is missing !");
      return;
    }
    next();
  } catch (error) {
    res.status(500).send("IL YaA UNE ERREUR");
    console.log(error);
  }
};

const GetCountSurverForeachSurvey = async (req, res, next) => {
  try {
    const id = req.params.id;
    //const age=req.body.age;

    if (!id) {
      res.status(400).send("id is missing !");
      return;
    }
  } catch (error) {
    res.status(500).send("IL Y A UNE ERREUR");
  }

  next();
};
module.exports = {
  fileActualite,
  CreateUser,
  CreateTweeto,
  EditUser,
  GetUserEdited,
  DeleteUser,
  GetTweeto,
  EditTweeto,
  GetEditedTweeto,
  DeletTweeto,
  GiveSurveyAnswers,
  GetSurveyAnswers,
  GetAllAnsweredSurveyForEachUser,
};
