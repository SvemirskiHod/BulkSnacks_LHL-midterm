
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('snacks').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('snacks').insert({id: 1, colName: 'rowValue1'}),
        knex('snacks').insert({id: 2, colName: 'rowValue2'}),
        knex('snacks').insert({id: 3, colName: 'rowValue3'})
      ]);
    });
};


{
  snackId:
  name:
  unitPrice:
  imageURL:
}