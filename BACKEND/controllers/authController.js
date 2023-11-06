require("mongoose");
const Usr = require("../models/userModel");
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
  const cryptoPass = require("crypto")
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const result = await Usr.findOne({
    email: email,
    isActive: true,
    password: cryptoPass,
  });

  if (result) {
    const token = jwt.sign({ email: result.email, userId: result._id }, "fgdgbrfeer6g1df23g86ef2gs");
    return {token, user: result};
  }

  return null;
};

module.exports = { login };
