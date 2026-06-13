"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PremiumSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const verified = sessionStorage.getItem("paymentVerified");

    if (!verified) {
      router.push("/");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold">
          Payment Successful 🎉
        </h1>

        <p className="mt-4 text-muted-foreground">
          Your premium LinkedIn optimization is ready.
        </p>
      </div>
    </main>
  );
}