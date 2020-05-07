const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema (outline for data)

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:Date,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    register_date:{
        type:Date,
        default:Date.now
    }
});

module.exports = User = mongoose.model('user',UserSchema);

