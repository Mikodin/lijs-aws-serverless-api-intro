"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('aws-sdk'),
    DynamoDB = _require.DynamoDB;

var USER_TABLE_NAME = process.env.USER_TABLE_NAME;
var CONFIG = {
  maxRetries: 5,
  httpOptions: {
    timeout: 5000
  },
  region: 'us-east-1'
};
var client = new DynamoDB.DocumentClient(_objectSpread({}, CONFIG, {
  convertEmptyValues: true
}));

function getUserById(userId) {
  var tableName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : USER_TABLE_NAME;
  var params = {
    TableName: tableName,
    Key: {
      user_id: userId
    }
  };
  return client.get(params).promise().then(function (res) {
    return res.Item && res.Item;
  })["catch"](function (error) {
    console.error(error);
    throw error;
  });
}

module.exports = {
  getUserById: getUserById
};