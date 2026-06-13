import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Have questions or feedback about ProfilePilot? We'd love to hear from you. Get in touch using any of the methods below.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <a href="mailto:support@profilepilot.com" className="text-accent hover:text-accent/80">
                    support@profilepilot.com
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
                  <p className="text-muted-foreground">We typically respond within 24 hours</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Support</h3>
                  <p className="text-muted-foreground">For technical support or feature requests, please visit our <Link href="/support" className="text-accent hover:text-accent/80">Support page</Link></p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-lg font-semibold text-foreground mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    placeholder="Your message"
                    rows={5}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8">
            <Link href="/" className="text-accent hover:text-accent/80 font-semibold">
              ← Back to Home
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
