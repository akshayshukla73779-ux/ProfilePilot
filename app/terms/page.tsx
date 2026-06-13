import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Terms and Conditions</h1>
          
          <div className="space-y-8 text-foreground prose prose-invert max-w-none">
            <p className="text-muted-foreground">Last updated: June 2026</p>

            <div>
              <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using ProfilePilot, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Use License</h2>
              <p className="text-muted-foreground leading-relaxed">
                Permission is granted to temporarily download one copy of the materials (information or software) on ProfilePilot for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="space-y-2 text-muted-foreground mt-4 ml-4">
                <li className="flex gap-3"><span className="text-accent">•</span> Modifying or copying the materials</li>
                <li className="flex gap-3"><span className="text-accent">•</span> Using the materials for any commercial purpose or for any public display</li>
                <li className="flex gap-3"><span className="text-accent">•</span> Attempting to decompile or reverse engineer any software contained on ProfilePilot</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials on ProfilePilot are provided on an "as is" basis. ProfilePilot makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall ProfilePilot or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ProfilePilot, even if ProfilePilot or a ProfilePilot authorized representative has been notified orally or in writing of the possibility of such damage.
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
