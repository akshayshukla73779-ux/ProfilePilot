"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";



export default function CopilotPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const loadingMessages = [
  "📄 Extracting resume...",
  "🔍 Reading job description...",
  "🧠 Comparing skills...",
  "🎯 Calculating ATS score...",
  "✨ Generating recommendations..."
    ];

  const handleAnalyze = async () => {
    if (!resumeFile) {
        alert("Please upload a resume.");
        return;
    }

    setIsLoading(true);
    setLoadingStep(0);

    const interval = setInterval(() => {
    setLoadingStep((prev) => {
        if (prev >= loadingMessages.length - 1) {
        return prev;
        }

        return prev + 1;
    });
    }, 1000);

    try {
        clearInterval(interval);
        const formData = new FormData();

        formData.append("resume", resumeFile);
        formData.append(
            "jobDescription",
            jobDescription
        );
        console.log("JOB DESCRIPTION FROM FRONTEND:");
        console.log(jobDescription);        
        const response = await fetch(
        "/api/copilot-analyze",
        {
            method: "POST",
            body: formData,
        }
        );

    const data = await response.json();

    console.log("OPENAI RESULT:");
    console.log(data);

    setAnalysisResult(data);

    } catch (error) {
        clearInterval(interval);

        console.error(error);

    }

    setIsLoading(false);
    };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        AI Job Application Copilot
      </h1>

      {/* Resume Upload */}
      <div className="mb-8">
        <label className="block text-lg font-medium mb-3">
          Upload Resume (PDF)
        </label>

        <input
            type="file"
            accept=".pdf"
            className="w-full border rounded-xl p-3"
            onChange={(e) => {
            if (e.target.files?.[0]) {
            setResumeFile(e.target.files[0]);
            }
            }}
        />
        {resumeFile && (
            <p className="mt-2 text-sm text-muted-foreground">
                Selected file: {resumeFile.name}
            </p>
            )}
      </div>

      {/* Job Description */}
      <div className="mb-8">
        <label className="block text-lg font-medium mb-3">
          Paste Job Description
        </label>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full border rounded-xl p-4 min-h-[250px]"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="bg-black text-white px-8 py-4 rounded-xl"
        >
        {isLoading
            ? "Analyzing..."
            : "Analyze Resume Match"}
        </button>
    {isLoading && (

    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mt-8 border rounded-3xl p-8 bg-card"
    >

    <div className="flex items-center gap-4">

        <motion.div
        animate={{
            rotate: 360
        }}
        transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear"
        }}
        className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />

        <motion.h3
        key={loadingStep}
        initial={{
            opacity: 0,
            y: 20
        }}
        animate={{
            opacity: 1,
            y: 0
        }}
        className="text-lg"
        >
        {loadingMessages[loadingStep]}
        </motion.h3>

    </div>

    </motion.div>

    )}
    {analysisResult && (

        <div className="mt-12 border rounded-2xl p-8">

            <h2 className="text-3xl font-bold mb-6">
            Analysis Result
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.8,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8,
                        type: "spring"
                    }}
                    whileHover={{
                        scale: 1.03
                    }}
                    className="border rounded-3xl p-8 bg-card"
                    >

                    <h3 className="text-xl font-semibold text-center mb-8">
                    ATS Score
                    </h3>

                    <div className="flex flex-col items-center">

                        <div className="w-48 h-48 mx-auto">

                            <CircularProgressbar
                                value={analysisResult.atsScore}
                                text={`${analysisResult.atsScore}%`}
                                styles={buildStyles({
                                    pathColor: "#38bdf8",
                                    textColor: "#ffffff",
                                    trailColor: "#1f2937",
                                    textSize: "18px"
                                })}
                            />

                        </div>

                    </div>

                </motion.div>


                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.8,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8,
                        type: "spring"
                    }}
                    whileHover={{
                        scale: 1.03
                    }}
                    className="border rounded-3xl p-8 bg-card"
                    >

                    <h3 className="text-xl font-semibold text-center mb-8">
                        
                    Interview Probability
                    </h3>

                    <div className="w-48 h-48 mx-auto">

                    <CircularProgressbar
                        value={analysisResult.interviewProbability}
                        text={`${analysisResult.interviewProbability}%`}
                        styles={buildStyles({
                        pathColor: "#06b6d4",
                        textColor: "#ffffff",
                        trailColor: "#1f2937"
                        })}
                    />

                    </div>

                </motion.div>

                </div>
        {/* Section Scores */}

        <div className="mb-12">

            <h2 className="text-2xl font-bold mb-6">
                Section-wise Analysis
            </h2>

        <div className="space-y-6">

            {/* Experience */}

            <div>

            <div className="flex justify-between mb-2">

                <span>Experience Match</span>

                <span>
                {analysisResult.sectionScores.experience}%
                </span>

            </div>

            <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">

                <motion.div
                initial={{
                    width: 0
                }}
                animate={{
                    width: `${analysisResult.sectionScores.experience}%`
                }}
                transition={{
                    duration: 1
                }}
                className="h-full bg-green-500 rounded-full"
                />

            </div>

            </div>


            {/* Skills */}

            <div>

            <div className="flex justify-between mb-2">

                <span>Skills Match</span>

                <span>
                {analysisResult.sectionScores.skills}%
                </span>

            </div>

            <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">

                <motion.div
                initial={{
                    width: 0
                }}
                animate={{
                    width: `${analysisResult.sectionScores.skills}%`
                }}
                transition={{
                    duration: 1,
                    delay: 0.1
                }}
                className="h-full bg-blue-500 rounded-full"
                />

            </div>

            </div>


            {/* Education */}

            <div>

            <div className="flex justify-between mb-2">

                <span>Education Match</span>

                <span>
                {analysisResult.sectionScores.education}%
                </span>

            </div>

            <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">

                <motion.div
                initial={{
                    width: 0
                }}
                animate={{
                    width: `${analysisResult.sectionScores.education}%`
                }}
                transition={{
                    duration: 1,
                    delay: 0.2
                }}
                className="h-full bg-purple-500 rounded-full"
                />

            </div>

            </div>


            {/* Keywords */}

            <div>

            <div className="flex justify-between mb-2">

                <span>Keyword Coverage</span>

                <span>
                {analysisResult.sectionScores.keywords}%
                </span>

            </div>

            <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">

                <motion.div
                initial={{
                    width: 0
                }}
                animate={{
                    width: `${analysisResult.sectionScores.keywords}%`
                }}
                transition={{
                    duration: 1,
                    delay: 0.3
                }}
                className="h-full bg-yellow-500 rounded-full"
                />

            </div>

            </div>


            {/* Achievements */}

            <div>

            <div className="flex justify-between mb-2">

                <span>Achievements</span>

                <span>
                {analysisResult.sectionScores.achievements}%
                </span>

            </div>

            <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">

                <motion.div
                initial={{
                    width: 0
                }}
                animate={{
                    width: `${analysisResult.sectionScores.achievements}%`
                }}
                transition={{
                    duration: 1,
                    delay: 0.4
                }}
                className="h-full bg-red-500 rounded-full"
                />

            </div>

            </div>


            {/* Formatting */}

            <div>

            <div className="flex justify-between mb-2">

                <span>Formatting</span>

                <span>
                {analysisResult.sectionScores.formatting}%
                </span>

            </div>

            <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">

                <motion.div
                initial={{
                    width: 0
                }}
                animate={{
                    width: `${analysisResult.sectionScores.formatting}%`
                }}
                transition={{
                    duration: 1,
                    delay: 0.5
                }}
                className="h-full bg-cyan-500 rounded-full"
                />

            </div>

            </div>

        </div>

        </div>

        {/* Recruiter Perspective */}

            <motion.div
            initial={{
                opacity: 0,
                y: 40
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.8
            }}
            className="mb-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-8 backdrop-blur-xl"
            >

            <div className="flex items-center gap-3 mb-6">

                <div className="text-3xl">
                👔
                </div>

                <h2 className="text-2xl font-bold">
                Recruiter's Perspective
                </h2>

            </div>

            <p className="text-zinc-300 leading-8 text-lg">
                {analysisResult.recruiterPerspective}
            </p>

            </motion.div>
        {/* AI Resume Rewrite */}

        <div className="mb-12">

            <h2 className="text-3xl font-bold mb-8">
                ✨ AI Resume Rewrite
            </h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-8 mb-8"
                >

                <h3 className="text-2xl font-bold mb-4">
                    Professional Summary
                </h3>

                <p className="leading-8 text-zinc-300">
                    {analysisResult.resumeRewrite.professionalSummary}
                </p>

            </motion.div>
        
            <h3 className="text-2xl font-bold mb-6">
                Experience Improvements
            </h3>

            <div className="space-y-4 mb-10">

                {analysisResult.resumeRewrite.experienceBullets.map(
                    (item: string, index: number) => (

                    <motion.div
                        key={index}
                        initial={{
                        opacity: 0,
                        x: -30
                        }}
                        animate={{
                        opacity: 1,
                        x: 0
                        }}
                        transition={{
                        delay: index * 0.15
                        }}
                        className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5"
                    >
                        ✓ {item}
                    </motion.div>

                    )
                )}

            </div>
            <h3 className="text-2xl font-bold mb-6">
                Skills to Add
            </h3>

            <div className="flex flex-wrap gap-3 mb-10">

                {analysisResult.resumeRewrite.skills.map(
                    (item: string, index: number) => (

                    <motion.div
                        key={index}
                        initial={{
                        opacity: 0,
                        scale: 0
                        }}
                        animate={{
                        opacity: 1,
                        scale: 1
                        }}
                        transition={{
                        delay: index * 0.1
                        }}
                        className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20"
                    >
                        {item}
                    </motion.div>

                    )
                )}

            </div>
                <h3 className="text-2xl font-bold mb-6">
                    Keywords to Include
                </h3>

                <div className="flex flex-wrap gap-3 mb-10">

                    {analysisResult.resumeRewrite.keywordSuggestions.map(
                        (item: string, index: number) => (

                        <motion.div
                            key={index}
                            className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20"
                        >
                            {item}
                        </motion.div>

                        )
                    )}

                </div>
                <h3 className="text-2xl font-bold mb-6">
            Achievement Suggestions
            </h3>

            <div className="space-y-4">

            {analysisResult.resumeRewrite.achievementSuggestions.map(
                (item: string, index: number) => (

                <motion.div
                    key={index}
                    initial={{
                    opacity: 0,
                    y: 20
                    }}
                    animate={{
                    opacity: 1,
                    y: 0
                    }}
                    transition={{
                    delay: index * 0.2
                    }}
                    className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5"
                >
                    💡 {item}
                </motion.div>

                )
            )}

            </div>

            </div>
        {/* Red Flags */}

        <div className="mb-12">

            <h2 className="text-2xl font-bold mb-6">
                🚨 Red Flags
            </h2>

        <div className="space-y-4">

            {analysisResult.redFlags.map(
            (item: string, index: number) => (

                <motion.div
                key={index}
                initial={{
                    opacity: 0,
                    x: -30
                }}
                animate={{
                    opacity: 1,
                    x: 0
                }}
                transition={{
                    delay: index * 0.15
                }}
                whileHover={{
                    scale: 1.02
                }}
                className="border border-red-500/30 bg-red-500/10 rounded-2xl p-5"
                >

                <div className="flex items-center gap-3">

                    <span className="text-2xl">
                    ⚠️
                    </span>

                    <span className="text-lg">
                    {item}
                    </span>

                </div>

                </motion.div>

            )
            )}

        </div>

    </div>
        {/* Strengths */}

        <div className="mb-8">

            <h3 className="text-2xl font-bold mb-5">
                Strengths
            </h3>

            <div className="grid gap-4 mb-10">

                {analysisResult.strengths.map(
                (item: string, index: number) => (

                    <motion.div
                        key={index}
                        initial={{
                            opacity: 0,
                            x: -100,
                            scale: 0.8
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1
                        }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.3
                        }}
                        whileHover={{
                            scale: 1.03
                        }}
                        className="border border-green-500/30 bg-green-500/10 rounded-2xl p-4"
                        >
                        ✅ {item}
                        </motion.div>

                )
                )}

            </div>

            </div>


        {/* Weaknesses */}

        <div className="mb-8">

        <h3 className="text-xl font-bold mb-4">
            Weaknesses
        </h3>

        <ul className="space-y-2">

            {analysisResult.weaknesses.map(
            (item: string, index: number) => (

                <motion.div
                    key={index}
                    initial={{
                        opacity: 0,
                        x: 100,
                        scale: 0.8
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1
                    }}
                    transition={{
                        duration: 0.8,
                        delay: index * 0.3
                    }}
                    whileHover={{
                        scale: 1.03
                    }}
                    className="border border-red-500/30 bg-red-500/10 rounded-2xl p-4"
                    >
                    ❌ {item}
                    </motion.div>

            )
            )}

        </ul>

        </div>


        {/* Missing Keywords */}

        <div className="mb-8">

        <h3 className="text-xl font-bold mb-4">
            Missing Keywords
        </h3>

        <div className="flex flex-wrap gap-3">

            {analysisResult.missingKeywords.map(
                (item: string, index: number) => (

                <motion.div
                    key={index}
                    initial={{
                    opacity: 0,
                    scale: 0
                    }}
                    animate={{
                    opacity: 1,
                    scale: 1
                    }}
                    transition={{
                    delay: index * 0.1
                    }}
                    whileHover={{
                    scale: 1.1
                    }}
                    className="px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30"
                >
                    {item}
                </motion.div>

                )
            )}

            </div>

        </div>


        {/* Improvements */}

        <div>

        <h3 className="text-xl font-bold mb-4">
            Improvement Suggestions
        </h3>

        <ul className="space-y-2">

            {analysisResult.improvements.map(
            (item: string, index: number) => (

                <motion.div
                    key={index}
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.7,
                        delay: index * 0.25
                    }}
                    whileHover={{
                        scale: 1.02
                    }}
                    className="border border-blue-500/30 bg-blue-500/10 rounded-2xl p-4"
                    >
                    💡 {item}
                    </motion.div>

            )
            )}

        </ul>

        </div>

        </div>

        )}

    </div>
  );
}