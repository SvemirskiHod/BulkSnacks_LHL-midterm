"use strict";

const express     = require('express');
const router      = express.Router();
const dataHelpers = require('../server/data-helpers');

// const checkPassword = (loginData) => {
//   console.log(loginData[0].password);
// };

module.exports = (knex) => {

  router.post("/login", (req, res) => {
    const email    = req.body.email;
    const password = req.body.password;
    knex("accounts")
      .select("*")
      .where('email', email)
      .then((result) => {
        // console.log("knex: ", password, result)
        dataHelpers.checkPassword(result, password);
      })
      .catch(function(error) {
        console.error(error);
      });
  });
  // example below - we can add more routes to the exports
  // ** keep it related to 'users' for this module! **
  router.get("/test", (req, res) => {
    res.send("It works!");
  });

  return router;
}
