"use client";
export default function PricingPage() {
  const handlePayment = async () => {
  try {
    const response = await fetch("/api/create-order", {
      method: "POST",
    });

    const order = await response.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "ProfilePilot",
      description: "LinkedIn Profile Optimization",
      order_id: order.id,

      handler: async function (response: any) {
        try {
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const data = await verifyResponse.json();

          if (data.success) {
            sessionStorage.setItem("paymentVerified", "true");

            window.location.href="/results"
          } else {
            alert("Payment verification failed.");
          }
        } catch (error) {
          console.error(error);
        }
      },

      theme: {
        color: "#3B82F6",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.error(error);
  }
};
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-lg w-full border border-border rounded-3xl p-10 bg-card text-center">


        <h1 className="text-4xl font-bold mb-4">
          Unlock Full Optimization
        </h1>


        <p className="text-muted-foreground mb-8">
          Get recruiter-grade LinkedIn optimization and ATS recommendations.
        </p>


        <div className="text-5xl font-bold mb-8">
          ₹199
        </div>


        <div className="space-y-4 text-left mb-10">
          <p>✅ Optimized Headline</p>
          <p>✅ Alternative Headlines</p>
          <p>✅ ATS Keywords</p>
          <p>✅ Priority Improvements</p>
          <p>✅ Headline Feedback</p>
          <p>✅ About Feedback</p>
          <p>✅ Experience Feedback</p>
          <p>✅ Skills Feedback</p>
          <p>✅ About Section Suggestions</p>
          <p>✅ Personalized Recommendations</p>
        </div>


        <button
          onClick={handlePayment}
          className="w-full bg-accent text-accent-foreground py-4 rounded-xl font-semibold"
        >
          Continue to Payment
        </button>


      </div>
    </main>
  )
}
