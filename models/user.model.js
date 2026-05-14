const mongoose= require('mongoose');
const userSchema= new mongoose.Schema({
    gmail:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:5,
        lowercase:true
    },
    password:{
        type:String,    
        required:true,
        trim:true,
        minlength:8,
    }   
});
const User= mongoose.model('User',userSchema);
module.exports=User;