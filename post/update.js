"use strict";

const { sendResponse } = require("../functions/index");
const dynamoDb = require("../config/dynamoDb");

module.exports.updatePost = async event => {
  try {
    const body = JSON.parse(event.body);

    const { postTitle, postBody, imgUrl, tags, id } = body
    const params = {
      TableName: process.env.DYNAMO_TABLE_NAME,
      Key: {
        id
      },
      ExpressionAttributeValues: {
        ":postTitle": postTitle,
        ":postBody": postBody,
        ":imgUrl": imgUrl,
        ":tags": tags
      },
      UpdateExpression:
        "SET postTitle = :postTitle, postBody = :postBody, imgUrl = :imgUrl, tags = :tags",
      ReturnValues: "ALL_NEW"
    };

    const data = await dynamoDb.update(params).promise();
    if (data.Attributes) {
      return sendResponse(200, data.Attributes);
    } else {
      return sendResponse(404, { message: "Updated post data not found" });
    }
  } catch (e) {
    return sendResponse(500, { message: "Could not update this post" });
  }
};
