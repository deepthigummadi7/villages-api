import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      {/* Logo */}
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
            fontSize: "26px",
            fontWeight: "800",
            marginBottom: "4px",
          }}
        >
          Village API
        </h1>
        <p style={{ color: "#6b7280", fontSize: "13px" }}>
          Developer Portal — Sign in to your account
        </p>
      </div>

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(74,222,128,0.15)",
          borderRadius: "24px",
          padding: "32px",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "4px",
          }}
        >
          Login
        </h2>
        <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "24px" }}>
          Access your developer account
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
          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "12px",
                fontWeight: "600",
                display: "block",
                marginBottom: "6px",
              }}
            >
              EMAIL ADDRESS
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#4ade80",
                }}
              >
                👤
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  borderRadius: "12px",
                  padding: "12px 14px 12px 42px",
                  color: "white",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "12px",
                fontWeight: "600",
                display: "block",
                marginBottom: "6px",
              }}
            >
              PASSWORD
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#4ade80",
                }}
              >
                🔒
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  borderRadius: "12px",
                  padding: "12px 14px 12px 42px",
                  color: "white",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #16a34a, #4ade80)",
              color: "#0d1117",
              border: "none",
              borderRadius: "12px",
              padding: "13px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 0 20px rgba(74,222,128,0.3)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span style={{ color: "#6b7280", fontSize: "13px" }}>New here? </span>
          <Link
            to="/register"
            style={{
              color: "#4ade80",
              fontSize: "13px",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Create an account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: "24px" }}>
        <span style={{ color: "#374151", fontSize: "12px" }}>
          🔐 Secured with JWT Authentication
        </span>
      </div>

      <style>{`input::placeholder { color: #4b5563; } input:focus { outline: none; border-color: rgba(74,222,128,0.5) !important; }`}</style>
    </div>
  );
}
