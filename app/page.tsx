"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Bus, LogOut } from "lucide-react";
import RideRequestForm from "@/components/RideRequestForm";

function getInitials(loginId: string | undefined): string {
  if (!loginId) return "?";
  const name = loginId.split("@")[0];
  return name.slice(0, 2).toUpperCase();
}

export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => {
        const loginId = user?.signInDetails?.loginId;

        return (
          <div className="flex-1 flex flex-col">
            <header className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-sm shadow-brand-600/30">
                  <Bus className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  QuickShuttle
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2.5">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold ring-1 ring-brand-200">
                    {getInitials(loginId)}
                  </span>
                  <span className="text-sm font-medium text-slate-600">
                    {loginId}
                  </span>
                </div>
                <button
                  onClick={signOut}
                  className="group flex items-center gap-1.5 rounded-full border border-slate-200 pl-3 pr-3.5 py-1.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-3.5 w-3.5" strokeWidth={2.25} />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </div>
            </header>
            <main className="flex-1 bg-slate-50">
              <RideRequestForm />
            </main>
          </div>
        );
      }}
    </Authenticator>
  );
}
