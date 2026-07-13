import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import AmplifyProvider from "@/components/AmplifyProvider";

export const metadata: Metadata = {
  title: "QuickShuttle",
  description: "Campus ride & shuttle request system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50">
        <AmplifyProvider>{children}</AmplifyProvider>
      </body>
    </html>
  );
}
