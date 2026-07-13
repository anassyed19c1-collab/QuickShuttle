// AWS Amplify / Cognito configuration
// Values come from environment variables set in Amplify Console (or .env.local for local dev)

export const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "",
      region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
    },
  },
};

// Base URL of the API Gateway deployment (e.g. https://xxxx.execute-api.us-east-1.amazonaws.com)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
