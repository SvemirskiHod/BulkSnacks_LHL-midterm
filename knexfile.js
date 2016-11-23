// const settings = require("./settings");

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user     : 'labber',
      password : 'labber',
      database : 'midterm',
      host     : 'localhost',
      port     : 5432,
      ssl      : false,
    },
    debug: true
  }
};
