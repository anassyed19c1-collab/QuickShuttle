import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME || "RideRequests";

// Dummy shuttle/driver pool — simulates assignment like Wild Rydes' unicorn
const SHUTTLES = [
  { shuttleId: "SH-101", driverName: "Ahmed Khan" },
  { shuttleId: "SH-102", driverName: "Bilal Ahmed" },
  { shuttleId: "SH-103", driverName: "Sara Malik" },
  { shuttleId: "SH-104", driverName: "Ayesha Raza" },
];

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { pickupLat, pickupLng, destination } = body;

    if (pickupLat == null || pickupLng == null || !destination) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "pickupLat, pickupLng and destination are required" }),
      };
    }

    // Cognito JWT authorizer on API Gateway puts claims here
    const userId =
      event.requestContext?.authorizer?.jwt?.claims?.sub || "anonymous";

    const shuttle = SHUTTLES[Math.floor(Math.random() * SHUTTLES.length)];
    const rideId = randomUUID();

    const item = {
      RideId: rideId,
      userId,
      pickupLat,
      pickupLng,
      destination,
      status: "ASSIGNED",
      shuttleId: shuttle.shuttleId,
      driverName: shuttle.driverName,
      etaMinutes: Math.floor(Math.random() * 8) + 3,
      requestedAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({ TableName: TABLE_NAME, Item: item })
    );

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        rideId: item.RideId,
        status: item.status,
        shuttleId: item.shuttleId,
        driverName: item.driverName,
        etaMinutes: item.etaMinutes,
      }),
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
