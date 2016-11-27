
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('snacks', function(table){
      table.increments();
      // snack description
      table.string('name');
      // price per 100g
      table.integer('price-per-100g');
      // image filename
      table.string('img-filename');
      table.integer('featured')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('snacks')
  ])
};
