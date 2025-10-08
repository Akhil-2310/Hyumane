"use client"

import { useRouter } from "next/navigation"

interface Event {
  id: string
  title: string
  image: string
  website: string
  startDate: Date
  endDate: Date
}

// Sample event data - replace with your actual data source
const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Token 2049 Singapore",
    image: "/token.jpg", // Replace with actual event images
    website: "https://www.token2049.com/",
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-10-02"),
  },
  {
    id: "2",
    title: "Devconnect 2025",
    image: "/devconnect.png",
    website: "https://devconnect.org",
    startDate: new Date("2025-11-17"),
    endDate: new Date("2025-11-22"),
  },
  {
    id: "3",
    title: "ETHGlobal Buenos Aires",
    image: "/ethglobal ba.png",
    website: "https://ethglobal.com/events/buenosaires",
    startDate: new Date("2025-11-21"),
    endDate: new Date("2025-11-23"),
  },
]

export default function EventsPage() {
  const router = useRouter()
  const today = new Date()

  // Categorize events
  const upcomingEvents = sampleEvents.filter(event => event.startDate > today)
  const ongoingEvents = sampleEvents.filter(event => event.startDate <= today && event.endDate >= today)
  const pastEvents = sampleEvents.filter(event => event.endDate < today)

  const EventCard = ({ event }: { event: Event }) => (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="relative w-full h-64 bg-white flex items-center justify-center p-4">
        <img
          src={event.image}
          alt={event.title}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="p-6 bg-white/50">
        <h3 className="text-xl font-bold mb-3">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}
        </p>
        <a
          href={event.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: "#1c7f8f", color: "white" }}
        >
          Visit Website →
        </a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fff6c9", color: "#000000" }}>
      {/* Navbar */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push("/")}>
          <img src="/logo.png" alt="Hyumane Logo" className="h-16 w-16" />
          <span className="text-2xl font-bold">Hyumane</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/feed")}
            className="px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: "#1c7f8f", color: "white" }}
          >
            Back to Feed
          </button>
        </div>
      </nav>

      {/* Header Section */}
      <section className="px-6 py-12 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Community <span style={{ color: "#1c7f8f" }}>Events</span>
        </h1>
        <p className="text-lg text-gray-700">
          Join us at our events and connect with real humans building the future together.
        </p>
      </section>

      {/* Ongoing Events */}
      
        <section className="px-6 py-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#1c7f8f" }}>
            🔴 Happening Now
          </h2>
          {ongoingEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>  ) : (
          <div className="text-center py-12 bg-white/30 rounded-lg">
            <p className="text-gray-600 text-lg">No events happening at the moment. Check back soon!</p>
          </div>
        )}
        </section>

      {/* Upcoming Events */}
      <section className="px-6 py-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">🗓️ Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/30 rounded-lg">
            <p className="text-gray-600 text-lg">No upcoming events at the moment. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Past Events */}
      <section className="px-6 py-8 max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-700">📚 Past Events</h2>
        {pastEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/30 rounded-lg">
            <p className="text-gray-600 text-lg">No past events to display.</p>
          </div>
        )}
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
          <div className="mt-6 text-sm text-gray-500">© 2025 Hyumane. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

