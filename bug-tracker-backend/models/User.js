const mongoose = require('mongoose');

const loginSchema = mongoose.Schema(
{
    username: {type:String},
    password: {type:String},
    reports: {type:Array, default:[]},
    email:{type:String},
    address:{type:String},
    


})

module.exports =  mongoose.model('User', loginSchema)