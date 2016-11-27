
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
              'price': 180,
              'img-filename': 'party-mix.png',
              'featured': 0
            },
            {
              'name': 'Animal Crackers',
              'price': 125,
              'img-filename': 'animal-crackers.png',
              'featured': 0
            },
            {
              'name': 'Bazinga Mix',
              'price': 220,
              'img-filename': 'bazinga.png',
              'featured': 0
            },
            {
              'name': 'Bits n Bites Mix',
              'price': 220,
              'img-filename': 'bits-n-bites.png',
              'featured': 0
            },
            {
              'name': 'Milk Chocolate-covered Pretzels',
              'price': 200,
              'img-filename': 'choco-pretz.png',
              'featured': 1
            },
            {
              'name': 'Chocolicious Party Mix',
              'price': 250,
              'img-filename': 'chocolicious.png',
              'featured': 0
            },
            {
              'name': 'Dried Veggy Chips',
              'price': 175,
              'img-filename': 'dried-veggy-chips.png',
              'featured': 0
            },
            {
              'name': 'Hippie Trail Mix',
              'price': 180,
              'img-filename': 'hippie-mix.png',
              'featured': 0
            },
            {
              'name': 'M&Ms Peanuts',
              'price': 240,
              'img-filename': 'm-m-peanut.png',
              'featured': 1
            },
            {
              'name': 'Mini Chocolate Chip Cookies',
              'price': 125,
              'img-filename': 'mini-choc-chip-cookies.png',
              'featured': 1
            },
            {
              'name': 'Cassava chips',
              'price': 350,
              'img-filename': 'cassava-chips.png',
              'featured': 1
            },
            {
              'name': 'Milk Chocolate-covered almonds',
              'price': 300,
              'img-filename': 'choco-almonds.png',
              'featured': 1
            },
            {
              'name': 'Corn chips',
              'price': 150,
              'img-filename': 'corn-chips.png',
              'featured': 0
            },
            {
              'name': 'Crunchie Munchie Mix',
              'price': 375,
              'img-filename': 'crunchie-munchie.png',
              'featured': 0
            },
            {
              'name': 'Go-Goji Trail mix',
              'price': 425,
              'img-filename': 'go-goji.png',
              'featured': 0
            },
            {
              'name': 'Nom-Nom-Nom mix',
              'price': 375,
              'img-filename': 'nomnomnom.png',
              'featured': 0
            },
            {
              'name': 'Roasted Green Peas',
              'price': 225,
              'img-filename': 'roasted-peas.png',
              'featured': 0
            },
            {
              'name': 'Smarties',
              'price': 300,
              'img-filename': 'smarties.png',
              'featured': 0
            },
            {
              'name': 'Treat Yourselfie trail mix',
              'price': 325,
              'img-filename': 'treat-yourselfie.png',
              'featured': 0
            },
             {
              'name': 'Waffle Pretzles',
              'price': 220,
              'img-filename': 'waffle-pretzles.png',
              'featured': 0
            }/*,
            {
              'name': '',
              'price': ,
              'img-filename': ''
            }*/
          ])
      ]);
    });
};



