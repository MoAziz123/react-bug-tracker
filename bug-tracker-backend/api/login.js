/**Express */
const router =  require('express').Router()

/**Mongoose Config */
const User = require('../models/User')
const mongoose = require('mongoose')

/** Routes Config*/
const jwt = require('jsonwebtoken')


/**
 * @route - /login/new
 * @method - POST
 * @reason - to add new users securely
 * @description - adds users to collection
*/
router.post('/login/new', (req, res)=>{
    let new_user = new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            address:req.body.address
        })
    
    User.find({email:req.body.email})
    .then((user)=>{
        if(user.length != 0){
            return res.json({message:"User already exists", success:true, auth:false})
        }
        
        new_user.save()
        .then((user)=>{
            if(user)
            return res.json({
                    message:"Account successfully created",
                    success:true,
                    user:user,
                    auth:true
                })
            else{
                return res.json({
                    message:"Unable to create account",
                    auth:false,
                    success:true
                })}
            })
        .catch((error)=>console.error(error))
    })
    .catch((error)=>console.log(error))
})


/**
 * @route - /login/submit
 * @method - POST
 * @reason - to authenticate users without exposing details
 * @description - authenticates users via JWT
*/
router.post('/login/submit',  (req,res) =>
{
    User.findOne({email:req.body.email, password:req.body.password})
    .then((user)=>{
            console.log(user)
            if(user){
                let payload ={email:user.email,password:user.password}
                let token = jwt.sign(payload, 'jwt_secret', {expiresIn:'3h'})
                return res.json({
                    message:"User authenticated",
                    token,
                    auth:true,
                    user: {username:user.username, email:user.email, address:user.address},
                    id:user._id
                }
            )}
            else{
                return res.json({message:"Incorrect login attempt "})
            }
        }
    )
    .catch((error) => console.error(error))

})

module.exports =  router