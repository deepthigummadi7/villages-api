import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import useAuthStore from "../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/api/auth/login", { email, password });
      if (res.data.success) {
        login(res.data.token, res.data.data);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d1117",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Logo + Brand */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div
          style={{
            width: "72px",
            height: "72px",
            margin: "0 auto 16px",
            background: "linear-gradient(135deg, #0d2b0d, #1a4d1a)",
            border: "2px solid #4ade80",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            boxShadow: "0 0 30px rgba(74,222,128,0.3)",
          }}
        >
          🏘️
        </div>
        <h1
          style={{
            color: "#4ade80",
            fontSize: "28px",
            fontWeight: "800",
            letterSpacing: "0.5px",
            marginBottom: "4px",
          }}
        >
          Village API
        </h1>
        <p style={{ color: "#6b7280", fontSize: "13px" }}>
          APIs for villages. Data for everyone.
        </p>
      </div>

      {/* Feature badges */}
      <div style={{ display: "flex", gap: "24px", marginBottom: "32px" }}>
        {[
          { icon: "🛡️", label: "Secure" },
          { icon: "</>", label: "Scalable" },
          { icon: "☁️", label: "Reliable" },
        ].map((f) => (
          <div key={f.label} style={{ textAlign: "center" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                margin: "0 auto 6px",
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.25)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              {f.icon}
            </div>
            <p style={{ color: "#6b7280", fontSize: "11px" }}>{f.label}</p>
          </div>
        ))}
      </div>

      {/* Login Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(74,222,128,0.15)",
          borderRadius: "24px",
          padding: "32px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "22px",
            fontWeight: "700",
            marginBottom: "4px",
          }}
        >
          Login
        </h2>
        <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "24px" }}>
          Access your admin account
        </p>

        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#f87171",
              padding: "10px 16px",
              borderRadius: "12px",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: "14px" }}>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#4ade80",
                  fontSize: "16px",
                }}
              >
                👤
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  borderRadius: "12px",
                  padding: "12px 14px 12px 42px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#4ade80",
                  fontSize: "16px",
                }}
              >
                🔒
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  borderRadius: "12px",
                  padding: "12px 14px 12px 42px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading
                ? "#166534"
                : "linear-gradient(135deg, #16a34a, #4ade80)",
              color: loading ? "#4ade80" : "#0d1117",
              border: "none",
              borderRadius: "12px",
              padding: "13px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 0 20px rgba(74,222,128,0.3)",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {loading ? (
              <>
                <svg
                  style={{
                    width: "16px",
                    height: "16px",
                    animation: "spin 1s linear infinite",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeOpacity="0.3"
                  />
                  <path
                    d="M4 12a8 8 0 018-8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
                Authenticating...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <span style={{ color: "#4b5563", fontSize: "12px" }}>
            secured with
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.08)",
            }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <span
            style={{ color: "#4ade80", fontSize: "13px", fontWeight: "600" }}
          >
            🔐 JWT Authentication
          </span>
        </div>
      </div>

      {/* Bottom stats */}
      <div style={{ display: "flex", gap: "32px", marginTop: "32px" }}>
        {[
          { value: "4,57,054", label: "Villages" },
          { value: "28", label: "States" },
          { value: "5,046", label: "Sub-Districts" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div
              style={{ color: "#4ade80", fontSize: "16px", fontWeight: "700" }}
            >
              {s.value}
            </div>
            <div style={{ color: "#4b5563", fontSize: "11px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: #4b5563; }
        input:focus { border-color: rgba(74,222,128,0.5) !important; box-shadow: 0 0 0 3px rgba(74,222,128,0.1); }
      `}</style>
    </div>
  );
}
