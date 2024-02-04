import { getPriceData } from "@/utils";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { headers } from "next/headers";

function updatefile(data: JSON, area: "SE1" | "SE2" | "SE3" | "SE4") {
  try {
    // Create dir if not exists
    if (!existsSync("src/data/")) {
      mkdirSync("src/data/");
    }
  } catch (err) {
    return new Response(
      `Failed to create non-existing directory. Error: ${err}`,
      {
        status: 500,
      }
    );
  }

  writeFileSync(`src/data/${area}.json`, `${JSON.stringify(data)}`);
}

/**
 * @description Used to update data for todays prices. Ping it on start of each day with a cron-job.
 * @requires Requires CRON_SECRET in header to authorize updating data.
 */
export async function GET() {
  if (headers().get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized request", {
      status: 401,
    });
  }

  // Fetches data and updates files
  try {
    const SE1 = await getPriceData("SE1");
    const SE2 = await getPriceData("SE2");
    const SE3 = await getPriceData("SE3");
    const SE4 = await getPriceData("SE4");
    updatefile(SE1, "SE1");
    updatefile(SE2, "SE2");
    updatefile(SE3, "SE3");
    updatefile(SE4, "SE4");
  } catch (error) {
    return new Response(`Error: ${error}`, {
      status: 400,
    });
  }

  return new Response("Files updated", {
    status: 200,
  });
}
