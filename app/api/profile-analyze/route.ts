import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Type definition for the analysis response
interface AnalysisResponse {
  overall_score: number
  headline_score: number
  about_score: number
  experience_score: number
  skills_score: number
  keywords_score: number
  recruiter_score: number
  branding_score: number
  completeness_score: number

  keywords_found: string[]
  missing_keywords: string[]

  headline_feedback: string[]
  about_feedback: string[]
  experience_feedback: string[]
  skills_feedback: string[]

  strengths: string[]
  weaknesses: string[]
  recommendations: string[]

  optimized_headline: string
  headline_alternatives: string[]
  about_section_suggestions: string[]
  ats_keywords: string[]
  priority_improvements: string[]
}

export async function POST(request: NextRequest) {
  try {
    console.log('[v0] === ANALYZE REQUEST START ===')
    
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('[v0] MISSING API KEY: OPENAI_API_KEY is not set')
      return NextResponse.json(
        { error: 'ERROR: OpenAI API key not configured. Check environment variables.' },
        { status: 500 }
      )
    }
    console.log('[v0] API Key check: PASSED')

    // Get the images from the request
    console.log('[v0] Parsing request...')

    const contentType = request.headers.get("content-type")

    let imageFiles: File[] = []
    let linkedinData: any = null

    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData()
      imageFiles = formData.getAll("images") as File[]

      console.log("[v0] Images received:", imageFiles.length)
    } else {
      const body = await request.json()
      linkedinData = body.linkedinData

      console.log("[v0] LinkedIn JSON mode")
    }

    // Validate images
    const validImages = []

    if (imageFiles.length > 0) {

      for (const file of imageFiles) {

        if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
          return NextResponse.json(
            {
              error: `ERROR: Invalid image type ${file.type}`
            },
            {
              status: 400
            }
          )
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const base64 = buffer.toString('base64')

        validImages.push({
          type: 'image_url' as const,
          image_url: {
            url: `data:${file.type};base64,${base64}`,
          },
        })
      }

      console.log("[v0] Screenshot mode")

    } else {

      console.log("[v0] LinkedIn JSON mode")

    }

    // Send images to OpenAI Vision for analysis
    let profileDataText = ""

    if (linkedinData) {

      profileDataText = `
    NAME:
    ${linkedinData.name}

    POSITION:
    ${linkedinData.position}

    ABOUT:
    ${linkedinData.about}

    CURRENT COMPANY:
    ${linkedinData.current_company_name}

    LOCATION:
    ${linkedinData.location}

    EXPERIENCE:
    ${JSON.stringify(linkedinData.experience)}

    EDUCATION:
    ${JSON.stringify(linkedinData.education)}

    POSTS:
    ${JSON.stringify(linkedinData.posts)}

    FOLLOWERS:
    ${linkedinData.followers}

    CONNECTIONS:
    ${linkedinData.connections}
    `

    }
    console.log('[v0] Creating OpenAI Vision prompt...')
    const analysisPrompt = `
You are an elite LinkedIn strategist, recruiter, and ATS optimization expert.

Your job is to provide highly personalized, profile-specific feedback.

If screenshots are provided, analyze the screenshots.

If LinkedIn profile data is provided, analyze the LinkedIn profile data.

LINKEDIN PROFILE DATA:

${profileDataText}

Never provide generic advice.

First identify:

* Current role
* Industry
* Experience level
* Technologies used
* Tools used
* Certifications
* Domain expertise
* Existing keywords

Evaluate:

1. Headline
2. About section
3. Experience section
4. Skills section
5. Keyword optimization
6. Recruiter friendliness
7. Personal branding
8. Profile completeness

ANALYSIS RULES

* Base your analysis primarily on visible information.
* If information is partially visible, make conservative inferences from nearby context.
* If information is completely unavailable, state that it is unavailable.
* Never invent companies, job titles, skills, certifications, education, technologies, or achievements.
* Evaluate profile quality, not screenshot quality.
* Do not penalize sections simply because they are cropped.
* Do not reward or penalize someone because of their seniority.
* Strengths, weaknesses, and recommendations must reference actual evidence from the profile.
* Recommendations must be based on keywords and information visible in the profile.
* Explain why weaknesses matter.
* Avoid generic statements.

Examples:

BAD:
"Generic headline lacking keywords."

GOOD:
"Your headline only mentions 'Software Engineer'. However, your experience demonstrates React, Node.js and TypeScript expertise. Including these technologies in your headline can improve recruiter discoverability and ATS matching."

BAD:
"Few skills listed."

GOOD:
"Experience mentions Python and SQL, but these technologies are not visible in the Skills section, reducing keyword coverage."

SCORING PRINCIPLES

* Scores should reflect profile quality, not seniority.
* Experience and headline should have greater weight than branding.
* Scores should be naturally distributed.
* Avoid giving identical scores across categories.
* Scores above 90 require strong evidence.
* Scores below 30 should be reserved for profiles with major deficiencies.
* Avoid large score differences between categories unless supported by strong evidence.
* Overall score should be a weighted average of the category scores.
* Do not assign perfect scores unless there is exceptional evidence visible in the profile.

SECTION-SPECIFIC FEEDBACK

headline_feedback:

* Evaluate keyword usage.
* Evaluate clarity.
* Suggest improvements.

about_feedback:

* Evaluate storytelling.
* Evaluate professionalism.
* Identify missing information.

experience_feedback:

* Evaluate achievements.
* Evaluate metrics.
* Identify opportunities for stronger impact.

skills_feedback:

* Compare skills with technologies mentioned elsewhere.

keywords_found:
List important technologies, tools, domains, certifications, and role-related keywords visible in the profile.

missing_keywords:
List important keywords that appear underrepresented or absent but would improve discoverability.

PREMIUM OPTIMIZATION

optimized_headline:
Generate a recruiter-friendly headline using keywords visible in the profile.

headline_alternatives:
Generate three alternative headlines.

about_section_suggestions:
Suggest improvements to the About section.

ats_keywords:
List important ATS keywords.

priority_improvements:
List the three highest-impact actions.

Return ONLY valid JSON in this exact structure:

{
"overall_score":0,
"headline_score":0,
"about_score":0,
"experience_score":0,
"skills_score":0,
"keywords_score":0,
"recruiter_score":0,
"branding_score":0,
"completeness_score":0,

"keywords_found":[],
"missing_keywords":[],

"headline_feedback":[],
"about_feedback":[],
"experience_feedback":[],
"skills_feedback":[],

"strengths":[],
"weaknesses":[],
"recommendations":[],

"optimized_headline":"",
"headline_alternatives":[],
"about_section_suggestions":[],
"ats_keywords":[],
"priority_improvements":[]

}

Return JSON only.

Do not output markdown.

Do not explain the JSON.

`

    let analysisResult

    try {
      console.log('[v0] Calling OpenAI Vision API...')
      let messages: any

      if (imageFiles.length > 0) {

        console.log("[v0] Using GPT Vision")

        messages = [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: analysisPrompt
              },
              ...validImages
            ]
          }
        ]

      } else {

        console.log("[v0] Using LinkedIn JSON")

        messages = [
          {
            role: "user",
            content: `
      ${analysisPrompt}

      Here is the LinkedIn profile data:

      ${JSON.stringify(linkedinData, null, 2)}
      `
          }
        ]

      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.3,
        max_tokens: 2000,
      })

      console.log('[v0] OpenAI response received')
      const responseText = response.choices[0]?.message?.content
      console.log('[v0] Response text preview:', responseText?.substring(0, 300))

      if (!responseText) {
        console.error('[v0] OPENAI ERROR: No response content from OpenAI')
        return NextResponse.json(
          { error: 'ERROR: No response from OpenAI' },
          { status: 500 }
        )
      }

      // Parse the JSON response
      console.log('[v0] Attempting to extract JSON from response...')
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      
      if (!jsonMatch) {
        console.error('[v0] JSON PARSING ERROR: Could not find JSON in response')
        return NextResponse.json(
          { error: `ERROR - JSON Parsing Failed: No JSON found in response` },
          { status: 500 }
        )
      }

      console.log('[v0] JSON extracted, length:', jsonMatch[0].length)

      try {
        analysisResult = JSON.parse(jsonMatch[0]) as AnalysisResponse
        console.log('[v0] JSON PARSING SUCCESS')
        console.log('[v0] Overall score:', analysisResult.overall_score)
      } catch (parseError) {
        console.error('[v0] JSON PARSE ERROR:', parseError)
        return NextResponse.json(
          { error: `ERROR - Invalid JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}` },
          { status: 500 }
        )
      }

      // Validate the response structure
      console.log('[v0] Validating response structure...')
      if (analysisResult.overall_score === undefined ||
  !analysisResult.strengths ||
  !analysisResult.recommendations) {
        console.error('[v0] VALIDATION ERROR: Missing required fields in response')
        throw new Error('Invalid response structure from OpenAI: Missing required fields')
      }
      console.log('[v0] Response structure validation: PASSED')
    } catch (error) {
      console.error('[v0] OPENAI ANALYSIS ERROR:', error)
      
      if (error instanceof Error && error.message.includes('API key')) {
        console.error('[v0] API KEY AUTHENTICATION ERROR')
        return NextResponse.json(
          { error: `ERROR - API Authentication: ${error.message}` },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { error: `ERROR - OpenAI Analysis: ${error instanceof Error ? error.message : String(error)}` },
        { status: 500 }
      )
    }

    // Return the analysis results
    console.log('[v0] === ANALYSIS COMPLETE - RETURNING RESULTS ===')
    return NextResponse.json(analysisResult, { status: 200 })
  } catch (error) {
    console.error('[v0] === UNEXPECTED ERROR ===')
    console.error('[v0] Error:', error)
    
    return NextResponse.json(
      { error: `ERROR - Unexpected: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}
