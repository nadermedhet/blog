var express = require('express');
var router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comments');
const saved = require('../models/savedpost')


router.post('/add-comment', function(req, res, next) {

  let comment = new Comment({
        userId : req.body.userId,
        content : req.body.content,
        date :  req.body.date,
        postId : req.body.postId

  });
  Comment.addComment( comment , (err, done )=>{
    if (err){
      res.json({ success : false , msg : 'sorry try again'})
    }
    if( done){
      res.json({ success : true , msg : 'done :)'});

 
      


  }
 
  });
});
router.put('/inc-comment/:id', function( req , res){
  id = req.params.id;

      Post.findByIdAndUpdate(id, {$inc: {commetsNum : 1}}, function (err, data) {
        console.log(data)


});

})
router.get('/get-comments/:id',(req , res , next) =>{
    var id = { postId : req.params.id};
    Comment.find( id , (err , comments) => {
      if( err) throw err;
      if ( comments){
        res.json(comments)
      }
    })
})
  router.post('/savepost', (req , res , next)=>{

    let savedpost = new saved({
      postId : req.body.postId,
      userId : req.body.userId
    });
    saved.savePost( savedpost , ( err , done)=>{
       if (err){
      res.json({ success : false , msg : 'sorry try again'})
    }
    if( done){
      res.json({ success : true , msg : 'done :)'});
    }


    })

  })
  router.get('/saved-number/:id',( req , res , next)=>{
    
      var  postId = { postId : req.params.id}
     saved.find( postId , (err , saved)=>{
       if (err) throw err;
       if(saved){
         res.json( saved)
       }
     })
  })
router.delete('/un-save/:id', (req ,res ,next)=>{
  user = {userId :req.params.id};

  saved.findOneAndRemove( user , (err , done)=>{
    if (err) throw err;
    if(done){
      res.json({ success : true})
    }
  })
  
});
router.get('/user-saved-posts/:id',(req , res)=>{
  id = req.params.id;
  Post.findById( id , (err , post)=>{
    if (err) throw err;
    if (post){
      res.json(post)
    }
    
  }
  )
  
})
module.exports = router;
