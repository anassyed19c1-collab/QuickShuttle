// Maps the QuickShuttle brand palette (see app/globals.css) onto Amplify UI's
// design tokens so the Cognito sign-in/sign-up screens match the rest of the app.
import type { Theme } from "@aws-amplify/ui-react";

export const amplifyTheme: Theme = {
  name: "quickshuttle-theme",
  tokens: {
    colors: {
      brand: {
        primary: {
          10: { value: "#eef2ff" },
          20: { value: "#e0e7ff" },
          40: { value: "#a5b4fc" },
          60: { value: "#6366f1" },
          80: { value: "#4f46e5" },
          90: { value: "#4338ca" },
          100: { value: "#362f78" },
        },
      },
    },
    components: {
      button: {
        borderRadius: "{radii.medium}",
        primary: {
          backgroundColor: "{colors.brand.primary.80}",
          _hover: { backgroundColor: "{colors.brand.primary.90}" },
          _focus: { backgroundColor: "{colors.brand.primary.90}" },
          _active: { backgroundColor: "{colors.brand.primary.100}" },
        },
        link: {
          color: "{colors.brand.primary.80}",
        },
      },
      fieldcontrol: {
        borderRadius: "{radii.medium}",
        _focus: {
          borderColor: "{colors.brand.primary.60}",
        },
      },
      tabs: {
        item: {
          _active: {
            color: "{colors.brand.primary.80}",
            borderColor: "{colors.brand.primary.80}",
          },
        },
      },
      authenticator: {
        router: {
          boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
        },
      },
    },
    radii: {
      small: { value: "8px" },
      medium: { value: "10px" },
      large: { value: "16px" },
    },
    fonts: {
      default: {
        variable: { value: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" },
        static: { value: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" },
      },
    },
  },
};
