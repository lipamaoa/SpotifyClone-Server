const router = require('express').Router();
const{User}=require('../models/user');
const {login} =require('../controllers/authenticationController')


router.post('/', login);

module.exports=router;