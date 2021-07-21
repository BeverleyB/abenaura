"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require("express");

var bodyparser = require("body-parser");

var cors = require("cors");

var app = express();

var nodemailer = require("nodemailer");

var ejs = require('ejs');

var _require = require("googleapis"),
    google = _require.google;

var OAuth2 = google.auth.OAuth2;
var OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
var _process$env = process.env,
    MAILING_SERVICE_CLIENT_ID = _process$env.MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET = _process$env.MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN = _process$env.MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS = _process$env.SENDER_EMAIL_ADDRESS;
app.use(cors({
  origin: "*"
}));
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
app.post("/sendmail", function (req, res) {
  var createTransporter = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var oauth2Client, accessToken, transporter;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              oauth2Client = new OAuth2(MAILING_SERVICE_CLIENT_ID, MAILING_SERVICE_CLIENT_SECRET, OAUTH_PLAYGROUND);
              oauth2Client.setCredentials({
                refresh_token: MAILING_SERVICE_REFRESH_TOKEN
              });
              _context.next = 4;
              return new Promise(function (resolve, reject) {
                oauth2Client.getAccessToken(function (err, token) {
                  if (err) {
                    reject("Failed to create access token :(");
                  }

                  resolve(token);
                });
              });

            case 4:
              accessToken = _context.sent;
              transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  type: "OAuth2",
                  user: SENDER_EMAIL_ADDRESS,
                  clientId: MAILING_SERVICE_CLIENT_ID,
                  clientSecret: MAILING_SERVICE_CLIENT_SECRET,
                  refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
                  accessToken: accessToken,
                  expires: 1484314697598
                }
              });
              return _context.abrupt("return", transporter);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function createTransporter() {
      return _ref.apply(this, arguments);
    };
  }();

  ejs.renderFile('./templates/email-tmp.ejs', {
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

    var sendEmail = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(emailOptions) {
        var emailTransporter, info;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return createTransporter();

              case 3:
                emailTransporter = _context2.sent;
                _context2.next = 6;
                return emailTransporter.sendMail(emailOptions);

              case 6:
                info = _context2.sent;
                console.log("Message sent: %s", info.messageId);
                res.send(info);
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      return function sendEmail(_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    sendEmail(mailOptions);
  });
});
app.listen('3000', function () {
  console.log("Started successfully server at port 3000");
});