var express = require('express');
var router = express.Router();
var monk = require('monk'); // this require returns a method in var monk

// the returned method is used to connect to the db, the method returns a db object
var db = monk('localhost:27017/xlr8');
var collectionUsers = db.get('users');
/* GET users listing. */
/*router.post("/",(req,res)=>{
    //const {email,password} =req.body;
    collectionUsers.findone({email:req.body.email},(err,user)=>{
        if(user){
           if(req.body.password === user.password){
               res.send({message:"login sucess",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send("not register")
        } 
    })
});*/
router.post('/', function(req, res) {
  
    collectionUsers.findOne({email:req.body.email}, function(err, user){
        if(user){
            if(req.body.password === user.password){
                res.send({message:"login sucess",user:user})
            }else{
                res.send({message:"wrong credentials"})
            }
         }else{
             res.send("not register")
         }
    }); 
    // res.render('index', { title: 'Express' });
  });


module.exports = router;
