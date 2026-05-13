const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string

export async function generateFunnelContent(businessDescription: string, funnelType: string) {
  const prompt = `You are an elite direct-response copywriter. Generate high-converting funnel content.

Business: ${businessDescription}
Funnel Type: ${funnelType}

Return ONLY valid JSON:
{
  "headline": "compelling headline under 10 words",
  "subheadline": "supporting statement under 20 words",
  "cta_text": "action button text under 5 words",
  "description": "2-3 sentence value proposition",
  "email_sequence": ["Day 1 subject line", "Day 3 subject line", "Day 7 subject line", "Day 14 subject line", "Day 21 subject line"]
}

Be specific, use power words, focus on transformation. No generic filler. No explanation — JSON only.`

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 600
    })
  })

  if (!response.ok) throw new Error('AI generation failed')
  const data = await response.json()
  const content = data.choices[0].message.content
  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Invalid AI response')
  return JSON.parse(jsonMatch[0])
}
