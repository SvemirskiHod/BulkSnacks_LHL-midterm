"use strict";

const express = require('express');
const router  = express.Router();

const checkPassword = (loginData) => {
  console.log(loginData[0].password);
};

module.exports = (knex) => {

  router.post("/login", (req, res) => {
    const email    = req.body.email;
    knex("accounts")
      .select("*")
      .where('email', email)
      .then(checkPassword)
      .catch(function(error) {
        console.error(error);
      });
  });

  router.get("/test", (req, res) => {
    res.send("It works!");
  });

  return router;
}
