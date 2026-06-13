'use client'

import { Users, Briefcase, TrendingUp, Target } from 'lucide-react'

export function TargetAudienceCards() {
  const audiences = [
    {
      icon: Users,
      title: 'Students',
      description: 'Prepare your profile for internships and placements.',
    },
    {
      icon: Briefcase,
      title: 'Job Seekers',
      description: 'Increase recruiter visibility and attract opportunities.',
    },
    {
      icon: TrendingUp,
      title: 'Professionals',
      description: 'Strengthen your personal brand and online presence.',
    },
    {
      icon: Target,
      title: 'Career Switchers',
      description: 'Optimize your profile for your target industry and role.',
    },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {audiences.map((audience, index) => {
        const Icon = audience.icon
        return (
          <div
            key={index}
            className="group relative border border-border rounded-lg p-6 bg-card hover:bg-card/80 transition-all hover:border-accent/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity pointer-events-none" />
            
            <div className="relative">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              
              <h3 className="text-base font-semibold mb-2 text-foreground">{audience.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{audience.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
