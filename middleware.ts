import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const APIUnauthorized = NextResponse.json("Unauthorized", { status: 401 });

export default withAuth(
    async function middleware(req) {
        const token = await getToken({ req });
        const isAuth = !!token;
        const isAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
        const isApiRoute = req.nextUrl.pathname.startsWith("/api");

        /*
         * if it's not an api route,
         * and the user is not signed in,
         * the user should be redirected to the signin page when trying to access it
         */
        if (!isApiRoute) {
            if (!isAuth) {
                let from = req.nextUrl.pathname;
                if (req.nextUrl.search) {
                    from += req.nextUrl.search;
                }
                //redirect to signin page
                return NextResponse.redirect(
                    new URL(`/auth/signin?from=${encodeURIComponent(from)}`, req.url)
                );
            }
        }

        /*
         * if it's an api route,
         * and its not the authentication routes,
         * the user shouldn't be able to access it if they are not signed in
         */

        if (isAuthRoute) {
            return NextResponse.next();
        }

        if (!isAuth) {
            return APIUnauthorized;
        }
    },
    {
        callbacks: {
            async authorized() {
                // This is a work-around for handling redirect on auth pages.
                // We return true here so that the middleware function above
                // is always called.
                return true;
            },
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*", "/api/:path*", "/auth/signout"],
};
