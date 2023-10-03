const router=require("express").Router();
const isAuthenticated =require('../middleware/auth');
const {search}= require('../controllers/searchController');

router.get('/', isAuthenticated, search)






module.exports=router;