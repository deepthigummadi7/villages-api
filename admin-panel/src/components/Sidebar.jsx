import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const links = [
  { path: "/", icon: "📊", label: "Dashboard" },
  { path: "/users", icon: "👥", label: "Users" },
  { path: "/logs", icon: "📋", label: "Logs" },
];

export default function Sidebar() {
  const { logout, admin } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "#0d1117",
        borderRight: "1px solid rgba(74,222,128,0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 16px",
      }}
    >
      {/* Top */}
      <div>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              background: "linear-gradient(135deg, #0d2b0d, #1a4d1a)",
              border: "1.5px solid #4ade80",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              boxShadow: "0 0 12px rgba(74,222,128,0.2)",
            }}
          >
            🏘️
          </div>
          <div>
            <div
              style={{ color: "#4ade80", fontWeight: "700", fontSize: "14px" }}
            >
              Village API
            </div>
            <div style={{ color: "#374151", fontSize: "11px" }}>
              Admin Panel
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.2)",
            borderRadius: "20px",
            padding: "4px 10px",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4ade80",
              display: "inline-block",
            }}
          ></span>
          <span
            style={{ color: "#4ade80", fontSize: "11px", fontWeight: "500" }}
          >
            Platform Operational
          </span>
        </div>

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "500",
                textDecoration: "none",
                transition: "all 0.2s",
                background: isActive ? "rgba(74,222,128,0.1)" : "transparent",
                color: isActive ? "#4ade80" : "#6b7280",
                border: isActive
                  ? "1px solid rgba(74,222,128,0.25)"
                  : "1px solid transparent",
                boxShadow: isActive ? "0 0 12px rgba(74,222,128,0.1)" : "none",
              })}
            >
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div>
        {/* Admin card */}
        <div
          style={{
            background: "rgba(74,222,128,0.05)",
            border: "1px solid rgba(74,222,128,0.15)",
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #16a34a, #4ade80)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0d1117",
                fontWeight: "700",
                fontSize: "13px",
              }}
            >
              {admin?.email?.[0]?.toUpperCase() || "A"}
            </div>
            <div>
              <div
                style={{
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "600",
                  maxWidth: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {admin?.email || "admin@villageapi.com"}
              </div>
              <div style={{ color: "#374151", fontSize: "11px" }}>
                Administrator
              </div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            background: "transparent",
            border: "1px solid transparent",
            borderRadius: "12px",
            padding: "10px 14px",
            color: "#6b7280",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#f87171";
            e.currentTarget.style.background = "rgba(239,68,68,0.08)";
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6b7280";
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          🚪 Logout
        </button>

        <div
          style={{
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span style={{ color: "#374151", fontSize: "11px" }}>
            🔐 Secured with JWT
          </span>
        </div>
      </div>
    </div>
  );
}
