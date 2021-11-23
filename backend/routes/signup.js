var express = require('express');
var router = express.Router();

var monk = require('monk'); // this require returns a method in var monk

// the returned method is used to connect to the db, the method returns a db object
var db = monk('localhost:27017/xlr8');

// use the db object to access a collection
var collectionUsers = db.get('users')

// in get, we can't send any body, so we use post
// we're currently in /signup only, so we put / only (not "/signup")
router.post('/', function(req, res) {
	collectionUsers.insert({

		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		dob: req.body.dob,
		password: req.body.password
		
	}), function(err, user){
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