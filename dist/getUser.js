"use strict";

var _require = require('./interfaceDynamo'),
    getUserById = _require.getUserById;

function handler(event, context, callback) {
  try {
    var userId = event.pathParameters.user_id;
    getUserById(userId).then(function (res) {
      console.log(res);
      var response = {
        statusCode: 200,
        body: JSON.stringify({
          user_id: userId,
          user: res
        })
      };
      callback(null, response);
    })["catch"](function (err) {
      console.log(err);
      callback(err);
    });
  } catch (err) {
    console.log(err);
    callback(err);
  }
}

module.exports = {
  handler: handler
};