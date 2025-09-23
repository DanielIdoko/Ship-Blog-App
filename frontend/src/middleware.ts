import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

// PUBLIC routes (no login required)
const publicRoutes = createRouteMatcher([
  "/",
  "/posts(.*)",
  "/profile(.*)",
  "/api/posts/trending",
  "/api/posts/:id",
  "/api/users/:id",
]);

export default clerkMiddleware(
  async (auth, req: NextRequest) => {
    if (!publicRoutes(req)) {
      // Any route not listed as public → must be logged in
      await auth.protect();
    }
  },
  {
    signUpUrl: "/sign-up",
    signInUrl: "/sign-in",
    afterSignInUrl: "/",
    afterSignUpUrl: "/",
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always check API routes
    "/(api|trpc)(.*)",
  ],
};
