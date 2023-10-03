const router = require('express').Router();
const {login} =require('../controllers/authenticationController')


router.post('/', login);

module.exports=router;