var express = require('express');
var router = express.Router();

var monk = require('monk'); // this require returns a method in var monk

// the returned method is used to connect to the db, the method returns a db object
var db = monk('localhost:27017/xlr8');

// use the db object to access a collection
var collectionProd = db.get('products');
var collectionUsers = db.get('users');
var collectionBook = db.get('booking');

router.get('/:id', function(req, res) {
    collectionBook.find({customer_id:req.params.id}, function(err, bookings){
      if (err) throw err;
      res.json(bookings);
    }); 
  });

  router.post('/',function(req,res){
    
    

      var costcost = parseInt(req.body.cost); 
      var startDate = new Date(req.body.from_date);
      var endDate = new Date(req.body.to_date);
      const days = Math.abs(endDate.getDate() - startDate.getDate());
      const price = (days * costcost);

    
    collectionBook.insert({
      customer_id: req.body.customer_id,
      product_id : req.body.product_id, 
      from_date : startDate.toString(),
      to_date : endDate.toString() ,
      pickup_location : req.body.pickup_location,
      dropoff_location : req.body.dropoff_location,
      total_cost : price.toString()
    },function(err,user){
      if(err) throw err;
      res.json(user);
    });
  });

 /* router.put('/:id', (req, res) => {
    var costcost = parseInt(req.body.cost); 
      var startDate = new Date(req.body.from_date);
      var endDate = new Date(req.body.to_date);
      const days = Math.abs(endDate.getDate() - startDate.getDate());
      const price = (days * costcost);

    collectionBook.update({
      _id: req.params.id, 
    }, { $set: {
      from_date: startDate.toString(),
      to_date: endDate.toString(),
      pickup_location: req.body.pickup_location,
      dropoff_location: req.body.dropoff_location,
      total_cost : price.toString()
    }})
    .then(result => {
      return (result.n === 0) ? res.status(404).send({ error: 'booking does not exist' })
            : res.redirect('/');
    })
    .catch(err => res.send({ error: err.message }));
    });*/

 router.delete('/:id', function(req, res) {
	collectionBook.remove({_id:req.body.id }, function(err, bookings){
		if (err) throw err;
	  	res.json(bookings);
	});
});
  

//eg customer_id: 619c6095713372da2e4d5eea
//eg product_id: 619c5b2e713372da2e4d5e70



module.exports = router;
