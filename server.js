'use strict';

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || 'development';
const express     = require('express');
const bodyParser  = require('body-parser');
const sass        = require('node-sass');
const app         = express();
const session     = require('cookie-session');

const knexConfig  = require('./knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const fs          = require('fs');


app.use(session({
  name: "session",
  keys: ["Hg8mCTKao7", "lhHJBeTM1X", "zLCrHUM3So"],
  maxAge: 24 * 60 * 60 * 1000,
}));

// Seperated Routes for each Resource
const usersRoutes = require('./routes/users');
// const routes      = require('./routes/main');
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

sass.render({
  file: './styles/style.scss',
  outputStyle: 'compressed',
}, (err, data) => {
  if(!err) {
    fs.writeFile('./public//styles/style.css', data.css, (err) => {
      if(!err) {
        console.log('Successfully compiled SCSS');
      } else console.log(err);
    });
  } else console.log(err);
});

app.use(express.static('public'));
// redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
// redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));

// Mount all resource routes
app.use('/api/users', usersRoutes(knex));

// Home page
app.get('/', (req, res) => {
  const uid = req.session.user_id;
  // if no session cookie, render index page
  if (!uid) {
    res.render('index');
    return;
  }
  const username = getUserName(uid, (user) => {
    // ... if session cookie is valid, render index-auth
    if (user) {
      console.log(user.name);
      res.render('index-auth', {name: user.name});
    }
    else {
      res.render('index');
    }
  });
});


const getUserName = (uid, cb) => {
  console.log('in getUserName')
   knex('accounts')
    .select('name').where('userid', uid)
    .then((result) => {
      cb(result[0])
    })
    .catch((error) => {
      if(error) throw error;
    });
};

// works...
/*
getUserName(1, (user) => {
  console.log(user.name)
});
*/

app.get("/snacks", (req,res) =>{
  var snacksList;
  knex
    .select()
    .from('snacks')
    .then(function(result){
      snacksList = result;
      // console.log(snacksList);
      //knex.destroy();
      res.render("snacks", {snacks: snacksList});
    })
    .catch(function(err){
      console.log(err);
      //knex.destroy();
    });


  ///////////

    ////////////

});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
