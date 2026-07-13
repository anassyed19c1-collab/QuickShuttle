"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { CAMPUS_BUILDINGS } from "@/lib/campusBuildings";

interface DestinationSelectProps {
  value: string;
  onChange: (destinationId: string) => void;
}

export default function DestinationSelect({
  value,
  onChange,
}: DestinationSelectProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="destination"
        className="block text-sm font-semibold text-slate-700 mb-1.5"
      >
        Destination
      </label>
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
        <select
          id="destination"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-slate-800 shadow-sm transition-all duration-200 hover:border-slate-300 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
        >
          <option value="">Select a building...</option>
          {CAMPUS_BUILDINGS.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}
