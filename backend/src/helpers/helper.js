const nodemailer = require("nodemailer");
require("dotenv").config();

//todo:create a test accont or replace with real credentials.
const transporter = nodemailer.createTransport({
  
//   host: "smtp.ethereal.email",

   service:"gmail",
  secure: process.env.NODE_ENV == "developement" ? false: true, 
  auth: {
    user: "azlinaarabi@gmail.com", //todo: karon e email er security settings giea App create kora hoise
    pass: process.env.APP_Password  || "fplt eidb rfky ldea",

  },
});


exports.emailSend=async (email,template) => {
  const info = await transporter.sendMail({
    from: "Cyclon",
    to: email,
    subject: "Confirm Registration",
    html: template, // HTML version of the message
  });

  console.log("Message sent: ", info.messageId)


};


//todo:SMS sender
exports.smsSend= async(phoneNumber,message)=>{

  try{
    const response= await axios.post(process.env.API_URL,{
      api_key:process.env.API_KEY ,
      senderid:process.env.SENDER_ID,
      number:Array.isArray(phoneNumber) ? phoneNumber.join(','):phoneNumber,
      message:"hello from mern 2403"
    })

    return response.data;
  
  }catch(error){
    console.log("error from send sms" ,error);
    throw new customError(500,"smsSend function"+ error);

  }



}




