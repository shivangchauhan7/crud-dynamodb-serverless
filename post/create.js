"use strict";

const dynamoDb = require("../config/dynamoDb");
const { sendResponse } = require("../functions/index");
const uuidv1 = require("uuid/v1");

module.exports.createPost = async event => {
  const body = JSON.parse(event.body);
  try {
    const { postTitle, postBody, imgUrl, tags } = body;
    const id = uuidv1();
    const TableName = process.env.DYNAMO_TABLE_NAME;
    const params = {
      TableName,
      Item: {
        id,
        postTitle,
        postBody,
        imgUrl,
        tags
      },
      ConditionExpression: "attribute_not_exists(id)"
    };
    await dynamoDb.put(params).promise();
    return sendResponse(200, { message: 'Post created successfully' })
  } catch (e) {
    return sendResponse(500, { message: 'Could not create the post' });
  }
};
