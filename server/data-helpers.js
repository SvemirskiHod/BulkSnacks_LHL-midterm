
const bcrypt = require('bcrypt');
const session = require('cookie-session');

/*
  Test password against hashed password record in 'accounts' table
*/
const checkPassword = (user, attemptedPassword) => {
  const hashedPassword = user[0].password;
  if (hashedPassword === attemptedPassword) {
    res.redirect("/")
  }
};




module.exports = {
  checkPassword: checkPassword,
}