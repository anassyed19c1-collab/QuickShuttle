import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME || "RideRequests";

// NOTE: uses Scan + filter for simplicity (fine for a small class project).
// For production, add a Global Secondary Index on `userId` and use Query instead.
export const handler = async (event) => {
  try {
    const userId =
      event.requestContext?.authorizer?.jwt?.claims?.sub || "anonymous";

    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: "userId = :uid",
        ExpressionAttributeValues: { ":uid": userId },
      })
    );

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(result.Items || []),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
