const { Playlist, validate } = require("../models/playlist");
const { Song } = require("../models/song");
const { User } = require("../models/user");
const Joi = require("joi");

/*** Create playlist ***/

const createPlaylist = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await User.findById(req.user._id);
    const playlist = await Playlist({ ...req.body, user: user._id }).save();
    user.playlists.push(playlist._id);
    await user.save();

    res.status(201).json({ data: playlist });
  } catch (error) {
    res.status(500).json({ message: "Playlist not created!!" });
  }
};

/*** Update playlist by id ***/

const updatePlaylist = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      desc: Joi.string().allow(""),
      img: Joi.string().allow(""),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist)
      return res.status(404).json({ message: "Playlist does not exist!!" });

    const user = await User.findById(req.user._id);
    if (!user._id.equals(playlist.user))
      return res
        .status(403)
        .json({ message: "User does not have access to edit!!" });

    playlist.name = req.body.name;
    playlist.desc = req.body.desc;
    playlist.img = req.body.img;

    await playlist.save();

    res.status(200).json({ message: " Playlist updated successfully!!" });
  } catch (error) {
    res.status(500).json({ message: "Playlist not updated!!" });
  }
};

/*** Add song to playlist***/

const addSong = async (req, res) => {
  try {
    const schema = Joi.object({
      playlistId: Joi.string().required(),
      songId: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findById(req.user._id);
    const playlist = await Playlist.findById(req.body.playlistId);
    if (!user._id.equals(playlist.user))
      return res
        .status(403)
        .json({ message: "User does not have access to add song!!" });

    if (playlist.songs.indexOf(req.body.songId) === -1) {
      playlist.songs.push(req.body.songId);
    }
    playlist.save();
    res.status(200).json({ data: playlist, message: " Added to playlist!!" });
  } catch (error) {
    res.status(500).json({ message: "Song not added to playlist!!" });
  }
};

/*** Remove song from playlist ***/

const removeSong = async (req, res) => {
  try {
    const schema = Joi.object({
      playlistId: Joi.string().required(),
      songId: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findById(req.user._id);
    const playlist = await Playlist.findById(req.body.playlistId);
    if (!user._id.equals(playlist.user))
      return res
        .status(403)
        .json({ message: "User does not have access to remove song!!" });

    const index = playlist.songs.indexOf(req.body.songId);
    playlist.songs.splice(index, 1);

    await playlist.save();
    res
      .status(200)
      .json({ data: playlist, message: " Removed from playlist!!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Song could not be removed from playlist!!" });
  }
};

/*** User favorite playlist***/

const userPlaylists = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const playlists = await Playlist.find({ _id: user.playlists });
    res.status(200).json({ data: playlists });
  } catch (error) {
    res.status(500).json({ message: "Error fecthing user playlists!!" });
  }
};

/*** get random playlist***/

const getRandomPlaylist = async (req, res) => {
  try {
    const playlists = await Playlist.aggregate([{ $sample: { size: 10 } }]);
    res.status(200).json({ data: playlists });
  } catch (error) {
    res.status(500).json({ message: "Error fecthing a random playlists!!" });
  }
};

/*** get playlist by id***/

const getPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({message:"Playlist not found"});

    const songs = await Song.find({ _id: playlist.songs });
    res.status(200).json({ data: playlist, songs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching playlist!!" });
  }
};

/*** get all playlists***/

const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    if (!playlists) return res.status(404).json(" Playlists not found");

    res.status(200).json({ data: playlists });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all playlists!!" });
  }
};

/*** delete playlist by id***/

const deletePlaylist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const playlist = await Playlist.findById(req.params.id);
    if (!user._id.equals(playlist.user))
      return res
        .status(403)
        .json({ message: "User does not have access to delete playlist!!" });

    const index = user.playlists.indexOf(req.params.id);
    user.playlists.splice(index, 1);
    await user.save();
    await playlist.deleteOne();
    res.status(200).json({ message: "Playlist removed from library!!" });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error deleting playlist!!"});
  }
};

module.exports = {
  createPlaylist,
  updatePlaylist,
  addSong,
  removeSong,
  userPlaylists,
  getRandomPlaylist,
  getPlaylist,
  getAllPlaylists,
  deletePlaylist,
};
