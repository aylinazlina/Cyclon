const express=require('express');
const testController=require("../../controller/test_controller");
const _ = express.Router();


_.route("/test").get(testController.sayHi);
module.exports = _;