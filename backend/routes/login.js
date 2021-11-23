var express = require('express');
var router = express.Router();

var monk = require('monk'); // this require returns a method in var monk

// the returned method is used to connect to the db, the method returns a db object
var db = monk('localhost:27017/xlr8');

// use the db object to access a collection
var collectionUsers = db.get('users')

// in get, we can't send any body, so we use post
// we're currently in /login only, so we put / only (not "/login")
router.post('/', function(req, res) {
	collectionUsers.findOne({email: req.body.email}, function(err, user){
	  if (err) throw err;
	  if(user){
		  if(req.body.password == user.password){
			//   res.json(user)
			res.send({message:"login success", user:user})
			console.log("working")
		  }
		  else{
			  res.send({message: "wrong credentials"})
			  console.log("wrong")
		  }
	  }
	  else{
		  res.send({message: "not registered"})
		  console.log("noooo")
	  }
	//   res.json(user)
	}); 
});

module.exports = router;