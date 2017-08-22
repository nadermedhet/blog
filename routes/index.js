var express = require('express');
var router = express.Router();
const post = require('../models/post')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.write('hi')
});

router.get('/catogrey/:cat' , (req ,res )=>{
  var catagoris = { catagoris : req.params.cat } ;
  post.find(catagoris , (err , posts)=>{
    if (err){
      console.log(err)
    }if(posts){
      res.json(posts)
    }
  } )
})

module.exports = router;
