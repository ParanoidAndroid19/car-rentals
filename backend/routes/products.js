var express = require('express');
var router = express.Router();

var monk = require('monk'); // this require returns a method in var monk

// the returned method is used to connect to the db, the method returns a db object
var db = monk('localhost:27017/xlr8');

// use the db object to access a collection
var collectionProd = db.get('products');
var collectionUsers = db.get('users');

// CRUD Read -> display all documents in collection
// we've defined the base path as /products so when user goes to that url, the products collection will be displayed
router.get('/', function(req, res) {
  collectionProd.find({}, function(err, products){
    if (err) throw err;
    res.json(products);
  }); 
});


// ---> PREVIOUS PROJECT
// CRUD Read -> retrieve details of a particular video document 
// api/videos/id
// why do we write /:id instead of /id below? -> in express, to be able to retrieve id value from url


// CRUD Create -> insert a new video
// api/videos
// req.body allows us to access the form i/p
// callback function -> if the insertion is successful, the function will return the newly created object
/*router.post('/', function(req, res) {
  collection.insert({

    title: req.body.title,
    genre: req.body.genre,
    description: req.body.desc

  }, function(err, video){
    if (err) throw err;
    // if insert is successful, return new video obj as a response
    res.json(video);
  }); 
});*/

//Displaying one product
router.get('/:id', function(req, res) {
  
  collectionProd.findOne({_id: req.params.id}, function(err, products){
    if (err) throw err;
    res.json(products);
  }); 
  // res.render('index', { title: 'Express' });
});


// update an existing video
/*router.put('/:id', function(req, res) {
  collection.update( { _id: req.params.id },
  { $set: 
    {
      title: req.body.title,
      genre: req.body.genre,
      description: req.body.desc
    }
  }, function(err, video){
    if (err) throw err;
    // if update is successful, return updated video obj as a response
    res.json(video);
  }); 
});

// delete an existing video
router.delete('/:id', function(req, res) {
  collection.remove({ _id: req.params.id }, 
    function(err, video){
      if (err) throw err;
      res.json(video);
  }); 
});*/



module.exports = router;
