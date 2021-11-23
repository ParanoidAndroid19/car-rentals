var express = require('express');
var router = express.Router();
var monk = require('monk'); // this require returns a method in var monk

// the returned method is used to connect to the db, the method returns a db object
var db = monk('localhost:27017/xlr8');
var collectionUsers = db.get('users');
/* GET users listing. */
router.get('/', function(req, res) {
  
  collectionUsers.find({}, function(err, users){
    if (err) throw err;
    res.json(users);
  }); 
  // res.render('index', { title: 'Express' });
});




module.exports = router;
