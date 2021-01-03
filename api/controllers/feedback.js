
const sendgridMail = require('@sendgrid/mail');

const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sendgridMail.setApiKey(sendgridAPIKey);

exports.emailFeedback = (req, res) => {
  const {name, email, message, phone, uploadedFiles} = req.body;
  let emailData = {
    to: process.env.EMAIL_TO,
    from: email,
    subject: 'Feedback',
    html: `
      <h1>Customer Feedback</h1>
      <hr/>
      <h4>Name: ${name}</h4>
      <h4>Email: ${email}</h4>
      <h4>Email: ${phone}</h4>
      <h4>Message: ${message}</h4>
      <br/>
      ${uploadedFiles.map((file) => {
        return `<img src="${file.secure_url}" alt="${file.original_filename}" style="width: 50%; overflow: hidden; padding: 50px;"/>`
      })}
      <hr/>
    `
  };
  
  sendgridMail.send(emailData)
  .then((response) => {
    console.log('email sent', response);

    return res.status(200).json({
      success: true,
      data: response
    });
  })
  .catch((err) => {
    console.error('error sending email', err.toString());
    
    return res.status(400).json({
      success: false,
      data: err.toString()
    });
  });
};