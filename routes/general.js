const express = require('express');
const app     = express.Router();
const helpers = require('../server/helper-functions');

/*
== == GENERAL-use endpoints
== == prefixed with /
*/

module.exports = (knex) => {

  // ---- home page ----
  app.get('/', (req, res) => {
    helpers.passParamsForRender(req, res, 'index', {});
  });

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

  // ---- featured snacks ----
  app.get("/featured", (req,res) =>{
    // find all the snacks in the 'snacks' table
    knex
      .select()
      .from('snacks').where('featured', 1)
      .then((result) => {
        helpers.passParamsForRender(req, res, 'featured', {snacks: result});
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
    //console.log(req.query);
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
        helpers.passParamsForRender(
          req, res, 'basket', {
            snacks: result, array: idStringArray, obj: req.query
          });
      })
      .catch(function(err){
        console.log(err);
      });
  });

  return app;
}
