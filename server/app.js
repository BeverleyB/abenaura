const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const { google } = require("googleapis");

const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;
  
app.use(cors({ origin: "*" }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.post("/sendmail", (req, res) => {

  const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      MAILING_SERVICE_CLIENT_ID,
      MAILING_SERVICE_CLIENT_SECRET,
      OAUTH_PLAYGROUND
    );

    oauth2Client.setCredentials({
      refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL_ADDRESS,
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken,
        expires: 1484314697598
      },
    });

    return transporter;
  };

  ejs.renderFile('./templates/email-tmp.ejs', { email: req.body.email, message: req.body.message }, {}, (e, content) => {
    if (e) return e;

    let from = `abenaura website <SENDER_EMAIL_ADDRESS>`

    const mailOptions = {
      from: from,
      to: SENDER_EMAIL_ADDRESS,
      subject: 'Un nouveau message sur ton site <3',
      html: content,
    };

    const sendEmail = async (emailOptions) => {
      try {
        let emailTransporter = await createTransporter();
        let info = await emailTransporter.sendMail(emailOptions);
        console.log("Message sent: %s", info.messageId);
        res.send(info);
      }
      catch(error) {
        console.log(error);
      }
    };

    sendEmail(mailOptions);
  });
});

app.listen('3000', () => {
  console.log(`Started successfully server at port 3000`);
});
