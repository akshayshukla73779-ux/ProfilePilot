import { NextRequest, NextResponse } from "next/server";
import { extractResumeText } from "@/lib/extractResume";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  export async function POST(req: NextRequest) {
  
  try {
    const formData = await req.formData();

    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json(
        {
          error: "No resume uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const resumeText = await extractResumeText(buffer);

    const jobDescription = formData.get("jobDescription") as string;

    console.log("====== RESUME ======");
    console.log(resumeText);

    console.log("====== JOB DESCRIPTION ======");
    console.log(jobDescription);

    const completion = await openai.chat.completions.create({
      
      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: `
    You are an ATS Resume Analyzer.

    Compare the resume with the job description.

    Return ONLY valid JSON in this format:

    {
      "atsScore": 0,
      "interviewProbability": 0,

      "sectionScores": {
        "experience": 0,
        "skills": 0,
        "education": 0,
        "keywords": 0,
        "achievements": 0,
        "formatting": 0
      },
      
      "recruiterPerspective": ""

      "redFlags": []

      "resumeRewrite": {
        "professionalSummary": "",
        "experienceBullets": [],
        "skills": [],
        "keywordSuggestions": [],
        "achievementSuggestions": []
      }

      "strengths": [],
      "weaknesses": [],
      "missingKeywords": [],
      "improvements": []
    }

    No markdown.
    No explanations.
    No extra text.

    Experience score should reflect relevance of experience.

    Skills score should reflect alignment between resume skills and job requirements.

    Education score should evaluate educational qualifications.

    Keyword score should evaluate ATS keyword coverage.

    Achievements score should evaluate measurable accomplishments and quantified impact.

    Formatting score should evaluate clarity and ATS compatibility.

    All scores must be between 0 and 100.

    Return at least 3 strengths.

    Return at least 3 weaknesses.

    Return at least 5 missing keywords.

    Return at least 5 improvement suggestions.
    Write recruiterPerspective in a professional tone.

    It should explain how a recruiter would perceive the candidate, what stands out positively, and what concerns may reduce interview chances.

    Keep it between 3 and 5 sentences.

    Identify the major issues that could prevent the candidate from getting shortlisted.

    Return them inside redFlags.

    Examples:
    - No quantified achievements.
    - Missing certifications.
    - Weak keyword coverage.
    - Lack of leadership experience.
    - Resume lacks measurable impact.

    Return between 2 and 5 red flags.

    Keep each flag short and actionable.

    Generate ATS-optimized resume improvements.

    professionalSummary:
    - Write a professional summary tailored to the job description.
    - Keep it between 3 and 5 lines.

    experienceBullets:
    - Rewrite the candidate's experience into stronger achievement-oriented bullet points.
    - Include metrics whenever possible.
    - Return between 3 and 8 bullets.

    skills:
    - Suggest important skills to include.
    - Return 5 to 10 skills.

    keywordSuggestions:
    - Suggest important ATS keywords missing from the resume.
    - Return 5 to 10 keywords.

    achievementSuggestions:
    - Suggest measurable achievements or quantified statements that would strengthen the resume.
    - Return between 3 and 5 suggestions.

    `
        },

        {
          role: "user",
          content: `
    RESUME:

    ${resumeText}

    JOB DESCRIPTION:

    ${jobDescription}
    `
        }
      ],

      response_format: {
        type: "json_object"
      }
    });

    const result = JSON.parse(
      completion.choices[0].message.content!
    );

    console.log("RESUME REWRITE:");
    console.log(result.resumeRewrite);

    console.log("SECTION SCORES:");
    console.log(result.sectionScores);

    console.log("OPENAI RESULT:");
    console.log(result);

    return NextResponse.json(result);

  } catch (error: any) {

  console.error("FULL ERROR:");
  console.error(error);

  return NextResponse.json(
    {
      success: false,
      error: String(error),
    },
    {
      status: 500,
    }
  );
}
}