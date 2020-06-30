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
    producer:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
        required:true
    },

    audioFile:{
        type:String,
        required:true
    },
    audioFileKey:{
        type:String,
        required:true
    },
    lyrics:{
        type:String
    },
    voiceMemo:{
        type:String
    }

});


module.exports = Item = mongoose.model('item',ItemSchema);


