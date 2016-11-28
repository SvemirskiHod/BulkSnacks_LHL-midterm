'use strict';

const express = require('express');
const bcrypt  = require('bcrypt');
const app     = express.Router();
const helpers = require('../server/helper-functions');


// test if password matches db hash
const passwordsMatch = (account, attemptedPassword) => {
  return bcrypt.compareSync(attemptedPassword, account.password);
};

// create new hashed password
const createHashedPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};


/*
== == USER-RELATED endpoints
== == prefixed with /api/users
*/
module.exports = (knex) => {

  // -- LOGIN REQUEST --

  app.post('/login', (req, res) => {
    // correct uppercase email entry
    const email       = req.body.email.toLowerCase();
    const password    = req.body.password;
    /*
    currentPage gets current URL from req,
    strips prefix and (if present) 'api/users/login'
    to fix broken redirect following bad login/pwd attempt.
    */
    const currentPage = req.get('referer').slice(21).replace('api/users/login', '');

    knex('accounts')
      .select('*').where('email', email)
      .then((account) => {
        // -- email doesn't exist in 'accounts' table --
        if (!account[0]) {
          helpers.passParamsForRender(req, res, 'index', {
            errors: {baduser: true}
          });
        }
        // -- password mismatch --
        else if (!passwordsMatch(account[0], password)) {
          helpers.passParamsForRender(req, res, 'index', {
            errors: {badpass: true}
          });
        }
        // user redirected to CURRENT page assuming user/password OK
        else {
          req.session.user_id = account[0].userid;
          res.redirect(currentPage);
        }
      })
      .catch((error) => {
        console.error(error);
      })
  });

  // -- REGISTER REQUEST --

  app.post('/register', (req, res) => {
    const email = req.body.email;
    const hash  = createHashedPassword(req.body.password);
    // console.log(hash);
    const newUser  = {
      name: req.body.name,
      email: email,
      phone: req.body.phone,
      password: hash
    }
    knex('accounts')
      .select('*').where('email', email)
      .then((existingAccount) => {
        if (!existingAccount[0]) {
          knex('accounts')
            .returning('userid')
            .insert([newUser])
            .then((resp) => {
              const userId = resp[0];
              req.session.user_id = userId;
              res.redirect('/snacks');
            })
        }
        else {
          helpers.passParamsForRender(req, res, 'register', {
            errors: {usertaken: true}
          });
        }
      })
      .catch((error) => {
        if(error) console.error(error);
      })
  });

  // -- LOGOUT REQUEST --

  app.post('/logout', (req, res) => {
      req.session = null;
      res.redirect('/');
  });

  return app;
}

