module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const item = ((req.body && req.body.item) || "").toString().trim();
  if (!item || item.length > 80) return res.status(400).json({ error: "Invalid item" });

  const prompt = `You are a waste segregation classifier. Classify this item into exactly one category: wet, dry, ewaste, or hazard.
- wet: biodegradable/organic waste
- dry: non-biodegradable but recyclable (plastic, paper, metal, glass, textiles, furniture)
- ewaste: anything electronic/electrical (circuit, battery, cord, plug)
- hazard: toxic, sharp, chemical, or biohazard items

Item: "${item}"

Respond ONLY with strict JSON, no markdown, no extra text, in this exact shape:
{"category":"wet","reason":"one short sentence","tip":"one short sentence"}`;

  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      })
    });
    if (!r.ok) return res.status(502).json({ error: "AI service error" });

    const data = await r.json();
    const text = data.choices[0].message.content.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(text);
    const cat = ["wet", "dry", "ewaste", "hazard"].includes(parsed.category) ? parsed.category : "dry";

    res.status(200).json({ category: cat, reason: parsed.reason || "", tip: parsed.tip || "" });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
