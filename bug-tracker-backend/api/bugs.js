
/**Requires*/
const router =  require('express').Router()
const jwt = require('jsonwebtoken')

/**Models */
const Bug = require('../models/Bug')
const mongoose = require('mongoose')

/**Routes */

/**
 * @route - /
 * @method - ALL
 * @reason - used for decoding jwt to check for expiry
 * @description - decodes JWT and checks if verified - if not, then rejects and returns to client else continue
 */
router.use('/', (req,res)=>{
    let token = req.header('x-access-token')
    if(token){
        let decoded_token = jwt.verify(token, "jwt_secret")
        console.log(decoded_token.payload)
        if(decoded_token)
            next()
        else
        return res.json({auth:false})
    }
})
/**
 * @route - /bugs
 * @method - GET
 * @reason - does not require secure data
 * @description - gets all bugs that are attached to user
 */
router.get('/bugs', (req,res)=>{
    Bug.find({})
    .then((item)=>{
        return res.json({item})
    })
    .catch(error=>console.error(error))
})
router.get("/bugs/:user_id", (req,res)=>{
    let {user_id}=req.params
    Bug.find({user_id})
    .then((item)=>{
        if(item.length == 0) 
            return res.json({
                    bugs:[],
                    message:"No bugs found",
                    success:false
                })
        return res.json({
                bugs:item,
                message: "bugs found",
                success: true
            })
    })
    .catch(error =>{console.error(error)})
})

/**
 * @route - /bugs/new
 * @method - POST
 * @reason - to create new bug securely
 * @description - adds a new bug into mongoDB via form filled model
 */
router.post("/bugs/new", (req, res)=>{
    let bug = new Bug(req.body)
    .save()
    .then(()=>{
        return res.json({
                message:"Succeeded",
                success:true,
                bug:bug
            })
    })
    .catch((error)=>{console.log(error)})
})
/**
 * @route - /bugs/delete
 * @method DELETE
 * @reason - semantically correct
 * @description - deletes bug from req id
 * */
router.delete("/bugs/delete", (req, res)=>{
    Bug.findOneAndDelete({_id:req.body.id})
    .then(()=>{
        return res.json({
                message:"Bug has been deleted",
                success:true
            })
    })
    .catch((error)=>{
        return res.json(error)
    })

})
/**
 * @route - /bugs/update
 * @method - PUT
 * @reason - semantically correct, also just sends data
 * @description- updates the data using the user id to locate
 */
router.put("/bugs/update", (req, res)=>{
    Bug.findOneAndUpdate({_id:req.body.id},req.body)
    .then(()=>{
        return res.json({
                message: "Bug has been updated",
                success:true
            })
    })
    .catch((error)=>{return res.json(error)})
})
module.exports = router