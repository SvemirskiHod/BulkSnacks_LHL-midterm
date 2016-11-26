'use strict';

const express = require('express');
const app     = express.Router();
const helpers = require('../server/helper-functions');

// build order array from basket (provided as array from basket form)
const buildOrder = (basket) => {
  let lineItems = [];
  basket.forEach((basketItem) => {
    lineItems.push({
      snackid: basketItem.snackid,
      quantity: basketItem.quantity
    });
  });
  return lineItems;
}

/*
== == ORDER-RELATED endpoints
== == prefixed with /api/orders
*/
module.exports = (knex) => {

  // -- NEW ORDER PLACED --
  app.put('/new', (req, res) => {
    const userid   = req.session.user_id;
    // basket passed from localStorage via form submission
    let orderItems = buildOrder(req.body.basket);

    knex('orders')
      .returning('orderid')
      .insert({'userid': userid})
      .then((resp) => {
        // should log new orderid
        console.log('****** resp ******',resp)
        knex('order_snacks')
        // should log array of line-item objects
        console.log('****** orderItems ******',orderItems)
          .insert(orderItems)
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

