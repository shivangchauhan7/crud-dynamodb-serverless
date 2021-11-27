"use strict";

const { sendResponse } = require("../functions/index");
const dynamoDb = require("../config/dynamoDb");

module.exports.getPost = async event => {
  try {
    const { id } = event.pathParameters;
    const params = {
      TableName: process.env.DYNAMO_TABLE_NAME,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id
      },
      Select: "ALL_ATTRIBUTES"
    };

    const data = await dynamoDb.query(params).promise();
    if (data.Count > 0) {
      return sendResponse(200, { item: data.Items });
    } else {
      return sendResponse(404, { message: "Post not found" });
    }
  } catch (e) {
    return sendResponse(500, { message: "Could not get the post" });
  }
};
