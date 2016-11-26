'use strict';

const express = require('express');
const app     = express.Router();
const helpers = require('../server/helper-functions');

// build order array from basket
// ... provided from basket form as object

/*
basket example {
  '21': 2,
  '22': 4
}
... where keys represent snackid and value is quantity in basket
*/
const buildOrder = (basket) => {
  let lineItems = [];
  for(var key in basket) {
    lineItems.push({
      snackid: key,
      quantity: basket[key]
    });
  };
  console.log(lineItems)
  return lineItems;
}

/*
== == ORDER-RELATED endpoints
== == prefixed with /api/orders
*/
module.exports = (knex) => {

  // -- NEW ORDER PLACED --
  app.put('/new', (req, res) => {
    // basket passed from localStorage via form submission
    let lineItems = buildOrder(req.body.basket);
    const userid  = req.session.user_id;

    knex('orders')
      .returning('orderid')
      .insert({'userid': userid})
      .then((resp) => {
        // should log new orderid
        console.log('****** resp ******',resp)
        knex('order_snacks')
        // should log array of line-item objects
        console.log('****** lineItems ******',lineItems)
          .insert(lineItems)
          .then(() => {
            helpers.passParamsForRender(req, res, 'order_placed', {})
          })
          .catch((error) => {
            console.error(error);
          })
      })
      .catch((error) => {
        console.error(error);
      })
  })

  return app;
}

