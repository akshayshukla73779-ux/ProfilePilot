'use client'

import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PricingCards() {
  const plans = [
    {
      name: 'Free Analysis',
      price: null,
      description: 'Get started with basic analysis',
      features: [
        'Overall profile score',
        'Category breakdown',
        'Top 3 weaknesses',
        'Basic recommendations',
        'Recruiter-style feedback',
      ],
      popular: false,
      buttonText: 'Analyze My Profile Free',
    },
    {
      name: 'Pro Review',
      price: '₹199',
      description: 'Full optimization suite',
      features: [
        'Complete profile optimization',
        'Rewritten headline',
        'Improved About section',
        'Experience enhancements',
        'Keyword suggestions',
        'Personalized recommendations',
        'Export-ready content',
      ],
      popular: true,
      buttonText: 'Upgrade to Pro',
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`relative border rounded-lg p-8 transition-all ${
            plan.popular
              ? 'border-accent bg-card/50 ring-1 ring-accent/30 md:scale-105'
              : 'border-border bg-card hover:bg-card/80'
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                RECOMMENDED
              </span>
            </div>
          )}

          <h3 className="text-xl font-bold mb-2 text-foreground">{plan.name}</h3>
          
          <div className="mb-6">
            {plan.price ? (
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm">/one-time</span>
              </div>
            ) : (
              <div className="text-lg text-muted-foreground">Always free</div>
            )}
            <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href="/upload"
            className={`w-full inline-flex items-center justify-center py-3 px-4 rounded-lg font-semibold transition-all ${
              plan.popular
                ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
            }`}
          >
            {plan.buttonText}
          </a>
        </div>
      ))}
    </div>
  )
}

