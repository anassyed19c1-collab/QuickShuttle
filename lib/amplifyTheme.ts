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
        transitionDuration: "150ms",
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
        transitionDuration: "150ms",
        _focus: {
          borderColor: "{colors.brand.primary.60}",
          boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.15)",
        },
      },
      tabs: {
        borderColor: "transparent",
        item: {
          fontWeight: "600",
          transitionDuration: "150ms",
          borderColor: "transparent",
          color: "{colors.font.tertiary}",
          _hover: {
            color: "{colors.brand.primary.80}",
          },
          _active: {
            color: "{colors.brand.primary.80}",
            borderColor: "{colors.brand.primary.80}",
          },
        },
      },
      authenticator: {
        container: {
          widthMax: "60rem",
        },
        router: {
          borderWidth: "0",
          boxShadow: "none",
          backgroundColor: "transparent",
        },
      },
      alert: {
        paddingBlock: "0.875rem",
        paddingInline: "1rem",
        error: {
          backgroundColor: "#fef2f2",
          color: "#b91c1c",
        },
      },
    },
    radii: {
      small: { value: "8px" },
      medium: { value: "10px" },
      large: { value: "20px" },
    },
    fonts: {
      default: {
        variable: { value: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" },
        static: { value: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" },
      },
    },
  },
};
