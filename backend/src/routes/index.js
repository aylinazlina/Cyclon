const express=require('express');
const { asynchandeler } = require('../utils/asynchandeler');
const _=express.Router(); //underscore is the router instance or variable

// _.use('/testapi',require('../api/test_api'));

_.use('/auth',require('./api/user.api'));

module.exports=_;