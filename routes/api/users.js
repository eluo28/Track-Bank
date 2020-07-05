const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//item model
const User = require('../../models/user');

//@route POST api/users
//@desc register new user
//@access public
router.post('/',(req,res)=>{
    const {username, email, password} = req.body;

    //make sure fields are filled in
    if(!username || !email || !password){
        return res.status(400).json({msg:'Please enter all fields'});
    }

    //check for existing user
    User.findOne({email})
        .then(user =>{
            if(user) return res.status(400).json({msg:'email already used'});

            const newUser = new User({
                username,
                email,
                password
            });

            //create salt and hash password
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user=>{

                            jwt.sign(
                                {id:user.id},
                                config.get('jwtSecret'),
                                {expiresIn:3600},
                                (err,token)=>{
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user:{
                                            id: user.id,
                                            username:user.username,
                                            email:user.email
                                        }
                                    });
                                }
                            )
                        });
                });
            });




        });
});


module.exports=router;

