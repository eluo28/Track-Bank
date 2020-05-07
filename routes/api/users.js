const express = require('express');
const router = express.Router();

//item model
const User = require('../../models/user');

//@route GET api/users
//@desc register new user
//@access public
router.get('/',(req,res)=>{
    res.send('register');
});


module.exports=router;