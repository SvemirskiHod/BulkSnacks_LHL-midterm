// require('dotenv').config();

const sid    = process.env.TWILIO_SID;
const token  = process.env.TWILIO_TOKEN;
const twilio = require('twilio')(sid, token);

const newSMS = (destNumber, message) => {
  twilio.messages.create({
      to: `+1${destNumber}`,
      from: "+14378002061",
      body: message,
    }, function(err, message) {
      if (err) console.log(err);
  });
};

module.exports = {
  newSMS: newSMS
}