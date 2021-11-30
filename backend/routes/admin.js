var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt'); // this is used to hash passwords before we store them in db
var monk = require('monk'); // this require returns a method in var monk

// the returned method is used to connect to the db, the method returns a db object
var db = monk('localhost:27017/xlr8');

// use the db object to access a collection
// var collectionUsers = db.get('users')
var collectionProd = db.get('products');

const adminName = "admin";
const adminEmail = "admin@gmail.com";
const adminPhone = "7777777777";
const address = "tx, usa";
const dob = "1800-01-01";
const password = "admin123test";

// admin add 
// /admin/add
router.post('/add', function(req, res){
	collectionProd.insert({
		car_type: req.body.car_type,
		car_model: req.body.car_model,
		capacity: req.body.capacity,
		rating: req.body.rating,
		cost: req.body.cost,
		specification: req.body.specification,
		image: req.body.image,
		deleted: req.body.deleted,
	}, function(err, product){
		if (err) throw err;
		res.json(product);
	});
});


// admin update
// /admin/update
router.put('/update', function(req, res){
	collectionProd.update({ _id : req.body.id }, 
	{ $set: 
		{
			car_type: req.body.car_type,
			car_model: req.body.car_model,
			capacity: req.body.capacity,
			rating: req.body.rating,
			cost: req.body.cost,
			specification: req.body.specification,
			image: req.body.image,
			deleted: req.body.deleted,
		}
	}, function(err, product){
		if (err) throw err;
		res.json(product);
	});
});

// admin delete
// /admin/delete
// soft-delete, we just have to set "deleted" to 1
router.delete('/delete', function(req, res){
	collectionProd.update({ _id : req.body.id }, 
	{ $set: 
		{
			deleted: req.body.deleted,
		}
	}, function(err, product){
		if (err) throw err;
		res.json(product);
	});
});

module.exports = router;
