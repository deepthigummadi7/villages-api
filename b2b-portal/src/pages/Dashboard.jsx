import Sidebar from "../components/Sidebar";
import useAuthStore from "../store/authStore";

const card = {
  background: "rgba(74,222,128,0.04)",
  border: "1px solid rgba(74,222,128,0.15)",
  borderRadius: "20px",
  padding: "24px",
};

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0d1117" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "32px" }}>
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
            Welcome, {user?.businessName || "Developer"} 👋
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Here's your API usage overview.
          </p>
        </div>

        {/* Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {[
            {
              icon: "⚡",
              label: "Today's Requests",
              value: "0",
              sub: "Resets at midnight",
            },
            {
              icon: "📅",
              label: "Monthly Total",
              value: "0",
              sub: "Current month",
            },
            {
              icon: "✅",
              label: "Success Rate",
              value: "100%",
              sub: "Last 30 days",
            },
          ].map((stat) => (
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
                  fontSize: "28px",
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

        {/* Two column */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {/* Quick Start */}
          <div style={card}>
            <h2
              style={{
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "16px",
              }}
            >
              🚀 Quick Start
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                {
                  step: "1",
                  text: "Generate an API key from the API Keys page",
                  done: false,
                },
                {
                  step: "2",
                  text: "Add X-API-Key header to your requests",
                  done: false,
                },
                {
                  step: "3",
                  text: "Call GET /api/v1/states to get started",
                  done: false,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "rgba(74,222,128,0.1)",
                      border: "1px solid rgba(74,222,128,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4ade80",
                      fontSize: "11px",
                      fontWeight: "700",
                      flexShrink: 0,
                    }}
                  >
                    {item.step}
                  </div>
                  <span
                    style={{
                      color: "#9ca3af",
                      fontSize: "13px",
                      lineHeight: "1.5",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Info */}
          <div style={card}>
            <h2
              style={{
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "16px",
              }}
            >
              📋 Your Plan
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {[
                { label: "Current Plan", value: user?.planType || "FREE" },
                { label: "Daily Limit", value: "5,000 requests" },
                { label: "Rate Reset", value: "Every midnight UTC" },
                { label: "API Version", value: "v1.0.0" },
                { label: "Status", value: user?.status || "ACTIVE" },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: i < arr.length - 1 ? "14px" : "0",
                    borderBottom:
                      i < arr.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                >
                  <span style={{ color: "#6b7280", fontSize: "13px" }}>
                    {item.label}
                  </span>
                  <span
                    style={{
                      color:
                        item.label === "Current Plan" || item.label === "Status"
                          ? "#4ade80"
                          : "#e5e7eb",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
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
