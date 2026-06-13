'use client'

import { Check } from 'lucide-react'

export function ScoreBreakdown() {
  const scores = [
    { label: 'Headline', score: 10, maxScore: 15 },
    { label: 'About', score: 12, maxScore: 15 },
    { label: 'Experience', score: 15, maxScore: 20 },
    { label: 'Skills', score: 8, maxScore: 15 },
    { label: 'Keywords', score: 12, maxScore: 15 },
    { label: 'Education', score: 8, maxScore: 10 },
    { label: 'Completeness', score: 7, maxScore: 10 },
  ]

  return (
    <div className="space-y-4">
      {scores.map((item, index) => {
        const percentage = (item.score / item.maxScore) * 100
        return (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{item.label}</span>
              <span className="text-sm text-accent font-semibold">
                {item.score}/{item.maxScore}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-accent/70 transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function UpgradeCard() {
  return (
    <div className="border border-accent/30 rounded-2xl p-8 bg-gradient-to-br from-accent/5 to-transparent">
      <h3 className="text-2xl font-bold text-foreground mb-6">Unlock Full Optimization</h3>
      
      <ul className="space-y-4 mb-8">
        {[
          'Optimized Headline',
          'Rewritten About Section',
          'Experience Improvements',
          'Keyword Suggestions',
        ].map((benefit, index) => (
          <li key={index} className="flex items-center gap-3">
            <Check className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-foreground">{benefit}</span>
          </li>
        ))}
      </ul>

      <button className="w-full bg-accent text-accent-foreground font-semibold py-3 rounded-lg hover:bg-accent/90 transition-colors">
        Upgrade for ₹199
      </button>
    </div>
  )
}
