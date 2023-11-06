require("mongoose");
const Usr = require("../models/userModel");

const getAllUsers = async (limit, offset) => {
  const users = await Usr.find({}).limit(limit).skip(offset);

  return users;
};

const getUser = async (id) => {
  const user = await Usr.findOne({ email: id });
  return user;
};

const addUser = async (
  name,
  lastname,
  email,
  isActive,
  password,
  myCharacters
) => {
  let existUser = await Usr.findOne({ email: email });
  if (!existUser) {
    const cryptoPass = require("crypto")
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const usr = new Usr({
      name: name,
      lastname: lastname,
      email: email,
      isActive: isActive,
      password: cryptoPass,
      myCharacters: myCharacters,
    });

    let user = await usr.save();
    console.log("usuario nuevo");
    console.log(user);
    return { user };
  } else {
    return false;
  }
};

const editUser = async (user) => {
  const result = await Usr.findByIdAndUpdate(user._id, user, { new: true });

  return result;
};

const deleteUser = async (id) => {
  const result = await Usr.findByIdAndDelete(id);

  return result;
};

const editRoles = async (roles, id) => {
  const result = await Usr.findByIdAndUpdate(
    id,
    { $set: { roles: roles } },
    { new: true }
  );

  return result;
};

const editActive = async (isActive, id) => {
  const result = await Usr.findByIdAndUpdate(
    id,
    { $set: { isActive: isActive } },
    { new: true }
  );
  return result;
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
  editRoles,
  editActive,
};
