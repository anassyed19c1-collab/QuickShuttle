"use client";

import { Amplify } from "aws-amplify";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { amplifyConfig } from "@/lib/awsConfig";
import { amplifyTheme } from "@/lib/amplifyTheme";
import { ReactNode } from "react";

Amplify.configure(amplifyConfig);

export default function AmplifyProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={amplifyTheme}>{children}</ThemeProvider>;
}
