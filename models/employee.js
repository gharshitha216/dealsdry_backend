const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
         type:String,
         required:true
    },
    mobileNo:{
        type:Number,
        required:true
   },
   designation:{
    type:String,
    required:true
    },
    gender:{
    type:String,
    required:true
   },
   course:{
    type:String,
    required:true
   },
   image:{
    type:String,
    required:true
   },
   date:{
    type:String,
    required:true
   }
})
module.exports = mongoose.model('employee',postSchema)