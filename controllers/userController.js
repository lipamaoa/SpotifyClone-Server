const { User, validate } = require("../models/user");

/*** Get all users***/

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password-__v");
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching the user" });
  }
};

/*** Get user by id***/

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password-__v");
    console.log(user)
    res.status(200).json({ data: user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while fetching the user by Id" });
  }
};

/*** Update user***/

const updateUserData = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    ).select("-password-__v");
    res.status(200).json({ data: user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while updating the user data" });
  }
};

/*** Delete user***/

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "An error occured while deleting the user" });
  }
};

module.exports = { getAllUsers, getUser, updateUserData, deleteUser };
