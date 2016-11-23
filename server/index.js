'use strict';

const pg       = require('knex')(knex_dev);
const fs       = require('fs');
const express  = require('express');
const session  = require('cookie-session');
const knex_dev = require('./knexfile').development;

const PORT = 8080;
const app  = require('express');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

pg.destroy();