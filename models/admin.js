const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const adminSchema = mongoose.Schema({

  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin :{
    type:String,
     default: true  }

});

const Admin = module.exports = mongoose.model('Admin', adminSchema);

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}


module.exports.getUserById = function(id, callback){
  Admin.findById(id, callback);
}

module.exports.getAdminByUsername = function(username, callback){
  const query = {username: username}
  Admin.findOne(query, callback);
}


module.exports.comparePassword = function(candidatePassword, hash){
  return bcrypt.compareSync(candidatePassword, hash)

}



   
    

