'use strict';

const express = require('express');
const session = require('cookie-session');
const fs = require('fs');

const knex_dev = require('./knexfile').development;
const pg = require('knex')(knex_dev);

pg.destroy();