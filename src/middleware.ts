import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let locales = ["es", "en"];
let defaultLocale = "es";

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;

    // Exclude static files, API routes, SEO files, and Next.js internals
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml' ||
        pathname === '/llms.txt' ||
        pathname === '/favicon.ico' ||
        pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|txt|xml|json|pdf)$/)
    ) {
        return;
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    // For simplicity, we just use the defaultLocale. In a more advanced setup,
    // you might parse the Accept-Language header.
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;

    // e.g. incoming request is /productos
    // The new URL is now /es/productos
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
};
