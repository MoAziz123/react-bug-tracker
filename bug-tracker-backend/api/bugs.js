const router =  require('express').Router()
const Bug = require('../models/Bug')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded())
router.use(bodyParser.json())
router.get("/bugs", (req,res)=>
{
    Bug.find({}).then((item)=>
    {
        if(item.length == 0) 
            return res.json(
                {
                    bugs:item,
                    message:"No bugs found",
                    success:false
                }
            )
        return res.json(
            {
                bugs:item,
                message: "bugs found",
                success: true
            }
        )
    })
    .catch(error =>
    {
        console.error(error)
        return res.json(
            {
                message:"Error occurred",
                success:false
            }
        )
    })
    
    

})

router.post("/bugs/new", (req, res)=>
{
    let bug = new Bug(req.body)
    .save()
    .then(()=>
    {
        return res.json(
            {
                message:"Succeeded",
                success:true,
                bug:bug
                
            }
        )
    })
    .catch((error)=>
    {
        console.log(error)
    })
    
    

})

router.post("/bugs/delete", (req, res)=>
{
    
    Bug.findOneAndDelete({_id:req.body.id}).then(()=>
    {
        return res.json(
            {
                message:"Bug has been deleted",
                success:true
            }
        )
    })
    .catch((error)=>
    {
        return res.json(error)
    })

})

router.post("/bugs/update", (req, res)=>
{
    Bug.findOneAndUpdate({_id:req.body.id},req.body).then(()=>
    {
        return res.json(
            {
                message: "Bug has been updated",
                success:true
            }
        )
    })
    .catch((error)=>{
        return res.json(error)
    })
})

router.post("/bugs/archive", (req, res)=>
{
    let bug = new Bug(req.body)
    bug.save()
    .then(() =>
    {
        return res.json(
            {
                success:true
            }
        )
    })
    .catch((error) => console.error(error))
    
})





module.exports = router