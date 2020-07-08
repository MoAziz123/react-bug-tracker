/** Express Router */
const router =  require('express').Router()

/** Models */
const Bug = require('../models/Bug')

/**
 * Bugs
 * 
 * @route /bugs
 * @method GET
 */
router.get('/bugs', (req, res) => {
    let { user_id } = req.body

    /** Use Mongoose to find all user Bugs */
    Bug.find({ user_id }).lean().exec((err, bugs) => {
        /** ❌ Catch and handle errors */
        if(err) {
            return res.json({
                message: 'There was an error fetching bugs',
                success: false
            })
        }
        
        /** ✅ If no bugs found, return message */
        if(bugs.length === 0) {
            return res.json({
                bugs,
                message: 'No bugs found',
                success: true
            })
        }

        /** ✅ Return found bugs */
        return res.json({
            bugs,
            message: 'Bugs found',
            success: true
        })
    })
})

/**
 * @route - /bugs/new
 * @method POST
 * @reason - sending data securely as it's sensitive
 * @description - creates new bug using mongoose
 */
router.post("/bugs/new", (req, res) => {
    let bug = new Bug(req.body).save().lean().exec((err) => {
        if(err){
            return res.json({
                message:'Error with adding new bug',
                success:false
            })
        }

        return res.json({
            message:"Bug added",
            success:true
        })

    })
})

/**
 * @route /bugs/delete
 * @method DELETE
 * @reason readability
 * @description - deletes bug from collection w/ given ID
 */
router.post("/bugs/delete", (req, res) =>
{
    let { _id } = req.body
    Bug.findOneAndDelete({_id}).lean.exec((err) => {
        if(err) {
            return res.json({
                message: "Unable to delete bug",
                success: false
            })
        }
        return res.json({
            message: "Bug has been deleted",
            success: true
        })
    })
})

/**
 * @route - /bugs/update
 * @method - PUT
 * @reason - readability
 * @description - updates bug with given id
 */
router.post("/bugs/update", (req, res)=>{
    let { _id } = req.body
    Bug.findOneAndUpdate({_id}).lean().exec((err)=>
    {
        if(err) {
            return res.json({
                message: "Unable to update bug",
                success:false
            })
        }
        return res.json({
            message: "Bug has been updated",
            success:true
        })
    })
    
})
/**
 * @route - /bugs/archive
 * @method GET
 * @reason - to get all bugs 
 * @description - retrieves all bugs ever added to bug tracker
 * @perms - admin
 */
router.get("/bugs/archive", (req, res)=>{
    Bug.find({}).lean().exec((err)=>{
        if(err)
        {
            return res.json({
                message:"Unable to retrieve archive",
                success:false
            })
        }
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
    
})

module.exports = router