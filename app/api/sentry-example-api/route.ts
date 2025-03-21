// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// // A faulty API route to test Sentry's error monitoring
// export function GET() {
//   throw new Error("Sentry Example API Route Error");
//   return NextResponse.json({ data: "Testing Sentry Error..." });
// }
// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// export function GET() {
//   try {
//     throw new Error("Sentry Example API Route Error");
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "An error occurred!" }, { status: 500 });
//   }
// }
