const router =  require('express').Router()
const mongoose = require('mongoose')
const LogIn = require('../models/LogIn')
const bodyParser = require('body-parser')


router.post('/login/new', (req, res)=>
{
    var user = new User(
        {
            username:req.body.username,
            password:req.body.password
        })
    user.save().then(()=>
    {
        return res.json(
            {
                message:"Account successfully created",
                success:true
            }
        )
    })
    .catch((error) => 
    {
        res.json(error)
    }
    )
})

router.post('/login/submit',  (req,res) =>
{
    let username = req.body.username
    let password = req.body.password //hashthis




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