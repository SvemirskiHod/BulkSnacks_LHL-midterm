
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('accounts', function(table){
      table.increments('userid');
      // user's full name
      table.string('name');
      // email address
      table.string('email');
      // phone number as string: 'xxx-xxx-xxxx'
      table.string('phone');
      // hashed password
      table.string('password');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('accounts'),
  ])
};
