
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const item = String(req.body?.item || "").trim();

  if (!item || item.length > 80) {
    return res.status(400).json({ error: "Invalid item" });
  }

  const prompt = `Classify this waste item into exactly one category:
  wet, dry, ewaste, or hazard.

  wet: biodegradable waste
  dry: recyclable non-biodegradable waste
  ewaste: electronic or electrical waste
  hazard: toxic, sharp, chemical, or biohazard waste

  Item: "${item}"

  Respond ONLY in JSON:
  {"category":"wet","reason":"one short sentence","tip":"one short sentence"}`;

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3
        })
      }
    );

    if (!response.ok) {
      return res.status(502).json({ error: "AI service error" });
    }

    const result = await response.json();
    const content = result.choices[0].message.content
      .replace(/```json|```/g, "")
      .trim();

    const parsed = JSON.parse(content);
    const categories = ["wet", "dry", "ewaste", "hazard"];

    const category = categories.includes(parsed.category)
      ? parsed.category
      : "dry";

    return res.status(200).json({
      category,
      reason: parsed.reason || "",
      tip: parsed.tip || ""
    });

  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
