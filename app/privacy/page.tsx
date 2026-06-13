import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Privacy Policy</h1>
          
          <div className="space-y-8 text-foreground prose prose-invert max-w-none">
            <p className="text-muted-foreground">Last updated: June 2026</p>

            <div>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                ProfilePilot ("we" or "us" or "our") operates the ProfilePilot website and mobile application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Data Collection</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information that you voluntarily provide to us, including your LinkedIn profile information when you upload it for analysis. This data is used solely for providing the analysis service and is never shared with third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your data is processed securely using industry-standard encryption. We maintain strict security protocols to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to access, update, or delete your personal information at any time by contacting us. We will honor all requests in accordance with applicable laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at support@profilepilot.com
              </p>
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
