const router=require("express").Router();
const isAuthenticated =require('../middleware/auth');
const isValidObjectId=require('../middleware/validObjectId');
const {createPlaylist, updatePlaylist, addSong, removeSong, userPlaylists, getRandomPlaylist, getPlaylist, getAllPlaylists, deletePlaylist}=require('../controllers/playlistController')



router.post('/',isAuthenticated, createPlaylist);
router.put('/edit/:id', isValidObjectId, isAuthenticated, updatePlaylist);
router.put('/add-song', isAuthenticated, addSong);
router.put('/remove-song', isAuthenticated, removeSong)
router.get('/user-playlists', isAuthenticated, userPlaylists)
router.get("/random", isAuthenticated, getRandomPlaylist)
router.get('/:id', isAuthenticated, isValidObjectId, getPlaylist)
router.get('/', isAuthenticated, getAllPlaylists)
router.delete('/:id', isAuthenticated, isValidObjectId, deletePlaylist)

module.exports=router;