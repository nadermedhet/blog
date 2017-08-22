const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// User Schema
const CommentSchema = mongoose.Schema({
  
        userId: String,
        content : String,
        date : String,
        postId : String

});

const  Comment = module.exports = mongoose.model('Comments', CommentSchema);

module.exports.addComment = function( newcomment , callback){

    newcomment.save(callback);
}