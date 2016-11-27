const express = require('express');
const app     = express.Router();
const helpers = require('../server/helper-functions');

/*
== == USER-RELATED endpoints
== == prefixed with /api/admin
*/

module.exports = (knex) => {

  // -- ADMIN LOGIN REQUEST --

  app.post('/login', (req, res) => {
    // correct uppercase email entry
    const email    = req.body.email.toLowerCase();
    const password = req.body.password;

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
        // redirect to /api/orders ONLY IF userid = 2
        else if (accounts[0].id === 2) {
          req.session.user_id = account[0].userid;
          res.redirect('/api/orders');
          // helpers.passParamsForRender(req, res, 'index', {});
        }
      })
      .catch((error) => {
        console.error(error);
      })
  });

  return app;
}
