import { getLocaleForCountry } from "../src/lib/geoLocale";

export const config = {
  runtime: "edge",
};

export default function handler(request: Request) {
  const country = request.headers.get("x-vercel-ip-country");
  const locale = getLocaleForCountry(country);

  return Response.json(
    {
      country,
      locale,
    },
    {
      headers: {
        "Cache-Control": "private, no-store",
      },
    },
  );
}
