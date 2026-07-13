"use client";

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
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Destination
      </label>
      <select
        id="destination"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a building...</option>
        {CAMPUS_BUILDINGS.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
    </div>
  );
}
