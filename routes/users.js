'use strict';

const express = require('express');
const bcrypt  = require('bcrypt');
const app     = express.Router();


// test if password matches db hash
const passwordsMatch = (account, attemptedPassword) => {
  return bcrypt.compareSync(attemptedPassword, account.password);
};

const createHashedPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
// doesEmailExist



module.exports = (knex) => {

  app.post('/login', (req, res) => {
    const email    = req.body.email;
    const password = req.body.password;

    knex('accounts')
      .select('*').where('email', email)
      .then((account) => {
        if (account.length === 0) {
          res.render('uname_error');
          return;
        }
        else if (passwordsMatch(account[0], password)) {
          req.session.user_id = account[0].userid;
          res.redirect('/');
        }
        else {
          res.render('password_err');
        }
      })
      .catch((error) => {
        console.error(error);
      })
  });

  app.post('/register', (req, res) => {
    const email    = req.body.email;
    const hash = createHashedPassword(req.body.password);
    const newUser  = {
      name: req.body.name,
      email: email,
      phone: req.body.phone,
      password: hash
    }
    knex('accounts')
      .select('*').where('email', email)
      .then((existingAccount) => {
        if (existingAccount.length === 0) {
          knex('accounts')
            .returning('userid')
            .insert([newUser])
            .then((resp) => {
              const userId = resp[0];
              req.session.user_id = userId;
              res.redirect('/');

            })
        }
        else {
          res.render('register_uname_taken');
        }
      })

      .catch((error) => {
        if(error) console.error(error);
      })

  });

  app.post('/logout', (req, res) => {
      req.session = null;
      res.redirect('/');
  });

  // example below - we can add more routes to the exports
  // ** keep it related to 'users' for this module! **
  app.get('/test', (req, res) => {
    res.send('It works!');
  });

  return app;
}

