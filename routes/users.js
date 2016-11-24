"use strict";

const express     = require('express');
const app         = express.Router();



// test if password matches db hash
const checkPassword = (user, attemptedPassword) => {
  const hashedPassword = user[0].password;
  return (hashedPassword === attemptedPassword)
};

module.exports = (knex) => {
  let templateVars;
  app.post('/login', (req, res) => {
    const email    = req.body.email;
    const password = req.body.password;

    knex('accounts')
      .select('*').where('email', email)
      .then((result) => {
        const passwordValid = checkPassword(result, password);
        const userId = result[0].userid;
        if (passwordValid) {
          req.session.user_id = userId;
          res.redirect("/");
        } else {
          res.status(401);
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  });
  // example below - we can add more routes to the exports
  // ** keep it related to 'users' for this module! **
  app.get('/test', (req, res) => {
    res.send("It works!");
  });

  return app;
}

