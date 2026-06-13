import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function Support() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Support</h1>
          
          <div className="space-y-12">
            <div>
              <p className="text-lg text-muted-foreground mb-8">
                We're here to help! Find answers to common questions or get in touch with our support team.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-xl font-bold mb-4 text-foreground">Getting Started</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>How to upload your LinkedIn profile</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Understanding your score breakdown</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Interpreting recommendations</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Free vs Pro plan features</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-xl font-bold mb-4 text-foreground">Account & Billing</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Managing your account</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Payment and refund policies</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Upgrading to Pro</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Downloading your reports</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-xl font-bold mb-4 text-foreground">Privacy & Security</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>How we protect your data</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Privacy policy details</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Requesting data deletion</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Security best practices</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-xl font-bold mb-4 text-foreground">Troubleshooting</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Upload file format issues</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Analysis not starting</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Performance issues</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>Browser compatibility</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-xl font-bold mb-4 text-foreground">Still Need Help?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Contact our support team directly.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Contact Support
              </Link>
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
