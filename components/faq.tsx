'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How does Profile Pilot work?',
    answer: 'Profile Pilot analyzes your LinkedIn profile using AI and provides recruiter-inspired feedback and recommendations.',
  },
  {
    question: 'How long does the analysis take?',
    answer: 'Most profile reviews are completed in less than 60 seconds.',
  },
  {
    question: 'Is my information secure?',
    answer: 'Your data is processed securely and is never shared with third parties.',
  },
  {
    question: 'Do I need LinkedIn Premium?',
    answer: 'No. Profile Pilot works with regular LinkedIn profiles.',
  },
  {
    question: 'Can I optimize for a specific career?',
    answer: 'Yes. Pro reports can be tailored to your target role and industry.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:border-accent/50"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between bg-card hover:bg-card/80 transition-colors"
          >
            <span className="text-left font-semibold text-foreground">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openIndex === index && (
            <div className="px-6 py-4 bg-card/50 border-t border-border">
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
