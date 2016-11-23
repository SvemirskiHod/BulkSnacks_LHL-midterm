const settings = require("./settings");

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user     : 'labber',
      password : 'labber',
      database : 'midterm',
      host     : 'localhost',
      port     : 5432,
      ssl      : true,
    },
    debug: true
  },
  production: {
    client: 'pg',
    connection: {
      user     : settings.user,
      password : settings.password,
      database : settings.database,
      host     : settings.hostname,
      port     : settings.port,
      ssl      : settings.ssl
    },
    debug: false
  }
};
