const mongoose = require('mongoose');

const loginSchema = mongoose.Schema(
{
    username: {type:String},
    password: {type:String},
    reports: {type:Array}

})

module.exports =  mongoose.model('User', loginSchema)