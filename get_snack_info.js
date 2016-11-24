require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

 var displayResults = function(array){
  array.forEach(function(elm){
    console.log(
      `${elm.id}, ${elm.name}, ${elm["price-per-100g"]} per 100 grams, ${elm["img-filename"]} `
    );
  });
}

knex
    .select()
    .from('snacks')
    .then(function(result){
      snacksList = result;
      console.log(snacksList);
      knex.destroy();
    })
    .catch(function(err){
      console.log(err);
      knex.destroy();
    });



