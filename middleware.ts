import { getLocaleRedirectPath } from "./src/lib/geoLocale";

export const config = {
  matcher: ["/"],
};

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const redirectPath = getLocaleRedirectPath(
    url.pathname,
    request.headers.get("x-vercel-ip-country"),
    request.headers.get("cookie"),
  );

  if (!redirectPath) {
    return;
  }

  url.pathname = redirectPath;
  return Response.redirect(url, 307);
}
