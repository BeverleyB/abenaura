const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();
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

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  OAUTH_PLAYGROUND
);
  
app.use(cors({ origin: "*" }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.post("/sendmail", (req, res) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });
  const accessToken = oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  ejs.renderFile('./templates/email-tmp.ejs', { title: 'toto', message: req.body.message }, {}, (e, content) => {
    if (e) return e;

    const mailOptions = {
      from: 'abenaura', SENDER_EMAIL_ADDRESS,
      to: SENDER_EMAIL_ADDRESS,
      subject: 'Nouveau message user',
      html: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });

  });
});

app.listen('3000', () => {
  console.log(`Started successfully server at port 3000`);
});
