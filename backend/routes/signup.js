var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt'); // this is used to hash passwords before we store them in db
var monk = require('monk'); // this require returns a method in var monk

// the returned method is used to connect to the db, the method returns a db object
var db = monk('localhost:27017/xlr8');

// use the db object to access a collection
var collectionUsers = db.get('users')

// in get, we can't send any body, so we use post
// we're currently in /signup only, so we put / only (not "/signup")
// router.post('/',function(req,res){
	
// 	const user = new collectionUsers({
// 		name: req.body.name,
// 		email: req.body.email,
// 		phone : req.body.phone,
// 		address : req.body.address ,
// 		dob : req.body.dob,
// 		password : req.body.password,
// 	});

// 	bcrypt.genSalt(10, function(err, salt) {
// 		bcrypt.hash(user.password, salt, function(err, hash) {
// 			if (err) throw err;
// 			// Store hash in your password DB.
// 			user.save();
// 			collectionUsers.insert(user);
// 			res.send('done!');
// 		});
// 	});

// });

// WORKING!!! - aynsc - recommended!!
router.post('/',function(req,res){
	// hashing password
	var p = req.body.password;
	const saltRounds = 10;
	// const salt = bcrypt.genSaltSync(saltRounds);
	// const hash = bcrypt.hashSync(p, salt);
	bcrypt.hash(p, saltRounds, function(err, hash) {
		// Store hash in your password DB.
		// saving it to db
		collectionUsers.insert({
			name: req.body.name ,
			email : req.body.email, 
			phone : req.body.phone,
			address : req.body.address ,
			dob : req.body.dob,
			password : hash,
		  },function(err,user){
			if(err) throw err;
			res.json(user);
		  });
	});
	
});

// WORKING! - sync - not recommended!!
// router.post('/',function(req,res){
// 	// hashing password
// 	var p = req.body.password;
// 	const saltRounds = 10;
// 	const salt = bcrypt.genSaltSync(saltRounds);
// 	const hash = bcrypt.hashSync(p, salt);

// 	// saving it to db
//     collectionUsers.insert({
//       name: req.body.name ,
//       email : req.body.email, 
//       phone : req.body.phone,
//       address : req.body.address ,
//       dob : req.body.dob,
//       password : hash,
//     },function(err,user){
//       if(err) throw err;
//       res.json(user);
//     });
//   });



module.exports = router;