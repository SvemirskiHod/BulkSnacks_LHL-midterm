'use strict';

const express    = require('express');
const app        = express.Router();
const helpers    = require('../server/helper-functions');

// build out lineItems for insertion by the POST call
const buildOrder = (basket, orderid) => {
  let lineItems = [];
  for(var key in basket) {
    lineItems.push({
      'snackid': key,
      'quantity': basket[key],
      'orderid': orderid
    });
  };
  return lineItems;
}

/*
== == ORDER-RELATED endpoints
== == prefixed with /api/orders
*/
module.exports = (knex) => {

  // -- NEW ORDER PLACED --
  app.post('/new', (req, res) => {
    const basket = JSON.parse(req.body.basket);
    const userid  = req.session.user_id;

    knex('orders')
      .returning('orderid')
      .insert({'userid': userid})
      .then((orderid) => {
        const lineItems = buildOrder(basket, orderid[0]);
        console.log(lineItems)
        knex('order_snacks')
          .insert(lineItems)
          .then(() => {
            return;
          })
          .catch((error) => {
            console.error(error);
          })
      })
      .then(() => {
        // send success response back to JQuery's ajax handler
        res.send("successful insert");
      })
      .catch((error) => {
        console.error(error);
      })
  })/*,
  app.get('/new', (req, res) => {

  })*/

  return app;
}

