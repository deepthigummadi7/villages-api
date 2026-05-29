import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

const card = {
  background: "rgba(74,222,128,0.04)",
  border: "1px solid rgba(74,222,128,0.15)",
  borderRadius: "20px",
  overflow: "hidden",
};

const getStatusStyle = (code) => {
  if (code >= 200 && code < 300)
    return {
      bg: "rgba(74,222,128,0.1)",
      color: "#4ade80",
      border: "rgba(74,222,128,0.3)",
    };
  if (code >= 400 && code < 500)
    return {
      bg: "rgba(250,204,21,0.1)",
      color: "#facc15",
      border: "rgba(250,204,21,0.3)",
    };
  return {
    bg: "rgba(239,68,68,0.1)",
    color: "#f87171",
    border: "rgba(239,68,68,0.3)",
  };
};

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/logs");
      setLogs(res.data.data || []);
    } catch {
      setError("Failed to load logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0d1117" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "28px",
          }}
        >
          <div>
            <h1
              style={{
                color: "white",
                fontSize: "24px",
                fontWeight: "700",
                marginBottom: "4px",
              }}
            >
              API Logs
            </h1>
            <p style={{ color: "#6b7280", fontSize: "14px" }}>
              Monitor all incoming API requests in real time.
            </p>
          </div>
          <button
            onClick={fetchLogs}
            style={{
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.25)",
              borderRadius: "12px",
              padding: "8px 16px",
              color: "#4ade80",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            🔄 Refresh
          </button>
        </div>

        <div style={card}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr",
              padding: "12px 24px",
              background: "rgba(74,222,128,0.06)",
              borderBottom: "1px solid rgba(74,222,128,0.1)",
            }}
          >
            {["Endpoint", "Method", "Status", "Response Time", "Time"].map(
              (h) => (
                <span
                  key={h}
                  style={{
                    color: "#4ade80",
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  {h}
                </span>
              ),
            )}
          </div>

          {loading ? (
            <div
              style={{
                padding: "48px",
                textAlign: "center",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              Loading logs...
            </div>
          ) : error ? (
            <div
              style={{
                padding: "48px",
                textAlign: "center",
                color: "#f87171",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          ) : logs.length === 0 ? (
            <div
              style={{
                padding: "48px",
                textAlign: "center",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              No logs yet. Make some API requests first.
            </div>
          ) : (
            logs.map((log, i) => {
              const s = getStatusStyle(log.statusCode);
              return (
                <div
                  key={log.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr",
                    padding: "14px 24px",
                    alignItems: "center",
                    borderBottom:
                      i < logs.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                    background:
                      i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                  }}
                >
                  <span
                    style={{
                      color: "#4ade80",
                      fontSize: "12px",
                      fontFamily: "monospace",
                    }}
                  >
                    {log.endpoint || "—"}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "600",
                      background: "rgba(99,102,241,0.1)",
                      color: "#a5b4fc",
                      border: "1px solid rgba(99,102,241,0.3)",
                      width: "fit-content",
                    }}
                  >
                    {log.method || "GET"}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "600",
                      background: s.bg,
                      color: s.color,
                      border: `1px solid ${s.border}`,
                      width: "fit-content",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: s.color,
                        display: "inline-block",
                      }}
                    ></span>
                    {log.statusCode}
                  </span>
                  <span style={{ color: "#9ca3af", fontSize: "13px" }}>
                    {log.responseTime ? `${log.responseTime}ms` : "—"}
                  </span>
                  <span style={{ color: "#6b7280", fontSize: "12px" }}>
                    {log.createdAt
                      ? new Date(log.createdAt).toLocaleString()
                      : "—"}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
