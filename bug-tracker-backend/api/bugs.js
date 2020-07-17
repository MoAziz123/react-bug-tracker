
/**Requires*/
const router =  require('express').Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

/**Models */
const Bug = require('../models/Bug')

/**Routes */

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
        return res.json({
                bugs:item.length == 0 ? [] : item,
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
                bug:bug,
                auth:true
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
                success:true,
                auth:true
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
                success:true,
                auth:true
            })
    })
    .catch((error)=>{return res.json(error)})
})
module.exports = router