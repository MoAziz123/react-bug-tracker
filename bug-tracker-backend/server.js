
/** Express */
const express = require('express');
const app = express();

/** Modules */
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const jwt = require('jsonwebtoken');
const { createServer } = require('http');

/** Configure CORS */
app.use(cors())

/** Configure Body Parser */
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

/** Configure Routes */
app.use('/', require('./api/bugs'))
app.use('/', require('./api/login'))

/** Launch 🚀 */
mongoose.connect("mongodb://localhost:27017/bug-tracker", () => {
    console.log("MONGOOSE CONNECTION ESTABLISHED")
})
.then(() => {
    
    app.listen(8080, () => {
        console.log('API CONNECTED SUCCESSFULLY')
    })
})
.catch(error => { console.error(error) })