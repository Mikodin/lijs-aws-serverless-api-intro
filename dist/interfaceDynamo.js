"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDynamoClient = createDynamoClient;
exports.getUserById = getUserById;
exports.createUser = createUser;

var _awsSdk = require("aws-sdk");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CONFIG = {
  maxRetries: 5,
  httpOptions: {
    timeout: 5000
  },
  region: 'us-east-1'
};

function createDynamoClient() {
  return new _awsSdk.DynamoDB.DocumentClient(_objectSpread({}, CONFIG, {
    convertEmptyValues: true
  }));
}

function getUserById(userId) {
  var tableName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : USER_TABLE_NAME;
  var client = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : createDynamoClient();
  var params = {
    TableName: tableName,
    Key: {
      user_id: draftId
    }
  };
  return client.get(params).promise().then(function (res) {
    return res.Item && res.Item;
  })["catch"](function (error) {
    log.info('Error in interface-dynamo getUserById', {
      userId: userId,
      tableName: tableName,
      error: error
    });
    throw error;
  });
}

function createUser(user) {
  var tableName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : USER_TABLE_NAME;
  var client = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : createDynamoClient();
  var now = Date.now();
  var params = {
    TableName: tableName,
    Item: {
      user: user
    }
  };
  return client.put(params).promise().then(function (res) {
    return Boolean(res);
  })["catch"](function (error) {
    log.info('Error in interface-dynamo createUser', {
      user: user,
      tableName: tableName,
      error: error
    });
    throw error;
  });
}