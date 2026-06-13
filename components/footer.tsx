'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="ProfilePilot"
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold">ProfilePilot</span>
          </div>

          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/support" className="hover:text-foreground transition-colors">Support</Link>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 ProfilePilot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

