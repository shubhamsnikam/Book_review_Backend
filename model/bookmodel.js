const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { type } = require('os');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
         type: String,
         required: true
         },
    reviews:[{
        u_id :{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        Note:{type:String}
    }]
});


module.exports = mongoose.model("book", BookSchema);