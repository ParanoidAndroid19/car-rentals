var createError = require('http-errors');

// importing package express into our app
var express = require('express'); 
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var methodOveride = require('method-override');

// definition of indexRouter specifies where it goes (routes/index.js) -> the extension isn't mentioned but it's .js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var productsRouter = require('./routes/products'); 
var loginRouter = require('./routes/login'); 
var signupRouter = require('./routes/signup');

// we now have a new express app with the name "app"
const app = express();
app.use(cors());

app.use(express.static("public"))

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// default view engine we're using here is jade
// app.set('view engine', 'jade');
// app.set('view engine', 'ejs');

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOveride('_method'));

// when user goes to localhost:3000, the request will be handled by indexRouter --> routes/index.js
app.use('/products', productsRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);
// to access the videos collection


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
