import { NextRequest, NextResponse } from "next/server";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({
  token: process.env.APIFY_API_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { linkedinUrl } = await req.json();

    const input = {
      profileScraperMode: "Profile details no email ($4 per 1k)",
      queries: [linkedinUrl],
    };

    const run = await client
      .actor("harvestapi/linkedin-profile-scraper")
      .call(input);

    const { items } = await client
      .dataset(run.defaultDatasetId)
      .listItems();

    console.log("APIFY RESULTS:");
    console.log(JSON.stringify(items, null, 2));

    if (!items.length) {
      return NextResponse.json(
        {
          success: false,
          error: "No profile found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(items[0]);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}