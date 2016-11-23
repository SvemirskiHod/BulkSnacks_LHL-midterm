
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('snacks').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('snacks').insert([

        ])
      ]);
    });
};



[
  {
    name: 'Party Mix',
    price-per-100g: ''
    img-filename:
  }
]