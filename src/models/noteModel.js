const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
        title:{
            type:String,
            required:true,
            lowercase:true,
            trim:true
        },
        note:{
            type:String,
            required:true,
            trim:true
        },
        liked:{
            type:Boolean,
            default:false,
        }
})

const NoteModel = mongoose.model('Note',noteSchema);
module.exports = NoteModel;