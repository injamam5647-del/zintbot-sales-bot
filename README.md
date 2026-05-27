# ⚡ ZintBot — AI Sales Intelligence Bot
### FlowZint AI Hackathon 2026 | Sales Bot Category

> **Developed by:** Injamam  
> **Email:** injamam5647@gmail.com  
> **Category:** Sales Bot  
> **Submission Portal:** https://flowzint.in/2026/ai/hackothon  

---

## 🚀 Project Overview

**ZintBot** is a fully AI-powered Sales Bot that automatically engages customers, understands their business needs, recommends the right product, handles objections, and captures leads — all through a conversational interface powered by **Claude AI (Anthropic API)**.

ZintBot solves a real and massive business problem:

> *Most businesses lose potential customers because they cannot respond instantly 24/7. ZintBot acts as a tireless AI salesperson that never sleeps, never misses a lead, and always delivers a perfect pitch.*

---

## 🎯 Key Features

| Feature | Description |
|---|---|
| 🤖 AI Sales Conversation | Claude-powered chat that understands intent and sells |
| 🛍️ Smart Product Catalog | 6 B2B SaaS products with intelligent recommendations |
| 🎯 Lead Capture System | Collects name + email with exclusive offer popup |
| ⚡ Quick Reply Buttons | Guided conversation flow for faster conversions |
| 🏆 Live Leaderboard | Hackathon results dashboard with animated rankings |
| 🎨 Premium UI/UX | Gold-themed dark interface with animations |

---

## 🧠 Model Innovation & Novelty (30%)

ZintBot goes beyond a basic chatbot by implementing a **multi-layered AI sales strategy**:

### What Makes It Innovative:

1. **Custom Sales Prompt Engineering**
   - ZintBot uses a highly specific system prompt that mimics a trained human sales professional
   - It follows a structured 5-step sales funnel: Greet → Discover → Pitch → Handle Objection → Close

2. **Context-Aware Product Recommendation**
   - The AI reads the customer's pain points and maps them to the right product automatically
   - No rule-based logic — fully AI-driven decision making

3. **Automated Lead Intelligence**
   - Bot detects customer interest signals (trial requests, pricing questions) and auto-triggers lead capture
   - Creates urgency with limited-time offers (20% discount, 14-day free trial)

4. **Multi-Tab AI Interface**
   - Sales Chat, Product Catalog, and Live Leaderboard — all in one unified AI-powered app

---

## 🌍 Real-World Applicability (25%)

### Problem Being Solved:
Businesses lose **67% of potential customers** due to slow response times and unavailable sales teams outside business hours.

### ZintBot Solution:

- **Any business** (SaaS, E-commerce, Services) can deploy ZintBot on their website
- Works **24/7 without human intervention**
- Captures leads automatically and forwards them for follow-up
- Scales to handle **unlimited concurrent customers**

### Real Use Cases:
- Software companies selling subscriptions
- E-commerce stores converting visitors to buyers
- Service agencies qualifying leads automatically
- Startups with small sales teams needing AI assistance

---

## ⚙️ Technical Architecture (25%)

### Tech Stack:

```
Frontend:     React.js (Functional Components + Hooks)
AI Engine:    Anthropic Claude API (claude-sonnet-4-20250514)
Styling:      Inline CSS with CSS animations (no external dependencies)
State Mgmt:   React useState, useRef, useEffect
API Pattern:  Direct fetch() to Anthropic /v1/messages endpoint
```

### System Architecture:

```
User Input
    ↓
React Frontend (ZintBot UI)
    ↓
Claude API Request
├── System Prompt (Sales Strategy)
├── Full Conversation History
└── Product Catalog Context
    ↓
Claude AI Response
    ↓
Lead Detection Logic
    ↓
UI Update + Optional Lead Capture Trigger
```

### Key Technical Decisions:

1. **Stateless API Design** — Full conversation history sent with every request for accurate context
2. **Custom System Prompt** — Carefully engineered sales strategy embedded in every API call
3. **Optimistic UI Updates** — Messages appear instantly, API response fills in asynchronously
4. **Responsive Layout** — Works on mobile, tablet, and desktop screens
5. **Error Handling** — Graceful fallback messages on API failures

### Project File Structure:

```
zintbot/
├── sales-bot.jsx          # Main React component (all-in-one)
├── README.md              # This documentation file
└── assets/
    └── demo-preview.png   # App screenshot (optional)
```

---

## 📄 Documentation Clarity (20%)

### How to Run the Project:

**Option 1 — Claude.ai Artifact (Recommended for Demo)**
1. Open Claude.ai
2. Paste the `sales-bot.jsx` code as a React Artifact
3. The bot runs instantly in the browser — no setup needed

**Option 2 — Local React App**

```bash
# Step 1: Create React App
npx create-react-app zintbot
cd zintbot

# Step 2: Replace src/App.js with sales-bot.jsx content

# Step 3: Start the app
npm start

# Step 4: Open browser
# Go to: http://localhost:3000
```

### Environment Requirements:

| Requirement | Version |
|---|---|
| Node.js | 18+ |
| React | 18+ |
| Anthropic API Key | Required (set in API headers) |
| Browser | Chrome, Firefox, Safari, Edge |

### API Configuration:

The app calls the Anthropic API directly. Ensure the API key is properly configured in the deployment environment.

```javascript
// API Call Structure
fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: SYSTEM_PROMPT,   // Custom sales strategy
    messages: conversationHistory
  })
})
```

---

## 🖥️ App Screenshots / Demo Flow

### Tab 1 — Sales Chat
- User types their business problem
- ZintBot asks smart follow-up questions
- Recommends the most relevant product
- Offers free trial and discount to close the deal

### Tab 2 — Products Catalog
- Displays all 6 products with pricing
- Click any product → instantly starts a sales conversation about it

### Tab 3 — Leaderboard
- Shows FlowZint Hackathon 2026 rankings
- Animated confetti on tab open
- Top 3 podium display + full Top 10 rankings

### Lead Capture Modal
- Triggers automatically when customer shows interest
- Collects Name + Email
- Offers exclusive 20% discount + 14-day free trial

---

## 📊 Evaluation Criteria Alignment

| Criteria | Weight | How ZintBot Addresses It |
|---|---|---|
| Model Innovation & Novelty | 30% | Custom AI sales strategy prompt, intelligent lead detection, multi-feature app |
| Real-World Applicability | 25% | Any business can use it; solves real sales conversion problem |
| Technical Architecture | 25% | Clean React code, efficient Claude API usage, stateful conversation management |
| Documentation Clarity | 20% | This README + inline code comments + clear project structure |

---

## 👤 About the Developer

**Name:** Injamam  
**Email:** injamam5647@gmail.com  
**Hackathon:** FlowZint AI Hackathon 2026  
**Category:** Sales Bot  
**Submission:** https://flowzint.in/2026/ai/hackothon  

---

## ⚠️ Compliance Checklist

- [x] Project submitted through official FlowZint portal only
- [x] Original work created by the participant
- [x] Public demo link accessible (no private links)
- [x] No copied, harmful, or misleading content
- [x] Single final project submission
- [x] All links and demos are working and accessible

---

## 📅 Important Dates

| Event | Date |
|---|---|
| Submission Deadline | 4th July 2026 |
| Result Announcement | 12th July 2026 |
| Result Portal | https://flowzint.in/2026/ai/hackothon/results/round1 |

---

*Built with ❤️ using React + Anthropic Claude AI for FlowZint AI Hackathon 2026*
