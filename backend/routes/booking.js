var express = require('express');
var router = express.Router();

var monk = require('monk'); // this require returns a method in var monk

// the returned method is used to connect to the db, the method returns a db object
var db = monk('localhost:27017/xlr8');

// use the db object to access a collection
var collectionProd = db.get('products');
var collectionUsers = db.get('users');







module.exports = router;
