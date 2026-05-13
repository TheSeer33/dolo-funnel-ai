const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function generateFunnelContent(businessDescription: string, funnelType: string): Promise<{
  headline: string
  subheadline: string
  cta: string
  description: string
  emailSequence: string[]
}> {
  const prompt = `You are an elite direct-response copywriter. Generate high-converting funnel content for this business:

Business: ${businessDescription}
Funnel Type: ${funnelType}

Return ONLY valid JSON with this exact structure:
{
  "headline": "compelling headline under 10 words",
  "subheadline": "supporting statement under 20 words",
  "cta": "action button text under 5 words",
  "description": "2-3 sentence value proposition",
  "emailSequence": ["Day 1 subject line", "Day 3 subject line", "Day 7 subject line", "Day 14 subject line", "Day 21 subject line"]
}

Rules: Be specific, use power words, focus on transformation and outcome. No generic filler.`

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 800
    })
  })

  if (!response.ok) throw new Error('AI generation failed')
  
  const data = await response.json()
  const content = data.choices[0].message.content
  
  // Parse JSON from response
  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Invalid AI response format')
  
  return JSON.parse(jsonMatch[0])
}
