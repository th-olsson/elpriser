import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

/**
 * @description On-demand revalidation. Ping on beginning of each day with a cron-job to update prices for the new day.
 * @requires CRON_SECRET
 */
export async function GET() {
  if (headers().get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized request", {
      status: 401,
    });
  }

  revalidateTag("daily-prices");

  return Response.json(
    { revalidated: true, now: Date.now() },
    {
      status: 200,
    }
  );
}
