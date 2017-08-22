const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const PostSchema = mongoose.Schema({
postId : String,
userId : String
});

const  Post = module.exports = mongoose.model('savedPost', PostSchema);

module.exports.savePost = function( newpost , callback){

    newpost.save(callback);
}