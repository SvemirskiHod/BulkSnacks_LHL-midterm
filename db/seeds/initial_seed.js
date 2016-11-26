
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
              'img-filename': 'party-mix.png',
              'featured': 0
            },
            {
              'name': 'Animal Crackers',
              'price-per-100g': 125,
              'img-filename': 'animal-crackers.png',
              'featured': 0
            },
            {
              'name': 'Bazinga Mix',
              'price-per-100g': 220,
              'img-filename': 'bazinga.png',
              'featured': 0
            },
            {
              'name': 'Bits n Bites Mix',
              'price-per-100g': 220,
              'img-filename': 'bits-n-bites.png',
              'featured': 0
            },
            {
              'name': 'Milk Chocolate-covered Pretzels',
              'price-per-100g': 200,
              'img-filename': 'choco-pretz.png',
              'featured': 1
            },
            {
              'name': 'Chocolicious Party Mix',
              'price-per-100g': 250,
              'img-filename': 'chocolicious.png',
              'featured': 0
            },
            {
              'name': 'Dried Veggy Chips',
              'price-per-100g': 175,
              'img-filename': 'dried-veggy-chips.png',
              'featured': 0
            },
            {
              'name': 'Hippie Trail Mix',
              'price-per-100g': 180,
              'img-filename': 'hippie-mix.png',
              'featured': 0
            },
            {
              'name': 'M&Ms Peanuts',
              'price-per-100g': 240,
              'img-filename': 'm-m-peanut.png',
              'featured': 1
            },
            {
              'name': 'Mini Chocolate Chip Cookies',
              'price-per-100g': 125,
              'img-filename': 'mini-choc-chip-cookies.png',
              'featured': 1
            },
            {
              'name': 'Cassava chips',
              'price-per-100g': 350,
              'img-filename': 'cassava-chips.png',
              'featured': 1
            },
            {
              'name': 'Milk Chocolate-covered almonds',
              'price-per-100g': 300,
              'img-filename': 'choco-almonds.png',
              'featured': 1
            },
            {
              'name': 'Corn chips',
              'price-per-100g': 150,
              'img-filename': 'corn-chips.png',
              'featured': 0
            },
            {
              'name': 'Crunchie Munchie Mix',
              'price-per-100g': 375,
              'img-filename': 'crunchie-munchie.png',
              'featured': 0
            },
            {
              'name': 'Go-Goji Trail mix',
              'price-per-100g': 425,
              'img-filename': 'go-goji.png',
              'featured': 0
            },
            {
              'name': 'Nom-Nom-Nom mix',
              'price-per-100g': 375,
              'img-filename': 'nomnomnom.png',
              'featured': 0
            },
            {
              'name': 'Roasted Green Peas',
              'price-per-100g': 225,
              'img-filename': 'roasted-peas.png',
              'featured': 0
            },
            {
              'name': 'Smarties',
              'price-per-100g': 300,
              'img-filename': 'smarties.png',
              'featured': 0
            },
            {
              'name': 'Treat Yourselfie trail mix',
              'price-per-100g': 325,
              'img-filename': 'treat-yourselfie.png',
              'featured': 0
            },
             {
              'name': 'Waffle Pretzles',
              'price-per-100g': 220,
              'img-filename': 'waffle-pretzles.png',
              'featured': 0
            }/*,
            {
              'name': '',
              'price-per-100g': ,
              'img-filename': ''
            }*/
          ])
      ]);
    });
};



