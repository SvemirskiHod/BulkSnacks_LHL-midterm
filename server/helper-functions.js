const ENV         = process.env.ENV || 'development';
const knexConfig  = require('../knexfile');
const knex        = require('knex')(knexConfig[ENV]);

const getUserName = (uid, cb) => {
  knex('accounts')
    .select('name').where('userid', uid)
    .then((result) => {
      cb(result[0])
    })
    .catch((error) => {
      if(error) throw error;
    });
};

module.exports = {

// Populate "name" property for EJS render
// as user's name or empty string (when not logged in)
// ...then render the page parameter
  passParamsForRender: (req, res, page, inputParams) => {
    const defaultParams = {
      name: '',
      errors: {}
    }
    let params = Object.assign({}, defaultParams, inputParams);
    // check for session cookie
    const uid = req.session.user_id;
    // if cookie exists, get username for the uid
    if (uid) {
      getUserName(uid, (user) => {
        // add name to render params
        params.name = user.name;
        res.render(page, params);
      });
    }
    else {
      res.render(page, params);
    }
  },
  // retrieve user's id given their email
  getUserIdFromEmail: (email, cb) => {
    knex('accounts')
      .select('userid').where('email', email)
      .then((result) => {
        cb(result[0]);
      })
      .catch((error) => {
        if(error) throw error;
      })
  },
  // retrieve user's name from 'accounts' table in database
}

