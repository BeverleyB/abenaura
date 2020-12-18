"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _ejs = _interopRequireDefault(require("ejs"));

var _googleapis = require("googleapis");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const express = require("express");
// const bodyparser = require("body-parser");
// const cors = require("cors");
// const router = express.Router();
// const nodemailer = require("nodemailer");
// const ejs = require('ejs');
// const { google } = require("googleapis");
var OAuth2 = _googleapis.google.auth.OAuth2;
var OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
var app = (0, _express["default"])();
var _process$env = process.env,
    MAILING_SERVICE_CLIENT_ID = _process$env.MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET = _process$env.MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN = _process$env.MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS = _process$env.SENDER_EMAIL_ADDRESS;
console.log(MAILING_SERVICE_CLIENT_ID);
var oauth2Client = new OAuth2(MAILING_SERVICE_CLIENT_ID, MAILING_SERVICE_CLIENT_SECRET, OAUTH_PLAYGROUND);
app.use((0, _cors["default"])({
  origin: "*"
}));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.post("/sendmail", function (req, res) {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN
  });
  var accessToken = oauth2Client.getAccessToken();

  var transporter = _nodemailer["default"].createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken: accessToken
    }
  });

  _ejs["default"].renderFile('./templates/email-tmp.ejs', {
    email: req.body.email,
    message: req.body.message
  }, {}, function (e, content) {
    if (e) return e;
    var from = "abenaura website <SENDER_EMAIL_ADDRESS>";
    var mailOptions = {
      from: from,
      to: SENDER_EMAIL_ADDRESS,
      subject: 'Un nouveau message sur ton site <3',
      html: content
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", _nodemailer["default"].getTestMessageUrl(info));
      res.send(info);
    });
  });
});
app.listen('3000', function () {
  console.log("Started successfully server at port 3000");
});