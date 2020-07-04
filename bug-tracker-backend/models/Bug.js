const mongoose = require('mongoose');

const bugSchema = mongoose.Schema(
{
    title: String,
    description:String,
    resolved:
    {
        type:Boolean,
        default:false
    },
    log_date:
    {
        type:Date,
        default:Date.now()
    }

})

module.exports =  mongoose.model('Bug', bugSchema)