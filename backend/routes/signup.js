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
router.get('/', function(req, res) {
  
    collectionUsers.find({}, function(err, users){
      if (err) throw err;
      res.json(users);
    }); 
    // res.render('index', { title: 'Express' });
  });
router.post('/',function(req,res){
    collectionUsers.insert({
      name: req.body.name ,
      email : req.body.email, 
      phone : req.body.phone,
      address : req.body.address ,
      dob : req.body.dob,
      password : req.body.password 
    },function(err,user){
      if(err) throw err;
      res.json(user);
    });
  });


module.exports = router;
