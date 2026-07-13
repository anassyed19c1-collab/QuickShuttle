import { fetchAuthSession } from "aws-amplify/auth";
import { API_BASE_URL } from "./awsConfig";

// Grabs the current Cognito ID token to send as Bearer auth to API Gateway
async function getAuthToken(): Promise<string> {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  if (!token) throw new Error("Not authenticated");
  return token;
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
  const token = await getAuthToken();

  const res = await fetch(`${API_BASE_URL}/rides`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Ride request failed: ${res.status} ${errText}`);
  }

  return res.json();
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
  const token = await getAuthToken();

  const res = await fetch(`${API_BASE_URL}/rides`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch rides: ${res.status}`);
  }

  return res.json();
}
