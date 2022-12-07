//FONCTION APRES MIDDLEWARE

const getAuthentificatedUser = async (req, res, next) => {
  try {
    console.log("user", req.user);
    res.status(200).json({ valueOfHeader: req.headers.username });
    await user.save();
    console.log("trying to save user", user);
  } catch (error) {
    res.status(500).send("There is an error in ur code");
    console.log(error);
  }
};

module.exports = { getAuthentificatedUser };
