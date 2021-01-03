
const sendgridMail = require('@sendgrid/mail');

const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sendgridMail.setApiKey(sendgridAPIKey);

exports.emailFeedback = (req, res) => {
  console.log(req.body);
};