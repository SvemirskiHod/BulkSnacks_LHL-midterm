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
    \nhttp://localhost:8080/api/orders/${orderid}
  `;
  // hard-coded for demo purposes
  return newSMS(6472741621, messageToOwner);
}

const textUserOrderTime = (userPhone, minutes) => {
  const messageOrderTime = `
  \nBulkSnacks here...
  \nYour order will be ready in ${minutes} minutes.
  `;
  return newSMS(userPhone, messageOrderTime);
}

const textUserOrderPlaced = (userPhone) => {
  const messageOrderPlaced = `
    \nThanks for using BulkSnacks!
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
      .then((resp) => {
        orderid = resp;
        const lineItems = buildOrder(basket, orderid[0]);
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
    if (req.session.user_id === 1) {
      knex('orders')
      .select().then((allOrders) => {
        helpers.passParamsForRender(req, res, 'all_orders', {
          allOrders: allOrders,
          admin: true
        });
      })
    } else {
      helpers.passParamsForRender(req, res, 'all_orders', {
        admin: false
      });
    }
  }),
  // -- ORDER DETAILS --
  app.get('/:id', (req, res) => {
    const orderid = req.params.id;
    if (req.session.user_id === 1) {
      knex.raw
        (`SELECT price, orders.orderid, accounts.name AS person, phone, snacks.name AS snackname, order_snacks.quantity
          FROM orders
          JOIN accounts ON accounts.userid = orders.userid
          JOIN order_snacks ON order_snacks.orderid = orders.orderid
          JOIN snacks ON order_snacks.snackid = snacks.id
          WHERE orders.orderid = ?`, [orderid])
        .then((resp) => {
          const orderInfo = [];
          for (let lineItem in resp.rows) {
            const item = resp.rows[lineItem];
            orderInfo.push({
              'price': item.price,
              'orderid': item.orderid,
              'person': item.person,
              'phone': item.phone,
              'snackname': item.snackname,
              'quantity': item.quantity
            });
          }
          // console.log(orderInfo);
          helpers.passParamsForRender(req, res, 'order_view', {
            orderInfo: orderInfo,
            admin: true
          });
        })
        .catch((error) => {
          console.error(error)
        })
      } else {
        helpers.passParamsForRender(req, res, 'all_orders', {
          admin: false
        });
      }
  }),
  // -- NOTIFY customer --
  app.post('/notify', (req, res) => {
    const minutes = req.body.data[0].minutes;
    const phone = req.body.data[0].phone;
    textUserOrderTime(phone, minutes);
    res.send('sent notification SMS');
  })
  return app;
}

