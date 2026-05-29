import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

const card = {
  background: "rgba(74,222,128,0.04)",
  border: "1px solid rgba(74,222,128,0.15)",
  borderRadius: "20px",
  padding: "24px",
};

export default function ApiKeys() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [newKey, setNewKey] = useState(null);
  const [keyName, setKeyName] = useState("");
  const [copied, setCopied] = useState("");

  const fetchKeys = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/b2b/keys");
      setKeys(res.data.data || []);
    } catch {
      setKeys([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleGenerate = async () => {
    if (!keyName.trim()) return alert("Enter a key name first.");
    setGenerating(true);
    try {
      const res = await api.post("/api/b2b/keys", { name: keyName });
      setNewKey(res.data.data);
      setKeyName("");
      fetchKeys();
    } catch {
      alert("Failed to generate key.");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
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
            API Keys
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Generate and manage your API keys.
          </p>
        </div>

        {/* Generate Key Card */}
        <div style={{ ...card, marginBottom: "20px" }}>
          <h2
            style={{
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            🔑 Generate New API Key
          </h2>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="Key name (e.g. Production Server)"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: "12px",
                padding: "11px 16px",
                color: "white",
                fontSize: "14px",
              }}
            />
            <button
              onClick={handleGenerate}
              disabled={generating}
              style={{
                background: "linear-gradient(135deg, #16a34a, #4ade80)",
                color: "#0d1117",
                border: "none",
                borderRadius: "12px",
                padding: "11px 24px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: generating ? "not-allowed" : "pointer",
                opacity: generating ? 0.7 : 1,
                whiteSpace: "nowrap",
              }}
            >
              {generating ? "Generating..." : "+ Generate Key"}
            </button>
          </div>
        </div>

        {/* New Key Display — shown only once */}
        {newKey && (
          <div
            style={{
              background: "rgba(74,222,128,0.08)",
              border: "1px solid rgba(74,222,128,0.4)",
              borderRadius: "20px",
              padding: "24px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <span style={{ fontSize: "18px" }}>⚠️</span>
              <h3
                style={{
                  color: "#4ade80",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              >
                Save your secret now — it won't be shown again!
              </h3>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {[
                { label: "API Key", value: newKey.key, id: "key" },
                { label: "API Secret", value: newKey.secret, id: "secret" },
              ].map((item) => (
                <div key={item.id}>
                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "11px",
                      fontWeight: "600",
                      marginBottom: "4px",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        background: "rgba(0,0,0,0.3)",
                        border: "1px solid rgba(74,222,128,0.2)",
                        borderRadius: "10px",
                        padding: "10px 14px",
                        color: "#4ade80",
                        fontSize: "12px",
                        fontFamily: "monospace",
                        wordBreak: "break-all",
                      }}
                    >
                      {item.value}
                    </div>
                    <button
                      onClick={() => handleCopy(item.value, item.id)}
                      style={{
                        background:
                          copied === item.id
                            ? "rgba(74,222,128,0.2)"
                            : "rgba(74,222,128,0.1)",
                        border: "1px solid rgba(74,222,128,0.3)",
                        borderRadius: "10px",
                        padding: "10px 14px",
                        color: "#4ade80",
                        fontSize: "12px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {copied === item.id ? "✅ Copied!" : "📋 Copy"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setNewKey(null)}
              style={{
                marginTop: "16px",
                background: "transparent",
                border: "none",
                color: "#6b7280",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              ✕ Dismiss
            </button>
          </div>
        )}

        {/* Keys List */}
        <div style={card}>
          <h2
            style={{
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            Your API Keys
          </h2>

          {loading ? (
            <div
              style={{
                textAlign: "center",
                color: "#6b7280",
                fontSize: "14px",
                padding: "32px",
              }}
            >
              Loading keys...
            </div>
          ) : keys.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#6b7280",
                fontSize: "14px",
                padding: "32px",
              }}
            >
              No API keys yet. Generate one above!
            </div>
          ) : (
            keys.map((key, i) => (
              <div
                key={key.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom:
                    i < keys.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(74,222,128,0.1)",
                      border: "1px solid rgba(74,222,128,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    🔑
                  </div>
                  <div>
                    <div
                      style={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "600",
                        marginBottom: "2px",
                      }}
                    >
                      {key.name || "API Key"}
                    </div>
                    <div
                      style={{
                        color: "#4ade80",
                        fontSize: "12px",
                        fontFamily: "monospace",
                      }}
                    >
                      {key.key}
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
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
                        key.status === "ACTIVE"
                          ? "rgba(74,222,128,0.1)"
                          : "rgba(239,68,68,0.1)",
                      color: key.status === "ACTIVE" ? "#4ade80" : "#f87171",
                      border: `1px solid ${key.status === "ACTIVE" ? "rgba(74,222,128,0.3)" : "rgba(239,68,68,0.3)"}`,
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background:
                          key.status === "ACTIVE" ? "#4ade80" : "#f87171",
                        display: "inline-block",
                      }}
                    ></span>
                    {key.status}
                  </span>
                  <button
                    onClick={() => handleCopy(key.key, key.id)}
                    style={{
                      background:
                        copied === key.id
                          ? "rgba(74,222,128,0.2)"
                          : "rgba(74,222,128,0.1)",
                      border: "1px solid rgba(74,222,128,0.3)",
                      borderRadius: "10px",
                      padding: "6px 12px",
                      color: "#4ade80",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {copied === key.id ? "✅ Copied!" : "📋 Copy"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
