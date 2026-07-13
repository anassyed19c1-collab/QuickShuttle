# QuickShuttle 🚐

Campus Ride/Shuttle Request System — a university-focused clone of the AWS
"Wild Rydes" reference architecture, built with 7 AWS services.

## Architecture

```
GitHub  ->  AWS Amplify (hosting, auto-deploy)
              |
        Next.js frontend (TypeScript, react-leaflet, Tailwind)
              |
        Amazon Cognito (login/signup)
              |
        API Gateway  (Cognito JWT authorizer)
              |
        AWS Lambda (Node.js handlers, NOT Express)
              |
        Amazon DynamoDB  (table: RideRequests, partition key: RideId)

IAM: Lambda execution role scoped to DynamoDB PutItem/Scan on RideRequests
```

## Folder structure

```
app/                  Next.js App Router pages
components/            React components (map, dropdown, form, auth wrapper)
lib/                   Config + API helper functions
lambda/                3 standalone Lambda functions (deployed separately, NOT part of Next.js build)
  bookRide/              POST /rides       -> creates a ride request
  getMyRides/            GET  /rides       -> student's own ride history
  getAllRides/           GET  /admin/rides -> admin view of all rides
```

> Important: the `lambda/` folder is deployed to AWS Lambda directly
> (zip upload or console paste). It is NOT part of the Next.js app build.
> Next.js never runs its own backend -- it calls API Gateway directly.

## Local development

```bash
npm install
cp .env.local.example .env.local   # fill in values after Cognito + API Gateway setup
npm run dev
```

## AWS Setup Order

1. GitHub -- push this repo
2. AWS Amplify -- connect repo, deploy Next.js app
3. Amazon Cognito -- create User Pool (SPA app client)
4. Amazon DynamoDB -- create table `RideRequests`, partition key `RideId` (String)
5. IAM -- role for Lambda with DynamoDB `PutItem`/`Scan` on the table
6. AWS Lambda -- deploy the 3 functions in `lambda/`
7. API Gateway -- HTTP API, Cognito JWT authorizer, routes:
   - `POST /rides` -> bookRide
   - `GET /rides` -> getMyRides
   - `GET /admin/rides` -> getAllRides
8. Fill in `.env.local` (and Amplify Console env vars) with the real IDs/URLs, redeploy

## Tech stack

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS
- react-leaflet + OpenStreetMap (pickup point map)
- aws-amplify + @aws-amplify/ui-react (Cognito auth UI)
- AWS Lambda (Node.js 22.x, ES modules, AWS SDK v3)
