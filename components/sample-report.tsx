'use client'

export function SampleReport() {
  const scores = [
    { label: 'Headline', score: 8 },
    { label: 'About Section', score: 7 },
    { label: 'Experience', score: 9 },
    { label: 'Skills', score: 8 },
    { label: 'Keywords', score: 6 },
    { label: 'Recruiter Friendliness', score: 8 },
    { label: 'Personal Branding', score: 8 },
    { label: 'Profile Completeness', score: 9 },
  ]

  const overallScore = 76

  return (
    <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Overall Score */}
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 rounded-full border-8 border-accent/20 flex items-center justify-center bg-card/50">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">{overallScore}</div>
              <div className="text-xs text-muted-foreground mt-1">Overall Score</div>
            </div>
            <div className="absolute inset-0 rounded-full border-8 border-t-accent border-r-accent border-b-transparent border-l-transparent" style={{clipPath: `polygon(0 0, 100% 0, 100% ${(overallScore/100)*100}%, 0 ${(overallScore/100)*100}%)`}} />
          </div>
        </div>

        {/* Scores Grid */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {scores.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="text-sm font-bold text-accent">{item.score}/10</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-accent rounded-full h-full transition-all duration-300"
                  style={{ width: `${(item.score / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-8 border-t border-border">
        <a href="/upload" className="inline-flex items-center justify-center h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-semibold transition-all">
          Get My LinkedIn Score
        </a>
      </div>
    </div>
  )
}
