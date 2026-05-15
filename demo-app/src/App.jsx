import { useState } from "react";
import axios from "axios";

const API_KEY = "ak_537800779d5697d09d1f30e641d1937f";

export default function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);
    setSelected(null);
    if (val.length < 2) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/search?q=${val}&limit=6`,
        {
          headers: { "X-API-Key": API_KEY },
        },
      );
      setSuggestions(res.data.data || []);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (s) => {
    setSelected(s);
    setQuery(s.village || s.village_name || s.villageName || "");
    setSuggestions([]);
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
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
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
            marginBottom: "8px",
          }}
        >
          Village API Demo
        </h1>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          Search from 4,57,054 villages across India
        </p>
      </div>

      {/* Search Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(74,222,128,0.15)",
          borderRadius: "24px",
          padding: "32px",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "4px",
          }}
        >
          🔍 Village Search
        </h2>
        <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "20px" }}>
          Type at least 2 characters to search
        </p>

        <div style={{ position: "relative", marginBottom: "20px" }}>
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
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search village name..."
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: "12px",
              padding: "13px 14px 13px 42px",
              color: "white",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
          {loading && (
            <span
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#4ade80",
                fontSize: "12px",
              }}
            >
              Searching...
            </span>
          )}

          {suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#111827",
                border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: "12px",
                marginTop: "6px",
                overflow: "hidden",
                zIndex: 10,
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  onClick={() => handleSelect(s)}
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    borderBottom:
                      i < suggestions.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(74,222,128,0.08)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div
                    style={{
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {s.village || s.village_name || s.villageName}
                  </div>
                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "12px",
                      marginTop: "2px",
                    }}
                  >
                    {s.subdistrict || s.sub_district_name || s.subDistrictName}{" "}
                    · {s.district || s.district_name || s.districtName} ·{" "}
                    {s.state || s.state_name || s.stateName}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <div
            style={{
              background: "rgba(74,222,128,0.06)",
              border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <h3
              style={{
                color: "#4ade80",
                fontSize: "16px",
                fontWeight: "700",
                marginBottom: "16px",
              }}
            >
              📍 Selected Location
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {[
                {
                  label: "Village",
                  value:
                    selected.village ||
                    selected.village_name ||
                    selected.villageName,
                },
                {
                  label: "Sub-District",
                  value:
                    selected.subdistrict ||
                    selected.sub_district_name ||
                    selected.subDistrictName,
                },
                {
                  label: "District",
                  value:
                    selected.district ||
                    selected.district_name ||
                    selected.districtName,
                },
                {
                  label: "State",
                  value:
                    selected.state || selected.state_name || selected.stateName,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: "10px",
                    padding: "12px",
                  }}
                >
                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "11px",
                      fontWeight: "600",
                      marginBottom: "4px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      color: "white",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "32px", marginTop: "32px" }}>
        {[
          { value: "4,57,054", label: "Villages" },
          { value: "28", label: "States" },
          { value: "466", label: "Districts" },
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

      <div style={{ marginTop: "24px" }}>
        <span style={{ color: "#374151", fontSize: "12px" }}>
          🔐 Powered by Village API · JWT Secured
        </span>
      </div>

      <style>{`input::placeholder { color: #4b5563; }`}</style>
    </div>
  );
}
