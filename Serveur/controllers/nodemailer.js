
import nodemailer from 'nodemailer'
export const SendMail = async (req, res) => {
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'oussamaaelkamel@gmail.com',
    pass: 'Recuperationfb2023/*'
  }
});

var mailOptions = {
  from: 'oussamaaelkamel@gmail.com',
  to: 'oelkamel185@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};
console.log("sending")
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});}