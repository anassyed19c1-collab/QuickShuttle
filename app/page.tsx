"use client";

// TODO: RE-ENABLE FOR PRODUCTION - real Cognito auth via Authenticator
// import { Authenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
import RideRequestForm from "@/components/RideRequestForm";

// TODO: RE-ENABLE FOR PRODUCTION - remove this mock user + dev bypass, restore <Authenticator> below
const MOCK_USER = {
  signInDetails: { loginId: "test@example.com" },
};

export default function Home() {
  // TODO: RE-ENABLE FOR PRODUCTION - dev-only stand-ins for Authenticator's render props
  const user = MOCK_USER;
  const signOut = () => {
    alert("Sign out is disabled in local dev bypass mode.");
  };

  return (
    // TODO: RE-ENABLE FOR PRODUCTION - swap this <div> back for:
    // <Authenticator>
    //   {({ signOut, user }) => ( ... )}
    // </Authenticator>
    <div className="flex-1 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <span className="font-bold text-lg text-blue-700">
          QuickShuttle 🚐
        </span>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>{user?.signInDetails?.loginId}</span>
          <button
            onClick={signOut}
            className="text-red-600 font-medium hover:underline"
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="flex-1">
        <RideRequestForm />
      </main>
    </div>
  );
}
