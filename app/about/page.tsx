import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">About ProfilePilot</h1>
          
          <div className="prose prose-invert max-w-none space-y-8 text-foreground">
            <p className="text-lg text-muted-foreground leading-relaxed">
              ProfilePilot is an AI-powered platform designed to help professionals optimize their LinkedIn profiles and attract recruiter attention. We combine modern LinkedIn best practices with AI analysis to provide actionable feedback.
            </p>

            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe that everyone deserves a professional LinkedIn profile that accurately represents their skills and experience. Our mission is to democratize profile optimization and help professionals at every career stage present their best selves to recruiters.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Why ProfilePilot?</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>AI-powered analysis based on recruiter feedback patterns</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Instant scoring across 8 key profile categories</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Personalized recommendations tailored to your career goals</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Before and after examples showing real improvements</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-border pt-8">
              <Link href="/" className="text-accent hover:text-accent/80 font-semibold">
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
