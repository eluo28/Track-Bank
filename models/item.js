const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema (outline for data)

const ItemSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    dateCreated:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String
    },
    lyrics:{
        type:String
    },

});

module.exports = Item = mongoose.model('item',ItemSchema);

