import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

const card = {
  background: "rgba(74,222,128,0.04)",
  border: "1px solid rgba(74,222,128,0.15)",
  borderRadius: "20px",
  overflow: "hidden",
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/users");
      setUsers(res.data.data || []);
    } catch {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await api.patch(`/api/admin/users/${id}`, { action });
      fetchUsers();
    } catch {
      alert("Action failed.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0d1117" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "32px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "4px",
            }}
          >
            Users
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Manage all registered B2B users on the platform.
          </p>
        </div>

        <div style={card}>
          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr",
              padding: "12px 24px",
              background: "rgba(74,222,128,0.06)",
              borderBottom: "1px solid rgba(74,222,128,0.1)",
            }}
          >
            {["User", "Business", "Plan", "Status", "Actions"].map((h) => (
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
            ))}
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
              Loading users...
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
          ) : users.length === 0 ? (
            <div
              style={{
                padding: "48px",
                textAlign: "center",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              No users found.
            </div>
          ) : (
            users.map((user, i) => (
              <div
                key={user.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr",
                  padding: "14px 24px",
                  alignItems: "center",
                  borderBottom:
                    i < users.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                  background:
                    i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
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
                      flexShrink: 0,
                    }}
                  >
                    {user.email?.[0]?.toUpperCase()}
                  </div>
                  <span style={{ color: "white", fontSize: "13px" }}>
                    {user.email}
                  </span>
                </div>

                <span style={{ color: "#9ca3af", fontSize: "13px" }}>
                  {user.businessName || "—"}
                </span>

                <span
                  style={{
                    display: "inline-flex",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: "600",
                    background:
                      user.planType === "FREE"
                        ? "rgba(107,114,128,0.15)"
                        : "rgba(74,222,128,0.1)",
                    color: user.planType === "FREE" ? "#9ca3af" : "#4ade80",
                    border: `1px solid ${user.planType === "FREE" ? "rgba(107,114,128,0.3)" : "rgba(74,222,128,0.3)"}`,
                    width: "fit-content",
                  }}
                >
                  {user.planType || "FREE"}
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
                    background:
                      user.status === "ACTIVE"
                        ? "rgba(74,222,128,0.1)"
                        : "rgba(239,68,68,0.1)",
                    color: user.status === "ACTIVE" ? "#4ade80" : "#f87171",
                    border: `1px solid ${user.status === "ACTIVE" ? "rgba(74,222,128,0.3)" : "rgba(239,68,68,0.3)"}`,
                    width: "fit-content",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background:
                        user.status === "ACTIVE" ? "#4ade80" : "#f87171",
                      display: "inline-block",
                    }}
                  ></span>
                  {user.status || "ACTIVE"}
                </span>

                <button
                  onClick={() =>
                    handleAction(
                      user.id,
                      user.status === "ACTIVE" ? "suspend" : "activate",
                    )
                  }
                  style={{
                    padding: "5px 12px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    background:
                      user.status === "ACTIVE"
                        ? "rgba(239,68,68,0.1)"
                        : "rgba(74,222,128,0.1)",
                    color: user.status === "ACTIVE" ? "#f87171" : "#4ade80",
                    border: `1px solid ${user.status === "ACTIVE" ? "rgba(239,68,68,0.3)" : "rgba(74,222,128,0.3)"}`,
                  }}
                >
                  {user.status === "ACTIVE" ? "Suspend" : "Activate"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
