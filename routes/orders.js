'use strict';

const express    = require('express');
const app        = express.Router();
const helpers    = require('../server/helper-functions');
const newSMS     = require('../server/twilio').newSMS;

const textOwner  = (orderid) => {
  const messageToOwner  = `
    \nYou have a new order!
    \nOrderID: ${orderid}
    \nSee the details:
    \nhttp://localhost:8080/api/orders/active
  `;
  return newSMS(6472741621, messageToOwner);
}

const textUserOrderPlaced = (userPhone) => {
  const messageOrderPlaced = `
    \nThanks for your order!
    \nScoops are happening... we'll be in touch soon.
  `;
  return newSMS(userPhone, messageOrderPlaced);
}

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
    let orderid;
    knex('orders')
      .returning('orderid')
      .insert({'userid': userid})
      .then((orderid) => {
        orderid = orderid;
        const lineItems = buildOrder(basket, orderid[0]);
        console.log(lineItems)
        knex('order_snacks')
          .insert(lineItems)
          .then(() => {
            helpers.getUserPhoneNumber(userid, textUserOrderPlaced);
            // notify the owner of new order
            textOwner(orderid);
            res.send('successful insert!');
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
  }),
  // -- ORDER FINISHED --
  app.get('/done', (req, res) => {
    helpers.passParamsForRender(req, res, 'order_done', {})
  }),
  app.get('/active', (req, res) => {
    knex('orders')
    .select().then((allOrders) => {
      helpers.passParamsForRender(req, res, 'all_orders', {
        allOrders: allOrders});
    })
  }),
  app.get('/:id', (req, res) => {
    const orderid = req.params.id;
    const orderInfo = [];
    knex.raw
      (`SELECT price, orders.orderid, accounts.name, phone, snacks.name, order_snacks.quantity
        FROM orders
        JOIN accounts ON accounts.userid = orders.userid
        JOIN order_snacks ON order_snacks.orderid = orders.orderid
        JOIN snacks ON order_snacks.snackid = snacks.id
        WHERE orders.orderid = ?`, [orderid])
      .then((resp) => {
        console.log(resp.rows)
        for (lineItem in ){

        }
        helpers.passParamsForRender(req, res, 'order_view', {'orderInfo': resp.rows});
      })
      /*.join('')
      .select('snackid', 'quantity')

      .where('orderid', orderid)
      .then((resp) => {
        // resp will be array of resp[n].snackid, resp[n].quantity values
        // build up array of snack info objects for render
        resp.forEach((lineItem) => {
          const quant = lineItem.quantity
          knex('snacks')
            .select('name', 'price')
            .where('id', lineItem.snackid)
            .then((snackinfo) => {
              for (var snack in snackinfo) {

                orderInfo.push({
                  'name': snackinfo[snack].name,
                  'price': snackinfo[snack]['price'],
                  'quantity': quant
                })
              }
            })
            .catch((error) => {
              console.error(error)
            })
        })
        // helpers.passParamsForRender(req, res, 'order_view', {'orderInfo': orderInfo});

      })
      .then((resp) => {
        console.log('in next then', orderInfo)
        // render per-order view, passing orderInfo array
        // console.log(resp)
        helpers.passParamsForRender(req, res, 'order_view', {
          'orderInfo': orderInfo});
      })*/
      .catch((error) => {
        console.error(error)
      })
  })
  return app;
}

