const { User } = require("../models/user");
const { Song, validate } = require("../models/song");
const jwt = require("jsonwebtoken");

/*** Create song***/

const createSong = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ error: error.details });

    const song = await Song(req.body).save();
    res.status(201).json({ data: song, message: "Song created successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/*** Get all songs ***/

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res
      .status(200)
      .json({ data: songs, message: "Songs fetched successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
};

/***Update song ***/

const updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ data: song, message: "Song updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
};

/*** Delete song ***/

const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
};

/*** Like song***/

const likedSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    const user = await User.findById(req.user._id);
    console.log(user);

    const index = user.likedSongs.indexOf(song._id);
    if (index === -1) {
      user.likedSongs.push(song._id);
      await user.save(); // Save the user document with the updated likedSongs.
      res.status(200).json({ message: "Song liked successfully" });
    } else {
      user.likedSongs.splice(index, 1);
      await user.save(); // Save the user document with the updated likedSongs.
      res.status(200).json({ message: "Song unliked successfully" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing the request" });
  }
};

/*** Get All the songs liked ***/

const getAllLikedSongs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const songs = await Song.find({ _id: user.likedSongs });
    res
      .status(200)
      .json({ data: songs, message: "Songs liked fetched successfully" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  createSong,
  getAllSongs,
  updateSong,
  deleteSong,
  likedSong,
  getAllLikedSongs,
};
