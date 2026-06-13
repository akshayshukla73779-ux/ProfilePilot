'use client'

import { Users } from 'lucide-react'

export function TrustBadge() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm">
        <Users className="w-4 h-4 text-accent" />
        <span className="text-muted-foreground">Built for Students</span>
      </div>
      <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm">
        <Users className="w-4 h-4 text-accent" />
        <span className="text-muted-foreground">Job Seekers</span>
      </div>
      <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm">
        <Users className="w-4 h-4 text-accent" />
        <span className="text-muted-foreground">Professionals</span>
      </div>
    </div>
  )
}
