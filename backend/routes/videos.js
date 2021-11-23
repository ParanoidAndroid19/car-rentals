var express = require('express');
var router = express.Router();

var monk = require('monk'); // this require returns a method in var monk

// the returned method is used to connect to the db, the method returns a db object
var db = monk('localhost:27017/vidzy');

// use the db object to access a collection
var collection = db.get('videos')

// CRUD Read -> display all documents in collection
// we've defined the base path as api/videos so when user goes to that url, the videos collection will be displayed
router.get('/', function(req, res) {
  // returning a json object
  // find method -> 1st param - {} if empty means no criteria for finding object i.e. all docs will be returned
  // 2nd param -> callback function with 2 params - one is always err, and second is an array of objs that will be displayed (name can be anything)
  collection.find({}, function(err, videos){
    if (err) throw err;
    res.json(videos);
  }); 

  // res.render('index', { title: 'Express' });
});

// CRUD Read -> retrieve details of a particular video document 
// api/videos/id
// why do we write /:id instead of /id below? -> in express, to be able to retrieve id value from url
router.get('/:id', function(req, res) {
  // findOne() is specific to _id
  // params is a property -> it's used to retrieve parameters of the query string (eg. ...?value=sjfg)
  collection.findOne({ _id: req.params.id }, function(err, video){
    if (err) throw err;
    res.json(video);
  }); 
});

// CRUD Create -> insert a new video
// api/videos
// req.body allows us to access the form i/p
// callback function -> if the insertion is successful, the function will return the newly created object
router.post('/', function(req, res) {
  collection.insert({

    title: req.body.title,
    genre: req.body.genre,
    description: req.body.desc

  }, function(err, video){
    if (err) throw err;
    // if insert is successful, return new video obj as a response
    res.json(video);
  }); 
});

// update an existing video
router.put('/:id', function(req, res) {
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
});



module.exports = router;
