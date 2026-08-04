import { useState, useEffect } from "react";
import LiveMap from "../components/LiveMap";
import { supabase } from "../supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { Battery, MapPin, Wifi, Cpu, Activity, Clock } from "lucide-react";
export default function Dashboard() {
  const [emergency, setEmergency] = useState(false);
  const [step, setStep] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [gps, setGps] = useState({ lat: 17.3850, lng: 78.4867 });
  const [battery, setBattery] = useState(92);
  useEffect(() => { //realtime push of data
    const channel = supabase
      .channel("emergency-updates")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "emergency_logs",
        },
        (payload) => {
          console.log("New emergency:", payload.new);

          setGps({
            lat: payload.new.latitude,
            lng: payload.new.longitude,
          });

          setBattery(payload.new.battery);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  

  // SOS Timeline
  useEffect(() => {
    if (!emergency) {
      setStep(0);
      setToasts([]);
      return;
    }
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setStep(current);
      const toastMessages = [
        "SOS Alert Triggered",
        "GPS Location Locked",
        "Capturing Evidence",
        "Alert Sent to Server",
        "Live Tracking Started",
        "Emergency Contacts Notified",
      ];
      if (current <= toastMessages.length) {
        setToasts((prev) => [...prev, toastMessages[current - 1]]);
      }
      if (current === 6) clearInterval(interval);
    }, 800);
    return () => clearInterval(interval);
  }, [emergency]);
  

  // Auto-dismiss toasts
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => setToasts((prev) => prev.slice(1)), 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header – fixed top */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">Real‑time monitoring overview</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={async () => {
                const newEmergency = !emergency;

                setStep(0);
                setToasts([]);
                setEmergency(newEmergency);

                if (newEmergency) {
                  const { error } = await supabase.from("emergency_logs").insert([
                    {
                      latitude: 17.385 + Math.random() * 0.01,
                      longitude: 78.4867 + Math.random() * 0.01,
                      battery: 92,
                      status: "Emergency",
                    },
                  ]);

                  if (error) {
                    console.error(error);
                  }
                } else {
                  setGps({ lat: 17.3850, lng: 78.4867 });
                  setBattery(92);
                }
              }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition flex items-center gap-2 shadow-sm"
          >
            <Activity className="w-4 h-4" />
            {emergency ? "Reset" : "Simulate SOS"}
          </button>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white ${emergency ? "bg-red-500" : "bg-green-500"}`}>
            
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            {emergency ? "EMERGENCY" : "SAFE"}
          </div>
        </div>
      </header>

      {/* Toasts */}
      <div className="fixed top-20 right-6 z-50 space-y-2 w-72">
        <AnimatePresence>
          {toasts.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="bg-white shadow-lg rounded-lg px-4 py-3 border-l-4 border-red-500 text-sm font-medium"
            >
              {msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-5 p-6">
        <MetricCard icon={<Battery className="w-5 h-5 text-blue-600" />} title="Battery" value={`${Math.round(battery)}%`} trend={emergency ? "draining" : "stable"} />
        <MetricCard icon={<MapPin className="w-5 h-5 text-green-600" />} title="GPS" value={emergency ? "Locked" : "Searching"} />
        <MetricCard icon={<Wifi className="w-5 h-5 text-indigo-600" />} title="Network" value="Connected" />
        <MetricCard icon={<Cpu className="w-5 h-5 text-purple-600" />} title="Device" value="Healthy" />
      </div>

      {/* Map + Timeline */}
      <div className="grid grid-cols-2 gap-6 px-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" /> Live Location
          </h2>
          <LiveMap center={gps} emergency={emergency} />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" /> Emergency Timeline
          </h2>
          <div className="space-y-2 relative pl-4 border-l-2 border-slate-200">
            {!emergency ? (
              <>
                <p className="text-slate-400 italic text-sm">Waiting for emergency…</p>
                <div className="text-xs text-slate-400">10:14:01  Device Connected</div>
                <div className="text-xs text-slate-400">10:14:03  GPS Searching</div>
                <div className="text-xs text-slate-400">10:14:05  Network Connected</div>
              </>
            ) : (
              <>
                {step >= 1 && <TimelineItem text="SOS Activated" time="10:14:21" />}
                {step >= 2 && <TimelineItem text="GPS Locked" time="10:14:23" />}
                {step >= 3 && <TimelineItem text="Capturing Evidence" time="10:14:25" />}
                {step >= 4 && <TimelineItem text="Alert Sent" time="10:14:27" />}
                {step >= 5 && <TimelineItem text="Live Tracking Started" time="10:14:29" />}
                {step >= 6 && <TimelineItem text="Contacts Notified" time="10:14:31" />}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-3 gap-6 p-6">
        <Panel title="Evidence" icon="📷" items={[
          step >= 3 ? "Photo_01.jpg    10:14:21" : null,
          step >= 4 ? "Photo_02.jpg    10:14:23" : null,
          step >= 5 ? "Audio.wav       10:14:25" : null,
          step >= 6 ? "Video.mp4       10:14:27" : null,
        ].filter(Boolean)} placeholder="Waiting for evidence…" />
        <Panel title="Emergency Contacts" icon="👤" items={[
          step >= 6 ? "Mother   ✓ Delivered (10:14:28)" : "Mother   Pending",
          step >= 6 ? "Father   ✓ Delivered (10:14:29)" : "Father   Pending",
          step >= 6 ? "Police   ✓ Delivered (10:14:31)" : "Police   Pending",
        ]} />
        <Panel title="Device Health" icon="⚙️" items={[
          `GPS : ${step >= 2 ? "Connected" : "Searching…"}`,
          `Camera : ${step >= 3 ? "Recording" : "Ready"}`,
          `Microphone : ${step >= 3 ? "Recording" : "Standby"}`,
          `Network : ${step >= 4 ? "Uploading" : "Connected"}`,
          `Battery : ${Math.round(battery)}%`,
        ]} />
      </div>
    </div>
  );
}

// ----- Reusable Components -----
function MetricCard({ icon, title, value, trend }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4 hover:shadow-md transition">
      <div className="p-3 bg-slate-50 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-xl font-bold text-slate-800">{value}</p>
        {trend && <p className={`text-xs ${trend === "draining" ? "text-red-500" : "text-green-500"}`}>{trend === "draining" ? "↓ draining" : "stable"}</p>}
      </div>
    </div>
  );
}

function TimelineItem({ text, time }) {
  return (
    <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex justify-between text-sm">
      <span className="font-medium text-slate-700">{text}</span>
      <span className="text-slate-400 text-xs">{time}</span>
    </motion.div>
  );
}

function Panel({ title, icon, items, placeholder }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      <div className="space-y-2 text-sm">
        {items.length > 0 ? (
          items.map((item, i) => <div key={i} className="py-1 border-b border-slate-50 text-slate-700">{item}</div>)
        ) : (
          <p className="text-slate-400 italic">{placeholder}</p>
        )}
      </div>
    </div>
  );
}