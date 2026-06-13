import { Lock } from "lucide-react"
import Link from "next/link"

export function PremiumLock() {
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center">
      <Lock className="w-8 h-8 text-white mb-4" />

      <h3 className="text-xl font-bold text-white mb-2">
        Unlock Full Optimization
      </h3>

      <p className="text-gray-300 text-sm mb-6 text-center px-6">
        Get optimized headlines, ATS keywords and personalized recommendations.
      </p>

    <Link href="/pricing">
        <button className="bg-accent px-6 py-3 rounded-lg font-semibold">
             Upgrade for ₹199
        </button>
    </Link>
    </div>
  )
}