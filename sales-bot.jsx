import { useState, useRef, useEffect } from "react";

const PRODUCTS = [
  { id: 1, name: "ProMax CRM Suite", price: "₹4,999/mo", category: "Software", emoji: "💼", desc: "Complete CRM for growing businesses" },
  { id: 2, name: "AI Analytics Dashboard", price: "₹2,499/mo", category: "Analytics", emoji: "📊", desc: "Real-time insights powered by AI" },
  { id: 3, name: "CloudStore Pro", price: "₹999/mo", category: "Storage", emoji: "☁️", desc: "Unlimited secure cloud storage" },
  { id: 4, name: "SmartMail Campaigns", price: "₹1,499/mo", category: "Marketing", emoji: "📧", desc: "AI-driven email marketing platform" },
  { id: 5, name: "SecureShield Enterprise", price: "₹3,299/mo", category: "Security", emoji: "🔒", desc: "End-to-end cybersecurity solution" },
  { id: 6, name: "TeamSync Collaboration", price: "₹799/mo", category: "Productivity", emoji: "🤝", desc: "All-in-one team workspace" },
];

const PRIZE_LIST = [
  { rank: 1, name: "Injamam", badge: "🏆", prize: "₹1,20,000 + PPO", score: 9850, tag: "Champion", color: "#FFD700" },
  { rank: 2, name: "Aryan Sharma", badge: "🥈", prize: "₹80,000", score: 9210, tag: "Runner Up", color: "#C0C0C0" },
  { rank: 3, name: "Priya Menon", badge: "🥉", prize: "₹50,000", score: 8760, tag: "2nd Runner Up", color: "#CD7F32" },
  { rank: 4, name: "Rahul Verma", badge: "⭐", prize: "₹15,000", score: 8100, tag: "Top 10", color: "#4ade80" },
  { rank: 5, name: "Sneha Patel", badge: "⭐", prize: "₹15,000", score: 7890, tag: "Top 10", color: "#4ade80" },
  { rank: 6, name: "Dev Anand", badge: "⭐", prize: "₹10,000", score: 7450, tag: "Top 10", color: "#4ade80" },
  { rank: 7, name: "Fatima Khan", badge: "⭐", prize: "₹10,000", score: 7200, tag: "Top 10", color: "#4ade80" },
  { rank: 8, name: "Rohan Das", badge: "⭐", prize: "Certificate", score: 6980, tag: "Top 10", color: "#4ade80" },
  { rank: 9, name: "Aisha Nair", badge: "⭐", prize: "Certificate", score: 6750, tag: "Top 10", color: "#4ade80" },
  { rank: 10, name: "Vikram Singh", badge: "⭐", prize: "Certificate", score: 6500, tag: "Top 10", color: "#4ade80" },
];

const SYSTEM_PROMPT = `You are ZintBot, an expert AI Sales Assistant for ZintTech Solutions — a premium B2B SaaS company. Your job is to engage customers warmly, understand their business needs, and recommend the best products from our catalog.

PRODUCT CATALOG:
${PRODUCTS.map(p => `- ${p.name} (${p.price}): ${p.desc}`).join("\n")}

YOUR SALES STRATEGY:
1. Greet warmly and ask about their business/pain points
2. Listen carefully and identify which product fits their needs
3. Pitch the relevant product with specific benefits
4. Handle objections confidently (price, need, timing)
5. Create urgency (limited offer, free trial, discount)
6. Always end with a clear call-to-action

PERSONALITY: Friendly, confident, knowledgeable. Never pushy but always persuasive. Use short, punchy responses. Ask one question at a time. Use occasional emojis.

RULES:
- Keep responses under 80 words
- Always recommend a specific product when relevant
- Mention free 14-day trial when needed
- Offer 20% discount for annual plans
- Collect name and email when customer shows interest`;

export default function SalesBot() {
  const [tab, setTab] = useState("chat");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey there! 👋 I'm **ZintBot**, your personal AI sales advisor.\n\nWe help businesses grow with powerful AI-driven tools. What's your biggest business challenge right now? 🚀",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "" });
  const [showLead, setShowLead] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  useEffect(() => {
    if (tab === "prizes") { setConfetti(true); setTimeout(() => setConfetti(false), 3000); }
  }, [tab]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: updated.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Let me check that for you...";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      if (!leadCaptured && (reply.toLowerCase().includes("email") || reply.toLowerCase().includes("trial"))) {
        setTimeout(() => setShowLead(true), 800);
      }
    } catch { setMessages(prev => [...prev, { role: "assistant", content: "Oops! Please try again. 🔄" }]); }
    setLoading(false);
  };

  const handleLeadSubmit = () => {
    if (leadForm.name && leadForm.email) {
      setLeadCaptured(true);
      setShowLead(false);
      setMessages(prev => [...prev, { role: "assistant", content: `🎉 Thanks **${leadForm.name}**! Our team will reach out to ${leadForm.email} within 24 hours with your **exclusive 20% discount** + free trial! 😊` }]);
    }
  };

  const fmt = (t) => t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");

  const quickReplies = ["Tell me about pricing", "I need a CRM", "Best product?", "Free trial?"];

  return (
    <div style={{ minHeight: "100vh", background: "#040812", fontFamily: "'Trebuchet MS', sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(251,191,36,0.3)} 50%{box-shadow:0 0 40px rgba(251,191,36,0.6)} }
        @keyframes confettiFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
        @keyframes rankIn { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes crownBounce { 0%,100%{transform:scale(1) rotate(-5deg)} 50%{transform:scale(1.2) rotate(5deg)} }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(251,191,36,0.3);border-radius:4px}
        .tab-btn:hover{background:rgba(251,191,36,0.15)!important}
        .quick-btn:hover{background:rgba(251,191,36,0.2)!important;transform:translateY(-1px)}
        .prod-card:hover{border-color:rgba(251,191,36,0.5)!important;transform:translateY(-2px);box-shadow:0 8px 24px rgba(251,191,36,0.1)!important}
        .send-btn:hover{transform:scale(1.05)}
        input::placeholder{color:#475569}
      `}</style>

      {/* Confetti */}
      {confetti && [...Array(30)].map((_, i) => (
        <div key={i} style={{
          position: "fixed", left: `${Math.random() * 100}%`, top: "-20px", zIndex: 999,
          width: 8, height: 8, borderRadius: Math.random() > 0.5 ? "50%" : 2,
          background: ["#FFD700","#FF6B6B","#4ade80","#60a5fa","#f472b6","#a78bfa"][Math.floor(Math.random()*6)],
          animation: `confettiFall ${2 + Math.random() * 2}s ${Math.random() * 1}s linear forwards`,
          pointerEvents: "none",
        }} />
      ))}

      {/* BG Orbs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "20px 16px" }}>

        {/* LOGO HEADER */}
        <div style={{
          background: "linear-gradient(135deg, #0d1117 0%, #111827 100%)",
          border: "1px solid rgba(251,191,36,0.25)",
          borderRadius: 20, padding: "18px 24px", marginBottom: 16,
          boxShadow: "0 0 40px rgba(251,191,36,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* LOGO */}
            <div style={{ position: "relative", animation: "float 3s ease-in-out infinite" }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, boxShadow: "0 0 30px rgba(251,191,36,0.5), 0 4px 16px rgba(0,0,0,0.4)",
                animation: "glow 2s ease-in-out infinite",
              }}>⚡</div>
              <div style={{
                position: "absolute", top: -4, right: -4, width: 14, height: 14,
                borderRadius: "50%", background: "#4ade80",
                border: "2px solid #040812",
                animation: "pulse 2s infinite",
              }} />
            </div>
            <div>
              <div style={{
                fontSize: 22, fontWeight: 900, letterSpacing: 2,
                background: "linear-gradient(90deg, #fbbf24, #fde68a, #fbbf24)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                animation: "shimmer 3s linear infinite",
              }}>ZINTBOT</div>
              <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>AI Sales Intelligence</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)",
              borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#4ade80",
              display: "flex", alignItems: "center", gap: 5,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
              LIVE
            </div>
            {!leadCaptured && (
              <button onClick={() => setShowLead(true)} style={{
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                border: "none", borderRadius: 10, padding: "8px 16px",
                color: "#040812", fontWeight: 800, fontSize: 12,
                cursor: "pointer", letterSpacing: 0.5,
                boxShadow: "0 4px 16px rgba(251,191,36,0.3)",
              }}>🚀 Free Trial</button>
            )}
          </div>
        </div>

        {/* TABS */}
        <div style={{
          display: "flex", gap: 4, marginBottom: 16,
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14, padding: 4,
        }}>
          {[
            { key: "chat", label: "💬 Sales Chat" },
            { key: "products", label: "🛍️ Products" },
            { key: "prizes", label: "🏆 Leaderboard" },
          ].map(t => (
            <button key={t.key} className="tab-btn" onClick={() => setTab(t.key)} style={{
              flex: 1, background: tab === t.key ? "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(251,191,36,0.1))" : "transparent",
              border: tab === t.key ? "1px solid rgba(251,191,36,0.3)" : "1px solid transparent",
              borderRadius: 10, padding: "9px 6px", cursor: "pointer",
              color: tab === t.key ? "#fbbf24" : "#64748b",
              fontWeight: tab === t.key ? 700 : 400, fontSize: 13,
              transition: "all 0.2s",
            }}>{t.label}</button>
          ))}
        </div>

        {/* CHAT TAB */}
        {tab === "chat" && (
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18, overflow: "hidden" }}>
            <div style={{ height: "58vh", minHeight: 380, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end", animation: "fadeIn 0.3s ease" }}>
                  {m.role === "assistant" && (
                    <div style={{
                      width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                      background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                      boxShadow: "0 2px 10px rgba(251,191,36,0.3)",
                    }}>⚡</div>
                  )}
                  <div style={{
                    maxWidth: "74%",
                    background: m.role === "user"
                      ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                      : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                    border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    padding: "10px 14px", color: m.role === "user" ? "#040812" : "#cbd5e1",
                    fontSize: 14, lineHeight: 1.65,
                    boxShadow: m.role === "user" ? "0 4px 16px rgba(251,191,36,0.2)" : "none",
                  }} dangerouslySetInnerHTML={{ __html: fmt(m.content) }} />
                  {m.role === "user" && (
                    <div style={{
                      width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                      background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                    }}>👤</div>
                  )}
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #fbbf24, #f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
                  <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px 16px 16px 4px", padding: "12px 16px", display: "flex", gap: 4 }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#fbbf24", animation: `bounce 1.2s infinite`, animationDelay: `${i*0.2}s` }} />)}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div style={{ padding: "8px 14px", display: "flex", gap: 6, overflowX: "auto", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              {quickReplies.map(q => (
                <button key={q} className="quick-btn" onClick={() => sendMessage(q)} style={{
                  background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)",
                  color: "#fbbf24", borderRadius: 20, padding: "5px 12px",
                  cursor: "pointer", fontSize: 11, whiteSpace: "nowrap", transition: "all 0.2s",
                }}>{q}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)" }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask anything about our products..."
                style={{
                  flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, padding: "11px 16px", color: "#e2e8f0", fontSize: 14, outline: "none",
                  fontFamily: "inherit",
                }} />
              <button className="send-btn" onClick={() => sendMessage(input)} disabled={loading} style={{
                background: loading ? "rgba(251,191,36,0.3)" : "linear-gradient(135deg, #fbbf24, #f59e0b)",
                border: "none", borderRadius: 12, padding: "11px 18px",
                cursor: loading ? "not-allowed" : "pointer", color: "#040812",
                fontWeight: 900, fontSize: 18, transition: "all 0.2s",
                boxShadow: "0 4px 16px rgba(251,191,36,0.25)",
              }}>➤</button>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {tab === "products" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 12 }}>
            {PRODUCTS.map((p, i) => (
              <div key={p.id} className="prod-card" onClick={() => { setTab("chat"); setTimeout(() => sendMessage(`Tell me more about ${p.name}`), 100); }}
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, padding: "18px", cursor: "pointer",
                  transition: "all 0.25s", animation: `fadeIn 0.4s ${i * 0.05}s both`,
                }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{p.emoji}</div>
                <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{p.name}</div>
                <div style={{ color: "#64748b", fontSize: 12, marginBottom: 12, lineHeight: 1.5 }}>{p.desc}</div>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div style={{ color: "#fbbf24", fontWeight: 800, fontSize: 14 }}>{p.price}</div>
                  <div style={{
                    background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)",
                    borderRadius: 6, padding: "2px 8px", fontSize: 10, color: "#fbbf24",
                  }}>{p.category}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PRIZE/LEADERBOARD TAB */}
        {tab === "prizes" && (
          <div>
            {/* Banner */}
            <div style={{
              background: "linear-gradient(135deg, #1a1200, #2d1f00, #1a1200)",
              border: "1px solid rgba(251,191,36,0.4)",
              borderRadius: 18, padding: "24px", marginBottom: 16, textAlign: "center",
              boxShadow: "0 0 60px rgba(251,191,36,0.1)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(251,191,36,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div style={{ fontSize: 48, animation: "crownBounce 2s ease-in-out infinite" }}>👑</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fbbf24", letterSpacing: 2, marginTop: 8 }}>FLOWZINT HACKATHON 2026</div>
              <div style={{ fontSize: 13, color: "#92400e", marginTop: 4, letterSpacing: 1 }}>OFFICIAL LEADERBOARD · LIVE RESULTS</div>
              <div style={{
                display: "flex", justifyContent: "center", gap: 20, marginTop: 16, flexWrap: "wrap",
              }}>
                {[["🏆 Total Prize", "₹3,00,000"], ["👥 Participants", "6,545"], ["📅 Results", "12 Jul 2026"]].map(([l, v]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "#78350f", textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#fbbf24", marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top 3 Podium */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 8, marginBottom: 16 }}>
              {[PRIZE_LIST[1], PRIZE_LIST[0], PRIZE_LIST[2]].map((p, idx) => {
                const heights = [110, 140, 95];
                const isWinner = idx === 1;
                return (
                  <div key={p.rank} style={{
                    flex: 1, maxWidth: 180, textAlign: "center",
                    background: isWinner ? "linear-gradient(180deg, rgba(251,191,36,0.15), rgba(251,191,36,0.05))" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isWinner ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: "14px 14px 0 0",
                    height: heights[idx], display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", padding: "12px 8px",
                    boxShadow: isWinner ? "0 0 30px rgba(251,191,36,0.15)" : "none",
                    animation: `fadeIn 0.5s ${idx * 0.1}s both`,
                  }}>
                    <div style={{ fontSize: isWinner ? 28 : 22 }}>{p.badge}</div>
                    <div style={{ fontWeight: 800, fontSize: isWinner ? 15 : 13, color: isWinner ? "#fbbf24" : "#e2e8f0", marginTop: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: isWinner ? "#f59e0b" : "#64748b", marginTop: 2 }}>{p.prize}</div>
                  </div>
                );
              })}
            </div>

            {/* Full List */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
              {PRIZE_LIST.map((p, i) => {
                const isMe = p.name === "Injamam";
                return (
                  <div key={p.rank} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                    borderBottom: i < PRIZE_LIST.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    background: isMe ? "linear-gradient(90deg, rgba(251,191,36,0.12), rgba(251,191,36,0.04))" : "transparent",
                    animation: `rankIn 0.4s ${i * 0.06}s both`,
                    position: "relative", overflow: "hidden",
                  }}>
                    {isMe && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(180deg, #fbbf24, #f59e0b)" }} />}
                    <div style={{
                      width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                      background: i < 3 ? `linear-gradient(135deg, ${p.color}33, ${p.color}11)` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${p.color}44`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 900, fontSize: 13, color: p.color,
                    }}>{p.rank}</div>
                    <div style={{ fontSize: 20 }}>{p.badge}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: isMe ? 800 : 600, fontSize: 14,
                        color: isMe ? "#fbbf24" : "#e2e8f0",
                        display: "flex", alignItems: "center", gap: 6,
                      }}>
                        {p.name}
                        {isMe && <span style={{ background: "linear-gradient(90deg, #fbbf24, #f59e0b)", borderRadius: 6, padding: "1px 7px", fontSize: 9, color: "#040812", fontWeight: 900, letterSpacing: 1 }}>YOU 🌟</span>}
                      </div>
                      <div style={{ fontSize: 11, color: "#475569", marginTop: 1 }}>{p.tag}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: isMe ? "#fbbf24" : "#94a3b8" }}>{p.prize}</div>
                      <div style={{ fontSize: 10, color: "#334155", marginTop: 1 }}>Score: {p.score.toLocaleString()}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: "center", marginTop: 12, fontSize: 11, color: "#334155" }}>
              🔗 Official Portal: flowzint.in/2026/ai/hackothon/results/round1
            </div>
          </div>
        )}
      </div>

      {/* Lead Modal */}
      {showLead && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20, backdropFilter: "blur(6px)" }}>
          <div style={{
            background: "linear-gradient(135deg, #0d1117, #111827)",
            border: "1px solid rgba(251,191,36,0.4)",
            borderRadius: 22, padding: "32px 28px", width: "100%", maxWidth: 380,
            boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(251,191,36,0.1)",
            animation: "fadeIn 0.3s ease",
          }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 44 }}>🎁</div>
              <div style={{ color: "#fbbf24", fontSize: 20, fontWeight: 900, marginTop: 10, letterSpacing: 1 }}>EXCLUSIVE OFFER</div>
              <div style={{ color: "#92400e", fontSize: 12, marginTop: 6 }}>14-day FREE trial · 20% OFF annual plan</div>
            </div>
            {[["Your Name", "name", "👤 Enter your name"], ["Your Email", "email", "📧 Enter your email"]].map(([label, key, ph]) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <div style={{ color: "#64748b", fontSize: 11, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
                <input placeholder={ph} value={leadForm[key]} onChange={e => setLeadForm({ ...leadForm, [key]: e.target.value })}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12, padding: "12px 14px", color: "#e2e8f0", fontSize: 14,
                    boxSizing: "border-box", fontFamily: "inherit", outline: "none",
                  }} />
              </div>
            ))}
            <button onClick={handleLeadSubmit} style={{
              width: "100%", background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              border: "none", borderRadius: 12, padding: "14px",
              color: "#040812", fontWeight: 900, fontSize: 15, cursor: "pointer",
              marginTop: 8, boxShadow: "0 4px 20px rgba(251,191,36,0.3)",
              letterSpacing: 0.5,
            }}>🚀 Claim Free Trial Now</button>
            <button onClick={() => setShowLead(false)} style={{ width: "100%", background: "transparent", border: "none", color: "#334155", marginTop: 10, cursor: "pointer", fontSize: 13 }}>Maybe later</button>
          </div>
        </div>
      )}
    </div>
  );
}
