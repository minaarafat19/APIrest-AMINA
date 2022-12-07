const express = require("express");
require("./databases/index");
const dto = require("./dto/dto.js");
const User = require("./models/user");
const Tweeto = require("./models/Twetto");
const TweetosAnswers = require("./models/tweettos.answer");
const controllers = require("./controllers/controllers");
const IsAuthenticated = require("./dto/aut.mw");
const getAuthentificatedUser = require("./controllers/Authcontroller");

const app = express();
app.use(express.json());

app.get("/login/file-actualite/username/:username", dto.fileActualite);

app.get(
  "/Authentification",
  IsAuthenticated.isAuthenticated,
  getAuthentificatedUser.getAuthentificatedUser
  //(req, res) => res.sendStatus(204)
);

app.get(
  "/getUserEdited/username/",
  IsAuthenticated.isAuthenticated,
  dto.GetUserEdited,
  controllers.GetEditedUserController
);
app.get(
  "/getUserPost/username/:username",
  IsAuthenticated.isAuthenticated,
  dto.GetTweeto,
  controllers.GetTweetoController
);
app.get(
  "/getEditedTweets/username/:username",
  IsAuthenticated.isAuthenticated,
  dto.GetEditedTweeto,
  controllers.GetEditedController
);

app.get(
  "/getAlltwetto",
  IsAuthenticated.isAuthenticated,
  dto.GetTweeto,
  controllers.GetAllTwettoController
);
app.get(
  "/get-all-answers-survey/surveyid/:id",
  IsAuthenticated.isAuthenticated,
  dto.GetSurveyAnswers,
  controllers.GetAllSurveyAnswerController
);
app.get(
  "/get-all-surveyAnswered/username/:username",
  IsAuthenticated.isAuthenticated,

  dto.GetAllAnsweredSurveyForEachUser,
  controllers.GetAllAnsweredSurveyForEachUserController
);
app.post("/login/", dto.CreateUser, controllers.CreateUserController);

app.post(
  "/create-post/username/",
  IsAuthenticated.isAuthenticated,
  dto.CreateTweeto,
  controllers.CreateTweetoController
);
app.post(
  "/create-survey-answers/username/:username/surveyid/:id",
  IsAuthenticated.isAuthenticated,

  dto.GiveSurveyAnswers,
  controllers.GiveSurveyAnswersController
);
//app.post("/registre", dto.fileActualite);

app.patch(
  "/edit-user/username/:username",
  IsAuthenticated.isAuthenticated,
  dto.EditUser,
  controllers.EditUserController
);
app.patch(
  "/edit-tweet/username/:username",
  IsAuthenticated.isAuthenticated,
  dto.EditTweeto,
  controllers.EditTweetoController
);
app.delete(
  "/delete/username/:username",
  IsAuthenticated.isAuthenticated,
  dto.DeleteUser,
  controllers.DeleteUserController
);
app.delete(
  "/delete/tweet/id/:id",
  dto.DeletTweeto,
  controllers.DeletetwettoController
);
/*app.post(
  dto.dtocreateUserTodolist,
  controllers.createUserTodolist
);*/

app.listen(3000, () => {
  console.log("server is running");
});
