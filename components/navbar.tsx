'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav
      className="
        sticky
        top-0
        z-50
        border-b
        border-white/10
        bg-background/60
        backdrop-blur-xl
        supports-[backdrop-filter]:bg-background/40
      "
    >
      <div className="
        max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        h-16
        flex items-center justify-between
        ">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="ProfilePilot"
            className="w-10 h-10 object-contain"
          />
          <span className="font-bold text-lg">ProfilePilot</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="
            text-muted-foreground
            hover:text-white
            transition-all
            duration-300
            text-sm
            relative
            after:absolute
            after:left-0
            after:-bottom-1
            after:h-[2px]
            after:w-0
            after:bg-blue-500
            after:transition-all
            after:duration-300
            hover:after:w-full
            ">
            Features
          </Link>
          <Link href="/#pricing" className="
            text-muted-foreground
            hover:text-white
            transition-all
            duration-300
            text-sm
            relative
            after:absolute
            after:left-0
            after:-bottom-1
            after:h-[2px]
            after:w-0
            after:bg-blue-500
            after:transition-all
            after:duration-300
            hover:after:w-full
            ">
            Pricing
          </Link>
          <Link href="/#contact" className="
            text-muted-foreground
            hover:text-white
            transition-all
            duration-300
            text-sm
            relative
            after:absolute
            after:left-0
            after:-bottom-1
            after:h-[2px]
            after:w-0
            after:bg-blue-500
            after:transition-all
            after:duration-300
            hover:after:w-full
            ">
            Contact
          </Link>
        </div>

        <Link href="/upload">
          <Button className="
            bg-primary
            text-primary-foreground
            hover:bg-primary/90
            shadow-lg
            hover:shadow-blue-500/20
            transition-all duration-300
            hover:scale-105
            ">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}
