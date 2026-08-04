import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Map,
  Bell,
  Battery,
  ArrowRight,
  Menu,
  AlertTriangle,
  Camera,
  Send,
  Users,
  Activity,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation – fixed/sticky */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="text-2xl font-bold text-gray-900">GUARDIAN PENDANT</div>
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <a href="#" className="hover:text-blue-600 transition">Home</a>
          <a href="#features" className="hover:text-blue-600 transition">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600 transition">How It Works</a>
          <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
        </div>
        <Link
          to="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition shadow-sm hidden md:block"
        >
          Get Started
        </Link>
        <button className="md:hidden text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
          >
            GUARDIAN PENDANT
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto md:mx-0"
          >
            An intelligent wearable emergency response system for womens saftey.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center md:justify-start gap-4 mt-8"
          >
            <Link
              to="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition shadow-lg shadow-blue-200"
            >
              View Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="border border-gray-300 hover:border-blue-600 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              Learn More
            </a>
          </motion.div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-8xl">🛡️</span>
          </div>
        </div>
      </section>

      {/* How It Works – The Story */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900">The Guardian Story</h2>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
            What happens the moment you need help – a seamless chain of safety.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <StepCard
              step="01"
              icon={<AlertTriangle className="w-8 h-8 text-red-500" />}
              title="You Press SOS"
              description="A long‑press on the pendant triggers the emergency mode. No app opening, no delay – just instant action."
            />
            <StepCard
              step="02"
              icon={<Camera className="w-8 h-8 text-blue-500" />}
              title="Evidence is Captured"
              description="The device automatically takes a photo, records audio, and logs the GPS coordinates – building a secure evidence packet."
            />
            <StepCard
              step="03"
              icon={<Send className="w-8 h-8 text-green-500" />}
              title="Alert Sent & Shared"
              description="Within seconds, an alert is sent to your emergency contacts with your live location and the captured evidence."
            />
            <StepCard
              step="04"
              icon={<Users className="w-8 h-8 text-purple-500" />}
              title="Contacts Are Notified"
              description="Your family and friends receive a clear notification with a map link – they know exactly where you are and what's happening."
            />
            <StepCard
              step="05"
              icon={<Activity className="w-8 h-8 text-indigo-500" />}
              title="Live Tracking Begins"
              description="Your location is updated in real‑time on the dashboard, so help can follow your movement until you're safe."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900">Intelligent Features</h2>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
            Every feature is designed to keep you safe in critical moments.
          </p>
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-blue-600" />}
              title="Instant SOS"
              desc="Long-press activation sends alert in under 2 seconds."
            />
            <FeatureCard
              icon={<Map className="w-8 h-8 text-blue-600" />}
              title="Live Tracking"
              desc="Real-time GPS location shared with contacts."
            />
            <FeatureCard
              icon={<Bell className="w-8 h-8 text-blue-600" />}
              title="Smart Alerts"
              desc="Automatic photo & audio capture for evidence."
            />
            <FeatureCard
              icon={<Battery className="w-8 h-8 text-blue-600" />}
              title="Long Battery"
              desc="Optimized design ensures 3+ days of usage."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          &copy; 2026 Guardian Pendant. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// ---- Feature Card ----
function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500 text-sm mt-2">{desc}</p>
    </motion.div>
  );
}

// ---- Step Card (for The Guardian Story) ----
function StepCard({ step, icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition relative"
    >
      <div className="absolute top-4 right-4 text-4xl font-bold text-gray-100">{step}</div>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500 text-sm mt-2">{description}</p>
    </motion.div>
  );
}