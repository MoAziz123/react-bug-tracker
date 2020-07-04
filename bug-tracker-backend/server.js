var express = require('express');
const  app = express();
const bugs = require('./api/bugs')
const login = require('./api/login')
const mongoose =  require('mongoose');
const http = require('http')
const bodyParser = require('body-parser');
var cors = require('cors')
const db =mongoose.connect("mongodb://localhost:27017/bug-tracker",(err) =>{
    if(err) 
    console.log("MONGOOSE CONNECTION FAILED")
    else
    console.log("MONGOOSE CONNECTION ESTABLISHED")

}
 )

app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use('/', require('./api/bugs'))
app.use('/', require('./api/login'))
http.createServer(app).listen(8080, ()=>
{
    console.log("API CONNECTION ESTABLISHED - LISTENING ON PORT 8080")
})
//send request to same domain to modularify the routes






