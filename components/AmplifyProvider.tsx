"use client";

import { Amplify } from "aws-amplify";
import { amplifyConfig } from "@/lib/awsConfig";
import { ReactNode } from "react";

Amplify.configure(amplifyConfig);

export default function AmplifyProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
