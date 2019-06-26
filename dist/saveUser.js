"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

function handler(event, context, callback) {
  try {
    var response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'save user'
      })
    };
    callback(null, response);
  } catch (err) {
    console.log(err);
    callback(err);
  }
}