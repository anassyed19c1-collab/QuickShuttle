"use client";

import { Bus, Clock, MapPin, ShieldCheck } from "lucide-react";

const FEATURES = [
  { icon: MapPin, text: "Live pickup point on the campus map" },
  { icon: Clock, text: "Real-time ETA and driver details" },
  { icon: ShieldCheck, text: "Verified student accounts only" },
];

export default function AuthBrandingPanel() {
  return (
    <div className="relative flex flex-1 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-8 py-10 text-white sm:px-10 sm:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
          <Bus className="h-5 w-5" strokeWidth={2.25} />
        </span>
        <span className="text-lg font-bold tracking-tight">QuickShuttle</span>
      </div>

      <div className="relative mt-8 sm:mt-0">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Campus rides,
          <br />
          on demand.
        </h1>
        <p className="mt-3 max-w-sm text-sm text-brand-100/90 sm:text-base">
          Request a shuttle in seconds, track your pickup, and get where
          you&apos;re going — safely and on time.
        </p>

        <div className="mt-8 hidden flex-col gap-3 sm:flex">
          {FEATURES.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2.5 text-sm text-brand-50"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
              {text}
            </div>
          ))}
        </div>
      </div>

      <p className="relative hidden text-xs text-brand-200/70 sm:block">
        University of Karachi · Campus Shuttle Network
      </p>
    </div>
  );
}
