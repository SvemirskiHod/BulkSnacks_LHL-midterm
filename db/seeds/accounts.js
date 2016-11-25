
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('accounts').insert(
          [
            {
              'name': 'Snacky McSnackface',
              'email': 't@t.com',
              'phone': '416-555-4433',
              'password': '$2a$10$qbJdDAG/KgAKA2chXcvdGO4LC1U52g1PEQEzdODw8lzG7v5xBElSK'
            }/*,
            {
              'name': '',
              'email': '',
              'phone': ,
              'password': ''
            }*/
          ]
        )
      ]);
    });
};



