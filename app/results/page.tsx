'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ScoreBreakdown, UpgradeCard } from '@/components/score-breakdown'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Copy, Download } from 'lucide-react'
import { toast } from "sonner"
import jsPDF from "jspdf"
import { PremiumLock } from "@/components/premium-lock"

interface AnalysisResult {
  overall_score: number
  headline_score: number
  about_score: number
  experience_score: number
  skills_score: number
  keywords_score: number
  recruiter_score: number
  branding_score: number
  completeness_score: number
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  keywords_found: string[]
  missing_keywords: string[]

  headline_feedback: string[]
  about_feedback: string[]
  experience_feedback: string[]
  skills_feedback: string[]

  optimized_headline: string
  headline_alternatives: string[]
  about_section_suggestions: string[]
  ats_keywords: string[]
  priority_improvements: string[]
}

export default function ResultsPage() {
  const router = useRouter()
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null)
  const [isPremium, setIsPremium] = useState(false)
  useEffect(() => {

    const verified =
      sessionStorage.getItem("paymentVerified")

    if (verified === "true") {
      setIsPremium(true)
    }

  }, [])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Retrieve analysis results from sessionStorage
    const storedData = sessionStorage.getItem('analysisResults')
    
    if (!storedData) {
      // If no data, redirect to upload page
      router.push('/upload')
      
      return
    }
    
    try {
      const data = JSON.parse(storedData) as AnalysisResult
      setAnalysisData(data)
    } catch (error) {
      console.error('Failed to parse analysis data:', error)
      router.push('/upload')
    } finally {
      setIsLoading(false)
    }
  }, [router])

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)

    toast.success("Copied to clipboard!", {
      description: "You can now paste it anywhere."
    })
  } catch (err) {
    console.error("Failed to copy:", err)

    toast.error("Copy failed", {
      description: "Please try again."
    })
  }
}

const downloadPDF = () => {
  if (!analysisData) return

  const doc = new jsPDF()

  let y = 20

  doc.setFontSize(20)
  doc.text("ProfilePilot Report", 20, y)

  y += 15

  doc.setFontSize(14)
  doc.text(`Overall Score: ${analysisData.overall_score}/100`, 20, y)

  y += 20

  doc.setFontSize(16)
  doc.text("Strengths", 20, y)

  y += 10

  analysisData.strengths.forEach((item) => {
    doc.setFontSize(12)
    doc.text(`• ${item}`, 20, y)
    y += 8
  })

  y += 10

  doc.setFontSize(16)
  doc.text("Weaknesses", 20, y)

  y += 10

  analysisData.weaknesses.forEach((item) => {
    doc.setFontSize(12)
    doc.text(`• ${item}`, 20, y)
    y += 8
  })

  y += 10

  doc.setFontSize(16)
  doc.text("Recommendations", 20, y)

  y += 10

  analysisData.recommendations.forEach((item) => {
    doc.setFontSize(12)
    doc.text(`• ${item}`, 20, y)
    y += 8
  })

  doc.save("ProfilePilot_Report.pdf")
}

  

  // Loading state
  if (isLoading || !analysisData) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-muted rounded w-64 mx-auto mb-4" />
              <div className="h-6 bg-muted rounded w-48 mx-auto" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Function to get score color
  const getScoreColor = (score: number): string => {
    if (score >= 76) return 'from-emerald-500 to-emerald-400'
    if (score >= 51) return 'from-yellow-500 to-yellow-400'
    if (score >= 26) return 'from-orange-500 to-orange-400'
    return 'from-red-500 to-red-400'
  }

  // Function to get score label
  const getScoreLabel = (score: number): string => {
    if (score >= 76) return 'Excellent'
    if (score >= 51) return 'Good'
    if (score >= 26) return 'Fair'
    return 'Needs Work'
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Your LinkedIn Profile Analysis
            </h1>
            <p className="text-muted-foreground text-lg">
              Here's your detailed breakdown and recommendations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overall Score Card */}
              <div className="border border-border rounded-2xl p-10 bg-card">
                <div className="text-center mb-8">
                  <p className="text-muted-foreground text-sm uppercase tracking-wide mb-3">Overall Score</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-6xl font-bold text-accent">{analysisData.overall_score}</div>
                    <div className="flex flex-col">
                      <div className="text-2xl font-bold text-foreground">/</div>
                      <div className="text-xl font-semibold text-muted-foreground">100</div>
                    </div>
                  </div>
                  <p className="text-foreground mt-6 text-lg">{getScoreLabel(analysisData.overall_score)} - {analysisData.overall_score >= 76 ? 'Your profile is impressive!' : 'Let\'s optimize it to stand out to recruiters.'}</p>
                </div>

                {/* Score Gauge */}
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-8">
                  <div 
                    className={`h-full bg-gradient-to-r ${getScoreColor(analysisData.overall_score)}`}
                    style={{ width: `${analysisData.overall_score}%` }}
                  />
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm text-center text-muted-foreground">
                  <div>0-25<br/>Needs Work</div>
                  <div>26-50<br/>Fair</div>
                  <div>51-75<br/>Good</div>
                  <div>76-100<br/>Excellent</div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="border border-border rounded-2xl p-10 bg-card">
                <h2 className="text-2xl font-bold text-foreground mb-8">Score Breakdown</h2>
                <div className="space-y-6">
                  {[
                    { label: 'Headline', score: analysisData.headline_score },
                    { label: 'About Section', score: analysisData.about_score },
                    { label: 'Experience', score: analysisData.experience_score },
                    { label: 'Skills', score: analysisData.skills_score },
                    { label: 'Keywords', score: analysisData.keywords_score },
                    { label: 'Recruiter Friendliness', score: analysisData.recruiter_score },
                    { label: 'Personal Branding', score: analysisData.branding_score },
                    { label: 'Profile Completeness', score: analysisData.completeness_score },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">{item.label}</span>
                        <span className="text-sm font-bold text-accent">{item.score}/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${getScoreColor(item.score)}`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              <div className="border border-border rounded-2xl p-10 bg-card">
                <h2 className="text-2xl font-bold text-foreground mb-6">Your Strengths</h2>
                <div className="space-y-3">
                  {analysisData.strengths?.map((strength, index) => (
                    <div key={index} className="p-4 border border-emerald-500/20 rounded-lg bg-emerald-500/5">
                      <p className="text-foreground text-sm">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Keywords Found */}
                <div className="border border-border rounded-2xl p-10 bg-card mt-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Keywords Found
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {analysisData.keywords_found?.map((keyword, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-foreground"
                    >
                      {keyword}
                    </div>
                  ))}
                </div>
              </div>
              {/* Missing Keywords */}
                <div className="border border-border rounded-2xl p-10 bg-card mt-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Missing Keywords
                  </h2>

                <div className="flex flex-wrap gap-3">
                  {analysisData.missing_keywords?.map((keyword, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-sm text-foreground"
                    >
                      {keyword}
                    </div>
                  ))}
                </div>
              </div>

              {/* Weaknesses */}
              <div className="border border-border rounded-2xl p-10 bg-card">
                <h2 className="text-2xl font-bold text-foreground mb-6">Areas to Improve</h2>
                <div className="space-y-3">
                  {(analysisData?.weaknesses || []).map((weakness, index) => (
                    <div
                      key={index}
                      className="p-4 border border-orange-500/20 rounded-lg bg-orange-500/5"
                    >
                      <p className="text-foreground text-sm">{weakness}</p>
                    </div>
                  ))}
                </div>
              </div>
              {analysisData.optimized_headline && (
                <div className="relative border border-border rounded-2xl p-10 bg-card mt-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Optimized Headline
                  </h2>

                  <div
                    className={`p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 ${
                      !isPremium ? "blur-sm select-none" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p>{analysisData.optimized_headline}</p>

                      <button
                        onClick={() => copyToClipboard(analysisData.optimized_headline)}
                        className="p-2 rounded-lg border border-border hover:bg-muted"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {!isPremium && <PremiumLock />}
                </div>
              )}      
              {/* Headline Alternatives */}
              {analysisData.headline_alternatives?.length > 0 && (
                <div className="relative border border-border rounded-2xl p-10 bg-card mt-8">

                  <div className={!isPremium ? "blur-sm select-none" : ""}>

                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Alternative Headlines
                    </h2>

                    <div className="space-y-4">
                      {analysisData.headline_alternatives.map((item, index) => (
                        <div
                          key={index}
                          className="p-5 rounded-xl border border-indigo-500/20 bg-indigo-500/5"
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                  </div>

                  {!isPremium && <PremiumLock />}

                </div>
              )}
              {/* ATS Keywords */}
              {analysisData.ats_keywords?.length > 0 && (
                <div className="relative border border-border rounded-2xl p-10 bg-card mt-8">

                  <div className={!isPremium ? "blur-sm select-none" : ""}>

                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      ATS Keywords
                    </h2>

                    <div className="flex flex-wrap gap-3">
                      {analysisData.ats_keywords.map((keyword, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-foreground"
                        >
                          {keyword}
                        </div>
                      ))}
                    </div>

                  </div>

                  {!isPremium && <PremiumLock />}

                </div>
              )}
              {/* Priority Improvements */}
              {analysisData.priority_improvements?.length > 0 && (
                <div className="relative border border-border rounded-2xl p-10 bg-card mt-8">

                  <div className={!isPremium ? "blur-sm select-none" : ""}>

                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Priority Improvements
                    </h2>

                    <div className="space-y-4">
                      {analysisData.priority_improvements.map((item, index) => (
                        <div
                          key={index}
                          className="p-5 rounded-xl border border-red-500/20 bg-red-500/5"
                        >
                          <p className="text-foreground">
                            {index + 1}. {item}
                          </p>
                        </div>
                      ))}
                    </div>

                  </div>

                  {!isPremium && <PremiumLock />}

                </div>
              )}              
              {/* Headline Feedback */}
              {analysisData.headline_feedback?.length > 0 && (
                <div className="relative border border-border rounded-2xl p-10 bg-card mt-8">

                  <div className={!isPremium ? "blur-sm select-none" : ""}>

                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Headline Feedback
                    </h2>

                    <div className="space-y-4">
                      {analysisData.headline_feedback.map((item, index) => (
                        <div
                          key={index}
                          className="p-5 rounded-xl border border-blue-500/20 bg-blue-500/5"
                        >
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>

                  </div>

                  {!isPremium && <PremiumLock />}

                </div>
              )}        
              {/* About Feedback */}
              {analysisData.about_feedback?.length > 0 && (
                <div className="relative border border-border rounded-2xl p-10 bg-card mt-8">

                  <div className={!isPremium ? "blur-sm select-none" : ""}>

                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      About Feedback
                    </h2>

                    <div className="space-y-4">
                      {analysisData.about_feedback.map((item, index) => (
                        <div
                          key={index}
                          className="p-5 rounded-xl border border-pink-500/20 bg-pink-500/5"
                        >
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>

                  </div>

                  {!isPremium && <PremiumLock />}

                </div>
              )}       
              {/* Experience Feedback */}
              {analysisData.experience_feedback?.length > 0 && (
                <div className="relative border border-border rounded-2xl p-10 bg-card mt-8">

                  <div className={!isPremium ? "blur-sm select-none" : ""}>

                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Experience Feedback
                    </h2>

                    <div className="space-y-4">
                      {analysisData.experience_feedback.map((item, index) => (
                        <div
                          key={index}
                          className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5"
                        >
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>

                  </div>

                  {!isPremium && <PremiumLock />}

                </div>
              )}     
              {/* Skills Feedback */}
              {analysisData.skills_feedback?.length > 0 && (
                <div className="relative border border-border rounded-2xl p-10 bg-card mt-8">

                  <div className={!isPremium ? "blur-sm select-none" : ""}>

                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Skills Feedback
                    </h2>

                    <div className="space-y-4">
                      {analysisData.skills_feedback.map((item, index) => (
                        <div
                          key={index}
                          className="p-5 rounded-xl border border-yellow-500/20 bg-yellow-500/5"
                        >
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>

                  </div>

                  {!isPremium && <PremiumLock />}

                </div>
              )}                    
              {/* About Section Suggestions */}
              {analysisData.about_section_suggestions?.length > 0 && (
                <div className="relative border border-border rounded-2xl p-10 bg-card mt-8">

                  <div className={!isPremium ? "blur-sm select-none" : ""}>

                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      About Section Suggestions
                    </h2>

                    <div className="space-y-4">
                      {analysisData.about_section_suggestions.map((item, index) => (
                        <div
                          key={index}
                          className="p-5 rounded-xl border border-purple-500/20 bg-purple-500/5"
                        >
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>

                  </div>

                  {!isPremium && <PremiumLock />}

                </div>
              )}                
              {/* Recommendations */}
              {analysisData.recommendations?.length > 0 && (
                <div className="relative border border-border rounded-2xl p-10 bg-card mt-8">

                  <div className={!isPremium ? "blur-sm select-none" : ""}>

                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Key Recommendations
                    </h2>

                    <div className="space-y-4">
                      {analysisData.recommendations.map((recommendation, index) => (
                        <div
                          key={index}
                          className="p-4 border border-border/50 rounded-lg bg-card/50"
                        >
                          <p className="text-foreground text-sm">
                            {recommendation}
                          </p>
                        </div>
                      ))}
                    </div>

                  </div>

                  {!isPremium && <PremiumLock />}

                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="h-12 px-8 border-border text-foreground hover:bg-card"
                  >
                    Back to Home
                  </Button>
                </Link>

                <Link href="/upload">
                  <Button
                    className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Analyze Another Profile
                  </Button>
                </Link>

                <Button
                  onClick={downloadPDF}
                  className="h-12 px-8"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Report
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <UpgradeCard />

                {/* Share Card */}
                <div className="mt-8 border border-border rounded-2xl p-6 bg-card text-center">
                  <h3 className="font-semibold text-foreground mb-3">Share Your Score</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Let others know about your profile optimization score
                  </p>
                  <button className="w-full bg-secondary text-secondary-foreground font-semibold py-2 rounded-lg hover:bg-secondary/90 transition-colors text-sm">
                    Share on LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
