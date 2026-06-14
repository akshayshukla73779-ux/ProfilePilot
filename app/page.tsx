import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FeatureCards } from '@/components/feature-cards'
import { TargetAudienceCards } from '@/components/target-audience-cards'
import { TrustBadge } from '@/components/trust-badge'
import { SampleReport } from '@/components/sample-report'
import { BeforeAfter } from '@/components/before-after'
import { PricingCards } from '@/components/pricing-cards'
import { FAQ } from '@/components/faq'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { AnimatedSection } from "@/components/animated-section"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="
            absolute top-[-150px] left-[-150px]
            h-[500px] w-[500px]
            rounded-full
            bg-blue-500/20
            blur-[120px]
            animate-[pulse_8s_ease-in-out_infinite]
          "
        />

        <div
          className="
            absolute bottom-[-150px] right-[-150px]
            h-[500px] w-[500px]
            rounded-full
            bg-purple-500/20
            blur-[120px]
            animate-[pulse_10s_ease-in-out_infinite]
          "
        />

        <div
          className="
            absolute top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            h-[350px] w-[350px]
            rounded-full
            bg-cyan-500/10
            blur-[120px]
            animate-[pulse_12s_ease-in-out_infinite]
          "
        />
      </div>

      <div className="relative z-10">
        <Navbar />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        <div
          className="
            relative overflow-hidden
            rounded-3xl
            border border-white/10
            bg-card/40
            backdrop-blur-xl
            p-10 md:p-14
            shadow-2xl
          "
        >

          {/* Glow */}
          <div
            className="
              absolute top-0 right-0
              h-[300px] w-[300px]
              bg-cyan-500/20
              blur-[140px]
            "
          />

          <div className="relative z-10">

            <div
              className="
              inline-flex items-center gap-2
              rounded-full
              border border-blue-500/20
              bg-blue-500/10
              px-4 py-2
              mb-6
              "
            >
              ✨ NEW
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">

              Meet

              <span
                className="
                bg-gradient-to-r
                from-blue-400
                via-cyan-400
                to-purple-500
                bg-clip-text
                text-transparent
                "
              >
                {" "}AI Job Application Copilot
              </span>

            </h1>

            <p className="text-muted-foreground text-lg leading-8 max-w-3xl mb-10">

              Upload your resume and compare it with any job description.

              Receive ATS scores, interview probability, recruiter insights,
              red flags, missing keywords and AI-powered resume rewrites.

            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-10">

              <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
                📊 ATS Score & Interview Probability
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
                👔 Recruiter's Perspective
              </div>

              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
                🚨 Red Flags & Missing Keywords
              </div>

              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5">
                ✨ AI Resume Rewrite
              </div>

            </div>

            <Link href="/copilot">

              <Button
                className="
                h-12 px-8
                bg-gradient-to-r
                from-blue-500
                to-purple-600
                hover:scale-105
                transition-all duration-300
                shadow-[0_0_30px_rgba(59,130,246,0.35)]
                "
              >
                Try AI Copilot →
              </Button>

            </Link>

          </div>

        </div>

      </section>
        <main className="flex-1">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">

              Optimize Your LinkedIn Profile

              <span
                className="
                  bg-gradient-to-r
                  from-blue-400
                  via-cyan-400
                  to-purple-500
                  bg-clip-text
                  text-transparent
                "
              >
                {" "}
                <span
                  className="
                  bg-gradient-to-r
                  from-blue-400
                  via-cyan-400
                  to-purple-500
                  bg-clip-text
                  text-transparent
                  drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]
                  "
                  >
                  with AI
                  </span>
              </span>

            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Get recruiter-style scoring, actionable insights, and personalized
              recommendations to stand out and land more interviews.
            </p>

            {/* Benefit Bullets */}
            <div className="flex flex-col gap-3 mb-12 max-w-xl mx-auto">
              <div className="flex items-center justify-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">
                  Recruiter-style scoring
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">
                  Personalized recommendations
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">
                  Instant feedback
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/upload">
                <Button
                  className="
                  h-12 px-8
                  bg-gradient-to-r from-blue-500 to-purple-600
                  hover:scale-105
                  transition-all duration-300
                  shadow-[0_0_30px_rgba(59,130,246,0.35)]
                  text-white
                  text-base
                  font-semibold
                  "
                >
                  Analyze My Profile Free
                </Button>
              </Link>

              <Link href="#sample-report">
                <Button
                  variant="outline"
                  className="h-12 px-8 border-border text-foreground hover:bg-card text-base font-semibold"
                >
                  See Sample Report
                </Button>
              </Link>
            </div>

            <TrustBadge />
          </section>

          {/* Features Section */}
          <AnimatedSection>
            <section
              id="features"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-border"
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  What Makes ProfilePilot Different
                </h2>

                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Everything you need to stand out to recruiters and land more interviews
                </p>
                <div className="mb-8 flex justify-center">

                <div
                  className="
                    inline-flex items-center gap-2
                    rounded-full
                    border border-white/10
                    bg-card/40
                    backdrop-blur-xl
                    px-4 py-2
                    text-sm
                    text-muted-foreground
                    shadow-lg
                    mt-4
                  "
                >
                  <span
                    className="
                      bg-gradient-to-r
                      from-blue-400
                      via-cyan-400
                      to-purple-500
                      bg-clip-text
                      text-transparent
                    "
                  >
                    ✨ Trusted by Students, Job Seekers & Professionals
                  </span>
                </div>

              </div>
                
              </div>
              

              <FeatureCards />
            </section>
          </AnimatedSection>  
          {/* Sample Report Section */}
          <AnimatedSection>  
            <section
              id="sample-report"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-border"
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  See What Your Results Look Like
                </h2>

                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  See exactly what recruiters see.
                </p>
              </div>

              <SampleReport />
            </section>
          </AnimatedSection>
          {/* Before / After */}
          <AnimatedSection>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-border">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Small Changes. Big Difference.
                </h2>

                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  See how AI optimization can transform your profile.
                </p>
              </div>

              <BeforeAfter />
            </section>
          </AnimatedSection>
          {/* Target Audience */}
          <AnimatedSection>
            <section
              id="audience"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-border"
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Who Is ProfilePilot For?
                </h2>

                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Designed for professionals at every career stage
                </p>
              </div>

              <TargetAudienceCards />
            </section>
          </AnimatedSection>

          {/* Pricing */}
          <AnimatedSection>
            <section
              id="pricing"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-border"
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Simple, Transparent Pricing
                </h2>

                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Start free and unlock premium features when you&apos;re ready
                </p>
              </div>

              <div className="flex justify-center">
                <PricingCards />
              </div>
            </section>
          </AnimatedSection>

          {/* FAQ */}
          <AnimatedSection>
            <section
              id="faq"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-border"
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="max-w-2xl mx-auto">
                <FAQ />
              </div>
            </section>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-border">
              <div className="bg-card border border-border rounded-2xl p-12 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Ready to Improve Your LinkedIn Profile?
                </h2>

                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                  Get your free LinkedIn score and actionable feedback in minutes.
                </p>

                <Link href="/upload">
                  <Button className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold">
                    Get My LinkedIn Score
                  </Button>
                </Link>
              </div>
            </section>
          </AnimatedSection>
        </main>

        <Footer />
      </div>
    </div>
  )
}