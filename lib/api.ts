// TODO: RE-ENABLE FOR PRODUCTION - real Cognito + API Gateway integration
// import { fetchAuthSession } from "aws-amplify/auth";
// import { API_BASE_URL } from "./awsConfig";

// TODO: RE-ENABLE FOR PRODUCTION - restore real auth token retrieval
// async function getAuthToken(): Promise<string> {
//   const session = await fetchAuthSession();
//   const token = session.tokens?.idToken?.toString();
//   if (!token) throw new Error("Not authenticated");
//   return token;
// }

// TODO: RE-ENABLE FOR PRODUCTION - dev-only mock helpers, delete when restoring real API calls
const MOCK_SHUTTLE_IDS = ["SH-101", "SH-204", "SH-317", "SH-422"];
const MOCK_DRIVER_NAMES = ["Alex Rivera", "Jordan Lee", "Sam Patel", "Casey Kim"];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function mockDelay<T>(value: T, ms = 800): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export interface RideRequestPayload {
  pickupLat: number;
  pickupLng: number;
  destination: string;
}

export interface RideRequestResponse {
  rideId: string;
  status: string;
  shuttleId: string;
  driverName: string;
  etaMinutes: number;
}

export async function requestRide(
  payload: RideRequestPayload
): Promise<RideRequestResponse> {
  // TODO: RE-ENABLE FOR PRODUCTION - restore real Cognito + API Gateway call below
  return mockDelay({
    rideId: `mock-${Date.now()}`,
    status: "confirmed",
    shuttleId: randomFrom(MOCK_SHUTTLE_IDS),
    driverName: randomFrom(MOCK_DRIVER_NAMES),
    etaMinutes: Math.floor(Math.random() * 12) + 3,
  });

  // TODO: RE-ENABLE FOR PRODUCTION - original implementation
  // const token = await getAuthToken();
  //
  // const res = await fetch(`${API_BASE_URL}/rides`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: token,
  //   },
  //   body: JSON.stringify(payload),
  // });
  //
  // if (!res.ok) {
  //   const errText = await res.text();
  //   throw new Error(`Ride request failed: ${res.status} ${errText}`);
  // }
  //
  // return res.json();
}

export interface RideRecord {
  rideId: string;
  pickupLat: number;
  pickupLng: number;
  destination: string;
  status: string;
  shuttleId: string;
  driverName: string;
  requestedAt: string;
}

export async function getMyRides(): Promise<RideRecord[]> {
  // TODO: RE-ENABLE FOR PRODUCTION - restore real Cognito + API Gateway call below
  return mockDelay([
    {
      rideId: `mock-${Date.now()}`,
      pickupLat: 37.7749,
      pickupLng: -122.4194,
      destination: "Main Library",
      status: "completed",
      shuttleId: randomFrom(MOCK_SHUTTLE_IDS),
      driverName: randomFrom(MOCK_DRIVER_NAMES),
      requestedAt: new Date().toISOString(),
    },
  ]);

  // TODO: RE-ENABLE FOR PRODUCTION - original implementation
  // const token = await getAuthToken();
  //
  // const res = await fetch(`${API_BASE_URL}/rides`, {
  //   method: "GET",
  //   headers: { Authorization: token },
  // });
  //
  // if (!res.ok) {
  //   throw new Error(`Failed to fetch rides: ${res.status}`);
  // }
  //
  // return res.json();
}
