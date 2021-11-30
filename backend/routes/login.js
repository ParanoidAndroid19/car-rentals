var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt'); // used to check if hashed password from db matches the plaintext from user input

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
		var storedPassword = user.password;
		var enteredPassword = req.body.password;
		bcrypt.compare(enteredPassword, storedPassword, function(err, result) {
			// result == true
			if(result){
				res.json(user)
				// res.send({message:"login success", user:user})
				// console.log("working")
			  }
			  else{
				  // render same page? 
				  res.send({message: "wrong credentials"})
				//   console.log("wrong")
			  }
		}); 	  
	  }
	  else{
		res.send({message: "not registered"})
		// console.log("noooo")
	  }
	//   res.json(user)
	}); 
});

module.exports = router;



// router.post("/login", async (req, res) => {
//     const body = req.body;
//     const user = await User.findOne({ email: body.email });
//     if (user) {
//       // check user password with hashed password stored in the database
//       const validPassword = await bcrypt.compare(body.password, user.password);
//       if (validPassword) {
//         res.status(200).json({ message: "Valid password" });
//       } else {
//         res.status(400).json({ error: "Invalid Password" });
//       }
//     } else {
//       res.status(401).json({ error: "User does not exist" });
//     }
//   });
