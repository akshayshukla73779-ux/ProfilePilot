import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { linkedinUrl } = await req.json();

    const response = await fetch(
        `https://api.brightdata.com/datasets/v3/scrape?dataset_id=${process.env.BRIGHTDATA_DATASET_ID}&include_errors=true`,
        {
            method: "POST",
            headers: {
            Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify([
            {
                url: linkedinUrl,
            },
            ]),
        }
        );

    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);

    if (!response.ok) {
    const errorText = await response.text();

    console.log("Bright Data Error:");
    console.log(errorText);

    return NextResponse.json(
        {
        success: false,
        brightDataError: errorText,
        },
        {
        status: response.status,
        }
    );
    }

    const data = await response.json();

    console.log("Bright Data response:");
    console.log(data);

    return NextResponse.json(data);
  } catch (error: any) {
  console.error("ERROR:");
  console.error(error);

  return NextResponse.json(
    {
      success: false,
      error: error.message,
    },
    {
      status: 500,
    }
  );
}
}