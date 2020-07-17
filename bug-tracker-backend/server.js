
/** Express */
const express = require('express');
const app = express();

/** Modules */
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const jwt = require('jsonwebtoken');
const assert = require('assert')

/** Configure CORS */
app.use(cors())

/** Configure Body Parser */
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
/**Middleware */

/**
 * @mw - JSON Verification
 * @method - USE
 * @description - used to verify any request on the secure part of the site
 * @since 1.0.0
 */
app.use('/', (req,res,next)=>{
    if(req.path.includes('/bugs')){
        let token = req.get('x-access-token')
        let decoded = jwt.decode(token, {complete:true})
        if((Date.now()/1000) > decoded.payload.exp){
            return({auth:false})
        }
        
        return next()
    }
})

/** Configure Routes */
app.use('/', require('./api/bugs'))
app.use('/', require('./api/login'))

/** Launch 🚀 */
mongoose.connect("mongodb://localhost:27017/bug-tracker", 
{
  useFindAndModify: false,
  useNewUrlParser: true, 
  useUnifiedTopology: true
},() => {
    console.log("MONGOOSE CONNECTION ESTABLISHED")
})
.then(() => {
    app.listen(8080, () => {
        console.log('API CONNECTED SUCCESSFULLY')
    })
})
.catch(error => { console.error(error) })