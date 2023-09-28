const router = require("express").Router();
const { signUp} = require("../controllers/authenticationController");
const { getAllUsers, getUser, updateUserData, deleteUser } = require("../controllers/userController");
const isAuthenticated =require('../middleware/auth');
const isAdmin= require('../middleware/admin');
const isValidObjectId= require('../middleware/validObjectId');




router.post("/", signUp );
router.get("/",isAdmin, getAllUsers)
router.get("/:id", isValidObjectId, isAuthenticated, getUser)
router.put("/:id", isValidObjectId, isAuthenticated, updateUserData)
router.delete("/:id", isValidObjectId, isAuthenticated, deleteUser)



module.exports = router;
