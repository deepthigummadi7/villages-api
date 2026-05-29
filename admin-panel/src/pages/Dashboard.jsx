import Sidebar from "../components/Sidebar";

const stats = [
  {
    label: "Total Villages",
    value: "4,57,054",
    icon: "🏘️",
    sub: "Across 28 states",
  },
  {
    label: "Total Districts",
    value: "466",
    icon: "🗺️",
    sub: "Across all states",
  },
  {
    label: "Sub-Districts",
    value: "5,046",
    icon: "📍",
    sub: "Mapped & verified",
  },
  { label: "Total States", value: "28", icon: "🇮🇳", sub: "Loaded cleanly" },
];

const endpoints = [
  "GET /api/v1/states",
  "GET /api/v1/districts",
  "GET /api/v1/subdistricts",
  "GET /api/v1/villages",
  "GET /api/v1/search",
];

const platformInfo = [
  { label: "Database", value: "NeonDB PostgreSQL" },
  { label: "Cache", value: "Upstash Redis" },
  { label: "Auth", value: "JWT · bcrypt" },
  { label: "Rate Limiting", value: "Free: 5K · Pro: 300K/day" },
  { label: "API Version", value: "v1.0.0" },
  { label: "Deployment", value: "Vercel (Pending)" },
];

const card = {
  background: "rgba(74,222,128,0.04)",
  border: "1px solid rgba(74,222,128,0.15)",
  borderRadius: "20px",
  padding: "24px",
};

export default function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0d1117" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "4px",
            }}
          >
            Dashboard
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Welcome back, Admin. Here's your platform overview.
          </p>
        </div>

        {/* Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{ ...card, position: "relative", overflow: "hidden" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(74,222,128,0.15), transparent)",
                  filter: "blur(20px)",
                }}
              />
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>
                {stat.icon}
              </div>
              <div
                style={{
                  color: "#4ade80",
                  fontSize: "26px",
                  fontWeight: "800",
                  marginBottom: "4px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "2px",
                }}
              >
                {stat.label}
              </div>
              <div style={{ color: "#374151", fontSize: "12px" }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Two Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {/* API Endpoints */}
          <div style={card}>
            <h2
              style={{
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "16px",
              }}
            >
              <span style={{ color: "#4ade80" }}>
                {"<"}/{">"}
              </span>{" "}
              API Endpoints
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {endpoints.map((ep) => (
                <div
                  key={ep}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "10px",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span
                    style={{
                      color: "#4ade80",
                      fontSize: "13px",
                      fontFamily: "monospace",
                    }}
                  >
                    {ep}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      background: "rgba(74,222,128,0.1)",
                      border: "1px solid rgba(74,222,128,0.25)",
                      borderRadius: "20px",
                      padding: "2px 10px",
                      color: "#4ade80",
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#4ade80",
                        display: "inline-block",
                      }}
                    ></span>
                    Live
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Summary */}
          <div style={card}>
            <h2
              style={{
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "16px",
              }}
            >
              ☁️ Platform Summary
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {platformInfo.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: i < platformInfo.length - 1 ? "14px" : "0",
                    borderBottom:
                      i < platformInfo.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                >
                  <span style={{ color: "#6b7280", fontSize: "13px" }}>
                    {item.label}
                  </span>
                  <span
                    style={{
                      color: "#e5e7eb",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    <span
                      style={{
                        color:
                          item.label === "Deployment" ? "#facc15" : "#4ade80",
                        marginRight: "4px",
                      }}
                    >
                      {item.label === "Deployment" ? "🟡" : "🟢"}
                    </span>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
