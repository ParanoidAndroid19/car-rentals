var express = require('express');
var router = express.Router();

var monk = require('monk'); // this require returns a method in var monk

// the returned method is used to connect to the db, the method returns a db object
var db = monk('localhost:27017/xlr8');

// use the db object to access a collection
var collectionProd = db.get('products');
var collectionUsers = db.get('users');
var collectionBook = db.get('booking');

router.get('/', function(req, res) {
    collectionBook.find({customer_id:req.params.id}, function(err, bookings){
      if (err) throw err;
      res.json(bookings);
    }); 
  });

  router.post('/',function(req,res){
    //collectionProd.find({ _id: req.body.id},function(err,cost){
      //  if (err) throw err;
        res.json(req.body.cost);
    //}),
    collectionBook.insert({
      customer_id: req.body.customer_id,
      product_id : req.body.product_id, 
      from_date : req.body.from_date,
      to_date : req.body.to_date ,
      pickup_location : req.body.pickup_location,
      dropoff_location : req.body.dropoff_location,
      total_cost : req.body.cost
    },function(err,user){
      if(err) throw err;
      res.json(user);
    });
  });


//eg customer_id: 619c6095713372da2e4d5eea
//eg product_id: 619c5b2e713372da2e4d5e70



module.exports = router;
