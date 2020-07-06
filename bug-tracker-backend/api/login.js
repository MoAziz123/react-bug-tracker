const router =  require('express').Router()
const mongoose = require('mongoose')
const User = require('../models/User')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

router.use(bodyParser.urlencoded())
router.use(bodyParser.json())

router.post('/login/new', (req, res)=>
{
    var user = new User(
        {
            username:req.body.username,
            email:req.body.email,
            pasword:req.body.password,
            address:req.body.address
        }
    )
    User.find({email:req.body.email})
    .then((user)=>
    {
        if(user)
        {
            return res.json({message:"User already exists"})
        }
    })
    .catch((error)=>{console.log(error)})

    user.save()
    .then((user)=>
            {
                return res.json(
                    {
                        message:"Account successfully created",
                        success:true,
                        user:user,
                        
                    }
                )
            })
            .catch((error) => 
            {
                console.log("error")
                return res.json(
                    {
                        message:"Account unable to be created",
                        success:false
        
                    }
                )
            }
            )
    })


router.post('/login/submit',  (req,res) =>
{
    let counter = 0
    User.find({email:req.body.email, password:req.body.password})
    .then((user)=>
        {
            if(user)
            {
                let payload =
                {
                    email:user.email,
                    password:user.password
                }
                let token = jwt.sign(payload, 'jwt_secret', {expiresIn:'3h'})
            return res.json(
                {
                    message:"User authenticated",
                    token,
                    success:true,
                    user: {username:user.username, email:user.email, address:user.address},
                    id:user._id
                }
            )
            }
            else
            {
                counter++
                if(counter < 3)
                {
                    return res.json(
                        {
                            message:"Incorrect login - "+counter+" attempt",
                        }
                    )
                }
                else
                {
                    return res.json(
                        {
                            message:"Locked out of system for 5 minutes",
                            lockout:true
                        }
                    )
                }
                
            }
            
        }
    )
    .catch((error) => console.error(error))




})
router.post('/login/forget', (req, res)=>
{
    var login = new LogIn(
        {
            username:req.body.username, 
            password:req.body.password
        }
    )
})

module.exports =  router