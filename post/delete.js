"use strict";

const { sendResponse } = require("../functions/index");
const dynamoDb = require("../config/dynamoDb");

module.exports.deletePost = async event => {
  try {
    const body = JSON.parse(event.body);
    const { id } = body;
    const params = {
      TableName: process.env.DYNAMO_TABLE_NAME,
      Key: {
        id
      }
    };
    await dynamoDb.delete(params).promise();
    return sendResponse(200, { message: "Post deleted successfully" });
  } catch (e) {
    return sendResponse(500, { message: "Could not delete the post" });
  }
};
