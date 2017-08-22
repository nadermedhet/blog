var express = require('express');
var router = express.Router();

const Post = require('../models/post');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport')



router.post('/register-admin' , (req ,res) =>{

  let newAdmin = new Admin({
      username: req.body.username,
      password: req.body.password
    });

      Admin.addUser(newAdmin , (err , user) =>{
    if (err){
      res.json({sucess : false , msg :'there is eror '})
    }
    if(user){
      res.json({sucess : true , msg :'admin saved '});

    }
  });


});


router.post('/login-admin' , (req ,res)=>{

   var username = req.body.username;
   var password = req.body.password;

   Admin.getAdminByUsername( username , (err , user) =>{
     if (err) {
       console.log(err)
   }

     if(!user){
         res.json({sucess : false , msg :'unkown user'})

     }
    var isMatch = Admin.comparePassword( password , user.password);
      if(isMatch = true){
         const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });
      return     res.json({
          sucess: true,
          token: 'JWT '+token,
          user: {
           
            username: user.username,
            admin : user.admin
         
          }
          
        });


      

      } else {
        return res.json({sucess: false, msg : 'Wrong password'});
      }
   })

});
    router.get('/get-admin', passport.authenticate('jwt', {session:false}), (req, res, next) => { 
  res.json({user: req.user});
});

router.post('/add-post' , (req ,res ,next) =>{
    var catagori = req.body.catagoris;

    let post =  new Post({
          title : req.body.title,
          tumble :  req.body.tumble,
          content : req.body.content,
          catagoris : req.body.catagoris

          
   
    });

    Post.addPost( post , (err , post) =>{
    if (err){
      res.json({sucess : false , msg :' post not publish '})
    }
    if(post){
      res.json({sucess : true , msg :'post is publish '});

    }
  })
});
router.get('/get-posts' , (req , res , next) =>{


  
  Post.find( (err , Posts) => {
    if(err){
      res.json({sucess : false , msg :' can"t get posts '})

    }
    if(Posts){
      res.json({sucess : true , posts : Posts})
    }
  })
});
router.get('/get-post/:id' , ( req ,res)=>{

  var _id  =  req.params.id;

  Post.findById( _id , ( err , post) =>{
    if( err){
       res.json({sucess : false , msg :' can"t get post '})
    }
      if(post){
          res.json({ post : post})

    }
  })

  
})
router.put('/update-post/:id' , (req ,res ,next) =>{

      
   Post.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { 
          title: req.body.title,
          tumble :  req.body.tumble,
          content : req.body .content,
          catagoris : req.body.catagoris
    
    }
  }, {upsert: true}, function(err, newpost) {
    if (err) {
            res.json({sucess : false , msg :' post not updated '})    } else{


            }
    if( newpost){
                                res.json({sucess : true , msg :'post updated '});


    }
      
  });

        
});
router.delete('/delete-post/:id' , (req ,res ,next) =>{

       var _id = req.params.id;

 Post.findByIdAndRemove(_id).exec(  (err , done) =>{
            if (err){
            res.json({sucess : false , msg :' post not delteded '})
            }
            if(done){
            res.json({sucess : true , msg :'post deltedted '});

            }
  });


});



module.exports = router;