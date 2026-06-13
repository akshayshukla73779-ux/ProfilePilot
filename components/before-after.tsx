'use client'

export function BeforeAfter() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Before Card */}
      <div className="border border-border rounded-lg p-8 bg-card/50">
        <div className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold mb-6">
          Before
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Headline</h3>
            <p className="text-foreground/80">Software Engineer at XYZ</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">About</h3>
            <p className="text-foreground/80 text-sm leading-relaxed">
              Passionate software engineer with experience in development.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Experience</h3>
            <p className="text-foreground/80 text-sm leading-relaxed">
              Worked on several projects and technologies.
            </p>
          </div>
        </div>
      </div>

      {/* After Card */}
      <div className="border border-accent/30 rounded-lg p-8 bg-gradient-to-br from-card via-card to-card/50 relative overflow-hidden">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold mb-6">
            Optimized by AI
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-accent mb-2">Headline</h3>
              <p className="text-foreground font-medium">Full Stack Developer | React • Node.js • TypeScript | Building Scalable Web Applications</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-accent mb-2">About</h3>
              <p className="text-foreground text-sm leading-relaxed">
                Results-driven Full Stack Developer with expertise in modern web technologies and scalable application development.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-accent mb-2">Experience</h3>
              <p className="text-foreground text-sm leading-relaxed">
                Built scalable web applications and delivered solutions using React, Node.js, and TypeScript.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
