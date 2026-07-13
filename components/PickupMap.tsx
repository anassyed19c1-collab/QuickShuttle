"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import { CAMPUS_CENTER } from "@/lib/campusBuildings";

// Fix default marker icon paths (Leaflet + bundlers issue)
const pinIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface PickupMapProps {
  onPickupSelect: (lat: number, lng: number) => void;
}

function ClickHandler({
  onPickupSelect,
  setPosition,
}: {
  onPickupSelect: (lat: number, lng: number) => void;
  setPosition: (pos: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onPickupSelect(lat, lng);
    },
  });
  return null;
}

export default function PickupMap({ onPickupSelect }: PickupMapProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  return (
    <div
      className={`h-80 w-full overflow-hidden rounded-2xl border-2 shadow-sm transition-colors duration-300 ${
        position
          ? "border-brand-400 shadow-brand-500/10"
          : "border-slate-200"
      }`}
    >
      <MapContainer
        center={CAMPUS_CENTER}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onPickupSelect={onPickupSelect} setPosition={setPosition} />
        {position && <Marker position={position} icon={pinIcon} />}
      </MapContainer>
    </div>
  );
}
