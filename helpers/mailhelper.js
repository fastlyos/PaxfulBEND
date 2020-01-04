var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,// upgrade later with STARTTLS
  auth: {
    user: "balajiosiz@bnbrentalscript.com",
    pass: "balajiGOsiz005"
  }
});


module.exports = {    
  sendMail: function (values) {
    let mailOptions = {
      from: 'balajiosiz@bnbrentalscript.com',
      to: values,
      subject: 'Sending Email using Node.js',
      html: '<h1>Welcome</h1><p>That was easy!</p><a href="/login">Login</a>'
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    // callback(true);
  }
};

