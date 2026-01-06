const express = require('express');
const _ = express.Router();
const authController=require("../../controller/user.controller");

_.route('/registration').post(authController.registration);
_.route('/login').post(authController.login);
_.route('/verify-email').post(authController.emailVerification);
_.route('/forget-password').post(authController.forgetPassword);
_.route('/reset-password').post(authController.resetPassword);
module.exports = _;


