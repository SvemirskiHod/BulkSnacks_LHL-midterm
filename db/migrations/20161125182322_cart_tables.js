
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function(table){
      table.increments('orderid');
      // user id from 'accounts' table
      table.integer('userid').unsigned();
      table.foreign('userid').references('accounts.userid');
    }),
    knex.schema.createTable('order_snacks', function(table){
      table.increments('id');
      table.integer('snackid').unsigned();
      table.foreign('snackid').references('snacks.id');
      table.integer('orderid').unsigned();
      table.foreign('orderid').references('orders.orderid');
      table.integer('quantity')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('order_snacks')
  ])
};
