const validator = require('validator');
const mongoose = require('mongoose');
 

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if (value<0) {
                throw new Error("Age should be positive")
            }
        }
    },
    password:{
        type:String,
        minlength:7,
        required:true,
        trim:true,
        validate(value){
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password should not be 'password' ")
            }
        }
    }
})

userSchema.pre('save', async function(next){
    const user = this;

})

const USER = mongoose.model('User',userSchema);

module.exports = USER;