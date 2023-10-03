const router = require("express").Router();
const isAuthenticated =require('../middleware/auth');
const isAdmin= require('../middleware/admin');
const isValidObjectId= require('../middleware/validObjectId');
const {createSong, getAllSongs, updateSong, deleteSong, likedSong, getAllLikedSongs} = require('../controllers/songController');


router.post('/', isAdmin, createSong)
router.get('/', getAllSongs)
router.put('/:id',  isValidObjectId, isAdmin, updateSong)
router.delete('/:id',  isValidObjectId, isAdmin, deleteSong)
router.put('/like/:id', isValidObjectId, isAuthenticated, likedSong)
router.get('/like', isAuthenticated, getAllLikedSongs)

module.exports = router;
