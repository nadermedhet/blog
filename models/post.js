const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// User Schema
const PostSchema = mongoose.Schema({
    title : {
        type : String
    },
    tumble :  String,

    content : String,
    catagoris : [],
});
PostSchema.index({
    title : 'text',
    

    content : 'text',
    catagoris : 'text',

})

const  Post = module.exports = mongoose.model('Posts', PostSchema);

module.exports.addPost = function( newpost , callback){

    newpost.save(callback);
}
