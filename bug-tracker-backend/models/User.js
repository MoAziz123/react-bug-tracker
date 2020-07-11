const mongoose = require('mongoose');
const loginSchema = mongoose.Schema({
    username: {type:String},
    password: {type:String},
    email:{type:String},
    address:{type:String},
})

module.exports =  mongoose.model('User', loginSchema)