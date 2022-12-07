// CE QU'IL YA APRES LES MIDDLEWARE
const User = require("../models/user");
const Twetto = require("../models/Twetto");
const tweettosAnswer = require("../models/tweettos.answer");
const { count } = require("../models/user");

const CreateUserController = async (req, res, next) => {
  try {
    const username = req.body.username;

    console.log(req.body);

    const userExist = await User.exists({ username: username });

    if (userExist) {
      res.status(400).send("User already exist");
      return;
    }

    const newUser = new User();
    newUser.username = username;

    await newUser.save();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send("Une erreur est survenue");
    console.log(error);
  }
};

const filedActualiteController = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).send("Une Erreur est survenue");
  }
};

const EditUserController = async (req, res, next) => {
  try {
    //const username = req.params.username;
    const username = req.user;
    const data = req.body.username;
    // const userExist = await User.exists({ user: username });

    const user = await User.findOne({ username: username.username });
    user.username = data;
    await user.save();
    console.log("editing:", user);
    if (user) {
      res.status(200).json({ username: data });
      return;
    }
  } catch (error) {
    res.status(500).send("iL YA ummmne erreur");
    console.log(error);
  }
};

const GetEditedUserController = async (req, res, next) => {
  try {
    //const username = req.params.username;
    const username = req.user;

    const user = await User.findOne({ user: username.username });

    if (!user) {
      res.status(404).send("User not Found");
    }

    if (user) {
      console.log("useroo", user.username);

      res.status(200).json({ username: username });
      return;
    }
  } catch (error) {
    res.status(500).send("Il YA  une erreur");
    console.log(error);
  }
};

const DeleteUserController = async (req, res, next) => {
  try {
    const username = req.user;
    const user = await User.findOne({ username: username.username });
    //const twettoExiste = await Twetto.exists({ user: username }, { text: 1 });

    if (!user) {
      res.status(404).send("User found");
      return;
    }

    await user.remove();

    res.status(200);
    res.send("you succeed!!");
  } catch (error) {
    res.status(500).send("iL YA une erreur");
    console.log(error);
  }
};

/////////////////////////// CREATING TWEETS ///////////////////////////////

const CreateTweetoController = async (req, res, next) => {
  try {
    const username = req.user;
    const text = req.body.text;

    const answers = req.body.answers;
    const isSurvey = req.body.isSurvey;

    const user = await User.findOne(
      { username: username.username },
      { _id: 1 }
    );
    const twettoExiste = await Twetto.exists(
      { text: text },
      { user: username },
      { answers: answers },
      { isSurvey: isSurvey }
    );
    console.log("this is your answers !!", answers);
    if (twettoExiste) {
      res.status(400).send("User already created a POST");
      return;
    }
    //if(isSurvey == true)
    const newTweeto = new Twetto();
    newTweeto.text = text;
    newTweeto.user = user;
    newTweeto.answers = answers;
    newTweeto.isSurvey = isSurvey;
    await newTweeto.save();
    console.log("ISSUES ", isSurvey);
    res.status(200).json({ text: text, answers: answers, isSurvey: isSurvey });
  } catch (error) {
    res.status(500).send("UNE ERREUR");
    console.log(error);
  }
};

const GetTweetoController = async (req, res, next) => {
  try {
    const username = req.user;
    // const userExist = await User.exists({ user: username });
    const user = await User.findOne({ username: username.username });
    const tweeto = await Twetto.findOne({ user: user });
    console.log("username", username.username);
    if (!user) {
      res.status(404).send("User not Found");
      return;
    }

    if (tweeto) {
      console.log("useroo", user.username, tweeto.answers);

      res.status(200).json(tweeto);
      return;
    }
  } catch (error) {
    res.status(500).send("Il YA  une erreur");
    console.log(error);
  }
};

const GetAllTwettoController = async (req, res, next) => {
  try {
    const tweeto = await Twetto.find();
    const Tweeto = await Twetto();
    //const AllTwetto = db.getTwetto();
    if (Tweeto) {
      res.status(200).send(tweeto);
    }
  } catch (error) {
    res.status(500).send("UNE ERREUR");
    console.log(error);
  }
};

const EditTweetoController = async (req, res, next) => {
  try {
    //const username = req.params.username;
    const username = req.user;
    //const userExist = await User.exists({ user: username });
    const data = req.body.text;
    const user = await User.findOne({ username: username.username });
    //const tweeto = await Tweeto.findOne({ user: user.id }, { text: 1 });

    const Tweeto = await Twetto.findOne({ user: user.id });
    Tweeto.text = data;
    await Tweeto.save();
    console.log("editing:", Tweeto.data);
    if (Tweeto) {
      res.status(200).json({ text: data });
      return;
    }
  } catch (error) {
    res.status(500).send("iL YA une erreur");
    console.log(error);
  }
};

const GetEditedController = async (req, res, next) => {
  try {
    const username = req.user;
    const user = await User.findOne({ user: username });
    const tweeto = await Twetto.findOne({ user: username.id }, { text: 1 });

    if (!user) {
      res.status(404).send("User not Found SO cant show TWEETSS ");
      return;
    }

    if (tweeto) {
      console.log("useroo", user.username);

      res.status(200).json({ text: tweeto.text, user: username.username });
      return;
    }
  } catch (error) {
    res.status(500).send("Il YA  une erreur");
    console.log(error);
  }
};

const DeletetwettoController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const username = req.user;
    const userExist = await User.exists({ user: username });

    const Id = await User.findOne({ _id: id });
    const tweeto = await Twetto.findOne({ _id: id });

    if (!id) {
      res.status(404).send("User not found");
      return;
    }

    if (!tweeto) {
      res.status(400).send("no tweets found ");
      return;
    }
    //await tweeto.text.deleteOne({ user: user.id });
    await tweeto.remove();

    res.status(200).send("you deleted tweets for your user !!");
  } catch (error) {
    res.status(500).send("iL YA une erreur");
    console.log(error);
  }
};

const GiveSurveyAnswersController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const answers = req.body.answers;

    const user = req.user;

    const tweeto = await Twetto.findOne({ id: id });
    const usersSurvey = await Twetto.findOne({ user: user._id }, { _id: 1 });

    const twettoAnswerExiste = await tweettosAnswer.exists(
      { user: usersSurvey },
      { answers: answers },
      { tweeto: tweeto.id }
    );
    console.log("Potential ANSWERS !!", tweeto.answers);

    if (twettoAnswerExiste) {
      res.status(400).send("User gave on ANSWER to this survey");
      return;
    }
    const newTweetoAnswer = new tweettosAnswer();

    newTweetoAnswer.user = user;
    newTweetoAnswer.answers = answers;
    newTweetoAnswer.tweeto = tweeto;

    let CheckUserAnswer = tweeto.answers;

    if (CheckUserAnswer.includes(answers) == true) {
      await newTweetoAnswer.save();
      console.log("ISSUES ", newTweetoAnswer.tweeto);
      res.status(200).json(answers);
    }
    if (CheckUserAnswer.includes(answers) == false) {
      res.status(400).send("answer not found in surveys potential answers !!!");
    }
  } catch (error) {
    res.status(500).send("UNE ERREUR");
    console.log(error);
  }
};

const GetAllSurveyAnswerController = async (req, res, next) => {
  try {
    const id = req.params.id;

    const tweetoAnswers = await tweettosAnswer.find();
    const TweetSurvey = await Twetto.findOne({ _id: id });
    console.log(tweetoAnswers.answers);
    if (!id) {
      res.status(404).send("id not Found");
      return;
    }

    let tableCounter = [];

    i = 0;
    for (i; i < tweetoAnswers.length; i++) {
      tableCounter.push(tweetoAnswers[i].answers);
    }

    const CountTable = {};
    tableCounter.forEach(function (element) {
      CountTable[element] = (CountTable[element] || 0) + 1;
    });
    let firstAnserP = CountTable.yes;

    let new_tableau = Object.values(CountTable);
    const max = new_tableau.reduce((a, b) => a + b, 0);
    console.log(max);
    let answers_Pr = 0;
    let x = 0;
    let tableau_pourcentage_Answer = [];
    let items = 0;

    for (x; x < new_tableau.length; x++) {
      answers_Pr = (100 * new_tableau[x]) / max + " %";
      items = console.log("testing poucentage", answers_Pr, "%");

      tableau_pourcentage_Answer.push(answers_Pr);
    }
    console.log("tableau pourcentage", tableau_pourcentage_Answer);

    if (TweetSurvey) {
      if (tweetoAnswers) {
        console.log("coucou", CountTable, CountTable.toString());
        res.status(200).json({ tableau_pourcentage_Answer, tweetoAnswers });

        return;
      }
    }
  } catch (error) {
    res.status(500).send("Il YA une erreur");
    console.log(error);
  }
};

const GetAllAnsweredSurveyForEachUserController = async (req, res, next) => {
  try {
    const user = req.user;
    const tweetoAnswers = await tweettosAnswer.find({ user: user._id });

    res.status(200).json({ tweetoAnswers });
  } catch (error) {
    res.status(500).send("Il YA une erreur");
    console.log(error);
  }
};
const GetCountSurverForeachSurvey = async (req, res, next) => {};
module.exports = {
  CreateUserController,
  filedActualiteController,
  EditUserController,
  GetEditedUserController,
  DeleteUserController,
  CreateTweetoController,
  GetTweetoController,
  GetAllTwettoController,
  EditTweetoController,
  GetEditedController,
  DeletetwettoController,
  GiveSurveyAnswersController,
  GetAllSurveyAnswerController,
  GetAllAnsweredSurveyForEachUserController,
  GetCountSurverForeachSurvey,
};

/**if (isSurvey == false) {
      answers = [];
      res.status(200).json(text);
      const newTweeto = new Twetto();
      newTweeto.text = text;
      newTweeto.user = user;
      newTweeto.answers = answers;
      await newTweeto.save();
      return;
    }
    if (isSurvey == true) {
      res
        .status(200)
        .json({ text: text, answers: answers, isSurvey: isSurvey });
      const newTweeto = new Twetto();
      newTweeto.text = text;
      newTweeto.user = user;
      newTweeto.answers = answers;
      await newTweeto.save();
      return;
    } */
