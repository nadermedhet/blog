var express = require('express');
var router = express.Router();
var User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');
const saved  = require('../models/savedpost')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
 // resgister user 
 router.post('/register', ( req , res , next) =>{

   let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser , (err , user) =>{
    if (err){
      res.json({sucess : false , msg :'there is eror '})
    }
    if(user){
      res.json({sucess : true , msg :'user saved '});

    }
  })
 });

 router.post('/update/:id' , (req , res , next) =>{
   var _id = req.params.id;

   User.findById(_id , (err , newuser) =>{
     if(err){
         console.error('err' +err)
      }

      newuser.name = req.body.name;
      newuser.email = req.body.email;
      newuser.username = req.body.username;
      newuser.password = req.body.password;
      newuser.image = req.body.image;

      User.updateUser( newuser ,(err , user) =>{
    if (err){
      res.json({sucess : flass , msg :'there is eror '})
    }
    if(user){
      res.json({sucess : true , msg :'user saved '});

    }
  } )

   } )

 });


 // login user
 router.post('/login', (req, res , next) =>{
   var username = req.body.username;
   var password = req.body.password;

   User.getUserByUsername( username , (err , user) =>{
     if (err) {
       console.log(err)
   }

     if(!user){
         res.json({sucess : false , msg :'unkown user'})

     }
    var isMatch = User.comparePassword( password , user.password);
      if(isMatch = true){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          sucess: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            image :user.image,
            email : user.email
            }
          
        });
        
      } else {
        return res.json({sucess: false, msg : 'Wrong password'});
      }
   })

 });
  router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => { 
  res.json({user: req.user});
});

router.get('/get-user/:id' , ( req , res)  =>{
  id = req.params.id;

  User.findById( id , (err , user)=>{
    if(err) throw err;

    if(user){
      res.json(user);
    }
  })

});
router.get('/user-saved/:id', (req , res)=>{
  userId = {userId : req.params.id};
  saved.find( userId , (err , done)=>{
    if (err) throw err;
    if(done){
      res.json(done);
    }
  })

})

module.exports = router;
