import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fff6c9", color: "#000000" }}>
      {/* Navbar */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="text-2xl font-bold">Hyumane</div>
        <Link
          href="/verify"
          className="px-6 py-2 rounded-lg font-medium transition-colors"
          style={{ backgroundColor: "#1c7f8f", color: "white" }}
        >
          Launch App
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          A Digital Space for <span style={{ color: "#1c7f8f" }}>Real People</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-700">
          By humans, for humans. Connect authentically in a verified community where every person is real.
        </p>
        <Link
          href="/verify"
          className="inline-block px-8 py-4 text-lg font-medium rounded-lg transition-colors"
          style={{ backgroundColor: "#1c7f8f", color: "white" }}
        >
          Join the Community
        </Link>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Our Philosophy</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg border border-gray-200 bg-white/50">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#1c7f8f" }}
            >
              <span className="text-2xl text-white">🔐</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Authentic Verification</h3>
            <p className="text-gray-700">
              Every member is verified as a real human being. No bots, no fake accounts, just genuine connections
              between real people.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border border-gray-200 bg-white/50">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#1c7f8f" }}
            >
              <span className="text-2xl text-white">🤝</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Human-Centered Design</h3>
            <p className="text-gray-700">
              Built by humans who understand human needs. Our platform prioritizes meaningful interactions over
              engagement metrics.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border border-gray-200 bg-white/50">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#1c7f8f" }}
            >
              <span className="text-2xl text-white">🌱</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Privacy First</h3>
            <p className="text-gray-700">
              Your data belongs to you. We believe in transparency, consent, and giving you full control over your
              digital presence.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="px-6 py-16 bg-white/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What Makes Us Different</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: "#1c7f8f" }}
              >
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Passport Verification</h3>
                <p className="text-gray-700">
                  Advanced QR code verification ensures every user is a verified human being with legitimate identity.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: "#1c7f8f" }}
              >
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Quality Over Quantity</h3>
                <p className="text-gray-700">
                  Focus on meaningful connections rather than follower counts. Build genuine relationships with real
                  people.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: "#1c7f8f" }}
              >
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Ad-Free Experience</h3>
                <p className="text-gray-700">
                  No algorithms pushing content for profit. Your feed shows what matters to you and your connections.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: "#1c7f8f" }}
              >
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Direct Communication</h3>
                <p className="text-gray-700">
                  Built-in chat features allow for private, secure conversations between verified community members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">Hyumane</div>
          <p className="text-gray-600 mb-6">Building authentic digital communities, one verified human at a time.</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
            <a href="#" className="hover:underline">
              Help Center
            </a>
          </div>
          <div className="mt-6 text-sm text-gray-500">© 2024 Hyumane. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
