import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    businessName: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/api/auth/register", form);
      if (res.data.success) {
        setSuccess("Account created! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Try again.");
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
          Developer Portal — Create your account
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
          Create Account
        </h2>
        <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "24px" }}>
          Start integrating Village API today
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

        {success && (
          <div
            style={{
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.3)",
              color: "#4ade80",
              padding: "10px 16px",
              borderRadius: "12px",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleRegister}>
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
              BUSINESS NAME
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
                🏢
              </span>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Your Company Ltd."
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
                name="email"
                value={form.email}
                onChange={handleChange}
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
                name="password"
                value={form.password}
                onChange={handleChange}
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
            {loading ? "Creating Account..." : "Create Account →"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span style={{ color: "#6b7280", fontSize: "13px" }}>
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            style={{
              color: "#4ade80",
              fontSize: "13px",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Sign in
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <span style={{ color: "#374151", fontSize: "12px" }}>
          🔐 Secured with JWT Authentication
        </span>
      </div>

      <style>{`input::placeholder { color: #4b5563; } input:focus { outline: none; border-color: rgba(74,222,128,0.5) !important; }`}</style>
    </div>
  );
}
