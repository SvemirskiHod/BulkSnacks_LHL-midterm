'use strict';

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || 'development';
const express     = require('express');
const bodyParser  = require('body-parser');
const sass        = require('node-sass');
const session     = require('cookie-session');
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const fs          = require('fs');
const knexConfig  = require('./knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const helpers     = require('./server/helper-functions');
const app         = express();

app.use(session({
  name: "session",
  keys: ["Hg8mCTKao7", "lhHJBeTM1X", "zLCrHUM3So"],
  maxAge: 24 * 60 * 60 * 1000,
}));

// Seperated Routes for each Resource
const usersRoutes = require('./routes/users');
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

// ---- home page ----
app.get('/', (req, res) => {
  helpers.passParamsForRender(req, res, 'index', {});
});

app.get('/password')
// ---- snacks list ----
app.get("/snacks", (req,res) =>{
  // find all the snacks in the 'snacks' table
  knex
    .select()
    .from('snacks')
    .then((result) => {
      helpers.passParamsForRender(req, res, 'snacks', {snacks: result});
    })
    .catch(function(err){
      console.log(err);
    });
});
// ---- registration ----
app.get('/register', (req, res) => {
  helpers.passParamsForRender(req, res, 'register', {});
});

// ---- basket / checkout ----
app.get("/basket", (req,res) =>{
  console.log(req.query);
  let idArray = [];
  let idStringArray = idArray;
    for(var key in req.query){
      idArray.push(key);
    }
  idArray = idArray.map(Number);
  console.log(idArray);

  knex
    .select()
    .from('snacks')
    .whereIn('id', idArray)
    .then(function(result){
      helpers.passParamsForRender(req, res, 'basket', {snacks: result, array: idStringArray, obj: req.query});
      // res.render("basket", {snacks: result, array: idStringArray, obj: req.query});
    })
    .catch(function(err){
      console.log(err);
    });
});


/*
--- SERVER INIT ---
*/
app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
