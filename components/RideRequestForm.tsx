"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  AlertCircle,
  Bus,
  Clock,
  Loader2,
  MapPin,
  MousePointerClick,
  Sparkles,
  User,
} from "lucide-react";
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
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
      <div className="space-y-6 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-md shadow-slate-200/50 sm:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Request a Shuttle
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Tap on the map to set your pickup point, then choose your
            destination.
          </p>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="block text-sm font-semibold text-slate-700">
              Pickup location
            </label>
            {pickup && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-200">
                <MapPin className="h-3 w-3" strokeWidth={2.5} />
                {pickup.lat.toFixed(5)}, {pickup.lng.toFixed(5)}
              </span>
            )}
          </div>

          <PickupMap onPickupSelect={(lat, lng) => setPickup({ lat, lng })} />

          {!pickup && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
              <MousePointerClick className="h-3.5 w-3.5" />
              No pickup point selected yet
            </p>
          )}
        </div>

        <DestinationSelect value={destinationId} onChange={setDestinationId} />

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 py-3 font-semibold text-white shadow-lg shadow-accent-500/25 transition-all duration-200 hover:from-accent-600 hover:to-accent-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none"
        >
          {loading ? (
            <>
              <Loader2 className="h-4.5 w-4.5 animate-spin" />
              Requesting...
            </>
          ) : (
            "Request Ride"
          )}
        </button>

        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            <div>
              <p className="text-sm font-semibold text-red-800">
                Something went wrong
              </p>
              <p className="mt-0.5 text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="animate-fade-slide-in space-y-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm shadow-emerald-500/30">
                <Sparkles className="h-4.5 w-4.5" strokeWidth={2.25} />
              </span>
              <p className="font-bold text-emerald-800">
                Shuttle on the way!
              </p>
            </div>

            <div className="space-y-2.5 rounded-xl bg-white/70 p-4 ring-1 ring-emerald-100">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <User className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-slate-400">Driver</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {result.driverName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Bus className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-slate-400">Shuttle ID</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {result.shuttleId}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Clock className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-slate-400">ETA</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {result.etaMinutes} min
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
