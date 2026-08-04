export default function SystemLogs({ emergency }) {
  const safeLogs = [
    "10:14:01  Device Connected",
    "10:14:03  GPS Searching",
    "10:14:05  Network Connected",
  ];

  const emergencyLogs = [
    "10:14:10  SOS Activated",
    "10:14:11  GPS Locked",
    "10:14:12  Capturing Evidence",
    "10:14:13  Alert Sent",
    "10:14:14  Location Shared",
    "10:14:15  Live Tracking Started",
  ];

  const logs = emergency ? emergencyLogs : safeLogs;

  return (
    <div className="bg-white rounded-2xl shadow p-6 h-full">
      <h2 className="text-xl font-bold mb-5">📜 Live System Logs</h2>

      <div className="space-y-3 text-sm font-mono">
        {logs.map((log, index) => (
          <div
            key={index}
            className="border-l-4 border-blue-600 pl-3 py-1"
          >
            {log}
          </div>
        ))}
      </div>
    </div>
 
);
}