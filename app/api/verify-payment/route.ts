import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    const isValid =
      generatedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid signature",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error("Verification Error:", error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}