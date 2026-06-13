'use client'

import { Brain, Zap, Lightbulb } from 'lucide-react'

export function FeatureCards() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Uses modern recruiter and LinkedIn best practices.',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Receive your score and feedback in under 60 seconds.',
    },
    {
      icon: Lightbulb,
      title: 'Actionable Recommendations',
      description: 'Know exactly what to improve to strengthen your profile.',
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon
        return (
          <div
            key={index}
            className="
            group
            relative
            border
            border-border
            rounded-lg
            p-8
            bg-card

            cursor-pointer

            transition-all
            duration-300

            hover:-translate-y-2
            hover:scale-[1.02]
            hover:bg-card/80
            hover:border-blue-500/30
            hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]
            "
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity pointer-events-none" />
            
            <div className="relative">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              
              <h3 className="text-lg font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
