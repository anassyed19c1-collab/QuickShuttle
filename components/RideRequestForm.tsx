"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import DestinationSelect from "./DestinationSelect";
import { requestRide, RideRequestResponse } from "@/lib/api";
import { CAMPUS_BUILDINGS } from "@/lib/campusBuildings";

// Leaflet needs the browser `window` object, so load it client-side only
const PickupMap = dynamic(() => import("./PickupMap"), { ssr: false });

export default function RideRequestForm() {
  const [pickup, setPickup] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [destinationId, setDestinationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RideRequestResponse | null>(null);

  const destination = CAMPUS_BUILDINGS.find((b) => b.id === destinationId);

  const canSubmit = pickup !== null && destinationId !== "" && !loading;

  async function handleSubmit() {
    if (!pickup || !destination) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await requestRide({
        pickupLat: pickup.lat,
        pickupLng: pickup.lng,
        destination: destination.name,
      });
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Request a Shuttle</h1>
      <p className="text-sm text-gray-500">
        Tap on the map to set your pickup point, then choose your
        destination.
      </p>

      <PickupMap onPickupSelect={(lat, lng) => setPickup({ lat, lng })} />

      {pickup && (
        <p className="text-xs text-gray-500">
          Pickup: {pickup.lat.toFixed(5)}, {pickup.lng.toFixed(5)}
        </p>
      )}

      <DestinationSelect value={destinationId} onChange={setDestinationId} />

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg disabled:bg-gray-300 hover:bg-blue-700 transition"
      >
        {loading ? "Requesting..." : "Request Ride"}
      </button>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-green-50 text-green-800 border border-green-200 rounded-lg p-4 space-y-1">
          <p className="font-semibold">Shuttle on the way! 🚐</p>
          <p className="text-sm">Driver: {result.driverName}</p>
          <p className="text-sm">Shuttle ID: {result.shuttleId}</p>
          <p className="text-sm">ETA: {result.etaMinutes} min</p>
        </div>
      )}
    </div>
  );
}
