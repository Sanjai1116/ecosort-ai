# EcoSort AI — Smart Waste Segregation Assistant

An AI-powered web app that tells you which bin an item belongs in — Wet, Dry, E-waste, or Hazardous — along with the reason and how to dispose of it safely.

Built for the **1M1B AI for Sustainability Virtual Internship** (in collaboration with IBM SkillsBuild & AICTE).

## 🌍 SDG Alignment
**SDG 12: Responsible Consumption and Production**

## ❓ Problem Statement
Improper waste segregation is a common issue in households, colleges, and communities. Most people are unaware of which category — wet, dry, e-waste, or hazardous — a given item belongs to, leading to contamination of recyclables and increased landfill burden.

## 🤖 How It Works
1. User types the name of an item (e.g. "used battery", "banana peel")
2. The app sends the item to an AI model (via the Groq API) with a classification prompt
3. The AI returns the correct category, the reason, and a disposal tip
4. The result is displayed instantly with color-coded categories

## 🧠 AI / Technologies Used
- **Groq API** (LLM-based classification) — `openai/gpt-oss-20b`
- Prompt Engineering for structured JSON classification
- Vanilla HTML, CSS, JavaScript (no framework, no backend)

## 🗑️ The Four Categories
| Category | Description |
|---|---|
| 🟢 Wet Waste | Biodegradable/organic — food scraps, peels |
| 🔵 Dry Waste | Recyclable, non-biodegradable — plastic, paper, metal |
| 🟡 E-waste | Anything electronic/electrical |
| 🔴 Hazardous | Toxic, sharp, or chemical items |

## 👥 Target Users
Households, students, college campuses, and municipal waste management staff.

## 📈 Expected Impact
Improves correct waste segregation at the source, reducing recyclable contamination and landfill waste, while raising awareness about responsible consumption.

## ⚖️ Responsible AI Considerations
- **Transparency**: Every classification includes a clear reason
- **Fairness**: Categories follow general, widely-applicable waste norms
- **Ethics**: No personal or sensitive data is collected or stored
- **Privacy**: No user data is saved — each check is stateless

## 🚀 Running Locally
1. Clone this repo
2. Open `index.html` in your browser
3. That's it — no build step, no install required

## 👤 Author
**Sanjai S**
Arasu Engineering College
redeploy
