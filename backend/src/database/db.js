require('dotenv').config();
const {dbName}=require('../constants/Constant')
const mongoose = require('mongoose');



exports.dbConnection=async()=>{
    try{
       const db= await mongoose.connect(`${process.env.MONGODB_URL}/${dbName}`);
       console.log("Database connection on hostId ",db.connection.host);
       return db;
    }
    catch(error){
        console.log("error in Database connection",error);
        
    }
}


