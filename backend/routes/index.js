var express = require('express');
// using Router() of express library to create a router object, using this object, we'll be able to  define different
// http operations (get, put, etc) of this api
var router = express.Router();

var monk = require('monk'); 
var db = monk('localhost:27017/xlr8');
var collectionProd = db.get('products');
//var collectionUsers = db.get('users')
//var collectionBookings = db.get('booking')

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/videos');
});


router.get('/videos', function(req, res) {
  collection.find({}, function(err, videos){
    if (err) throw err;
    // instead of displaying a json object, it will render an ejs file
    res.render('index', { results: videos });
  }); 
});


router.get('/videos/new', function(req, res) {
  res.render('new');
});

router.get('/videos/:id', function(req, res) {
  // findOne() is specific to _id
  // params is a property -> it's used to retrieve parameters of the query string (eg. ...?value=sjfg)
  collection.findOne({ _id: req.params.id }, function(err, video){
    if (err) throw err;
    // doesn't work if I write "result: video", only works when it's pertaining to index.ejs (look at an above call)
    res.render('show', { video: video });
  }); 
});

router.get('/videos/:id/edit', (req, res) => {
  
  collection.findOne({ _id: req.params.id })
  .then(video => res.render('edit', { video: video }))
  .catch(err => res.send({ error: err.message }))
});

// router.post('/searchVideos', (req, res) => {
//   console.log("Title:", req.body.title);
//   const searchMovie = new RegExp(req.body.title);
//   // const collection = db.get('videos');
//   collection.find({ title: searchMovie })
//   .then(videos => res.send({ videos }))
//   .catch(err => res.send({ error: err.message }));
// });

// FINALLY WORKING!!
router.post('/searchVideos', (req, res) => {
	var searchMovie = req.body.title;
  var searchGenre = req.body.genre;
	
	collection.find({title: new RegExp(searchMovie,'i'), genre: new RegExp(searchGenre, 'i')}, function(err, videos){
		if (err) throw err;
	  	res.render('index',{results :videos});
	});
});


router.post('/videos', (req, res) => {
	
  collection.insert({
    title: req.body.title,
    genre: req.body.genre,
    image: req.body.image,
    description: req.body.desc,
  })
  .then(() => res.redirect('/videos'))
  .catch(err => res.send({ error: err.message }))
});

router.delete('/videos/:id', (req, res) => {
  
  collection.remove({ _id: req.params.id })
  .then(result => {
    return (result.n === 0) ? res.status(404).send({ error: 'Video does not exist' })
                : res.redirect('/videos');
  })
  .catch(err => res.send({ error: err.message }));
});

router.patch('/videos/:id', (req, res) => {
  
  collection.update({
    _id: req.params.id, 
    }, 
    { $set: 
      {
        title: req.body.title,
        genre: req.body.genre,
        image: req.body.image,
        description: req.body.desc
    }})
  .then(result => {
    console.log('hello after');
    return (result.n === 0) ? res.status(404).send({ error: 'Video does not exist' })
                : res.redirect('/videos');
  })
  .catch(err => res.send({ error: err.message }));
});


module.exports = router;
