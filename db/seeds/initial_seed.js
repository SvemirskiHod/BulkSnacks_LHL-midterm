
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('snacks').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('snacks').insert(
          [
            {
              'name': 'Party Mix',
              'price-per-100g': 180,
              'img-filename': 'party-mix.png'
            },
            {
              'name': 'Animal Crackers',
              'price-per-100g': 125,
              'img-filename': 'animal-crackers.png'
            },
            {
              'name': 'Bazinga Mix',
              'price-per-100g': 220,
              'img-filename': 'bazinga.png'
            },
            {
              'name': 'Bits n Bites Mix',
              'price-per-100g': 220,
              'img-filename': 'bits-n-bites.png'
            },
            {
              'name': 'Milk Chocolate-covered Pretzels',
              'price-per-100g': 200,
              'img-filename': 'choco-pretz.png'
            },
            {
              'name': 'Chocolicious Party Mix',
              'price-per-100g': 250,
              'img-filename': 'chocolicious.png'
            },
            {
              'name': 'Dried Veggy Chips',
              'price-per-100g': 175,
              'img-filename': 'dried-veggy-chips.png'
            },
            {
              'name': 'Hippie Trail Mix',
              'price-per-100g': 180,
              'img-filename': 'hippie-mix.png'
            },
            {
              'name': 'M&Ms Peanuts',
              'price-per-100g': 240,
              'img-filename': 'm-m-peanut.png'
            },
            {
              'name': 'Mini Chocolate Chip Cookies',
              'price-per-100g': 125,
              'img-filename': 'mini-choc-chip-cookies.png'
            }
          ])
      ]);
    });
};



