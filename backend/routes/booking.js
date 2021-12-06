var express = require('express');
var router = express.Router();

var monk = require('monk'); // this require returns a method in var monk

// the returned method is used to connect to the db, the method returns a db object
var db = monk('localhost:27017/xlr8');

// use the db object to access a collection
var collectionProd = db.get('products');
var collectionUsers = db.get('users');
var collectionBook = db.get('booking');

/*router.get('/:id', function(req, res) {
    collectionBook.find({customer_id:req.params.id}, function(err, bookings){
      if (err) throw err;
      res.json(bookings);
    }); 
  });*/
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
      total_cost : price.toString(),
      deleted : req.body.deleted
    },function(err,user){
      if(err) throw err;
      res.json(user);
    });
  });


router.delete('/delete', function(req, res){
      collectionBook.update({ _id : req.body.id }, 
      { $set: 
        {
          deleted: req.body.deleted,
        }
      }, function(err, product){
        if (err) throw err;
        res.json(product);
      });
});
        
router.put('/update', function(req, res){
  collectionBook.update({ _id : req.body.id }, 
          { $set: 
            {
              from_date: req.body.from_date,
              to_date: req.body.to_date,
              pickup_location: req.body.pickup_location,
              dropoff_location: req.body.dropoff_location,
            }
          }, function(err, booking){
            if (err) throw err;
            res.json(booking);
          });
});
  

//eg customer_id: 619c6095713372da2e4d5eea
//eg product_id: 619c5b2e713372da2e4d5e70
//eg booking id: 619d6b12148c8e9460ee7b7f



module.exports = router;
