const jwt = require("jsonwebtoken");
const signups = require("../models/signUpSchema");
const keysecret = process.env.KEYSECRET;

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const verifytoken = jwt.verify(token, keysecret);
    const rootuser = await signups.find({ _id: verifytoken._id });
    // console.log(rootuser);
    if (!rootuser) {
      throw new Error("user not found");
    }
    req.token = token;
    req.rootuser = rootuser;
    req.userid = rootuser[0]._id;
    next();
  } catch (error) {
    // console.log(error);
    res
      .status(401)
      .json({ status: 401, message: "unauthorised, no token provide" });
  }
};

module.exports = authenticate;
