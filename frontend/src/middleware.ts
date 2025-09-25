import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const protectedRoute = createRouteMatcher(["/dashboard"]);

// Define routes that should be PUBLIC (no login required)
const publicRoutes = createRouteMatcher([
  "/",
  "/posts(.*)",
  "/profile(.*)",
  "/posts/create",
  "/posts/edit/:id",
  "/api/posts/trending",
  "/api/posts/:id",
  "/api/users/:id",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(
  async (auth, req: NextRequest) => {
    if (!publicRoutes(req)) {
      await auth.protect(); // Use await and call auth()
    }
  },
  {
    signInUrl: "/sign-in",
    signUpUrl: "/sign-up",
    afterSignInUrl: "/",
    afterSignUpUrl: "/",
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
