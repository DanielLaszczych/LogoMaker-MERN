var createError = require('http-errors');
var proxy = require('html2canvas-proxy');
var express = require('express');
var path = require('path');
var router = express.Router();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var graphqlHTTP = require('express-graphql');
var schema = require('./graphql/logoSchemas');
var cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');

let user = {};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // User.findById(id, function(err, user) {
  done(null, user);
  // });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '830920422022-e45k7sfk2fmtq7c66r22ot2qi09c15jv.apps.googleusercontent.com',
      clientSecret: 'bS6YaytLSfbagxXRn_CwIxUL',
      callbackURL: 'http://localhost:3000/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      user = { ...profile };
      return done(null, profile);
      // });
    }
  )
);

mongoose
  .connect('mongodb://localhost/node-graphql', {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  cookieSession({
    name: 'logo-session',
    keys: ['key1', 'key2'],
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('*', cors());
app.use(
  '/graphql',
  cors(),
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true,
  })
);

app.get('/proxy', proxy);
app.get('/user', (req, res) => {
  console.log('getting user data!');
  res.send(user);
});

app.get('/', (req, res) => res.send('You are not logged in'));
app.get('/failed', (req, res) => {
  // res.send('You failed to login');
  res.redirect('http://localhost:3001');
});
app.get('/success', isLoggedIn, (req, res) => {
  // res.send(`Welcome ${req.user.displayName}!`);
  res.redirect('http://localhost:3001/home');
});

app.get('/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  }
);

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  user = {};
  res.redirect('http://localhost:3001');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
