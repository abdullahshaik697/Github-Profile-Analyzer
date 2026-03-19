import Groq from "groq-sdk";
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

interface AnalysisResult {
    primaryLanguage: string;
    skillLevel: "beginner" | "intermediate" | "expert";
    ratings: {
        languages: number;
        projects: number;
        social: number;
        consistency: number;
        codeQuality: number;
        overall: number;
    };
    strengths: string[];
    improvements: string[];
    recommendation: string;
}

export const analyzeWithAI = async (githubData: any): Promise<AnalysisResult> => {

    const prompt= `
    
    You are an expert developer portfolio analyzer.
    
    Analyze this GitHub profile data and return a JSON response only, no extra text.
    
    GitHub Data:
    ${JSON.stringify(githubData, null, 2)}
    
    Return ONLY this JSON structure:
    {
        "primaryLanguage": "most used language",
        "skillLevel": "beginner or intermediate or expert",
        "ratings": {
            "languages": 0-10,
            "projects": 0-10,
            "social": 0-10,
            "consistency": 0-10,
            "codeQuality": 0-10,
            "overall": 0-10
        },
        "strengths": ["strength 1", "strength 2", "strength 3"],
        "improvements": ["improvement 1", "improvement 2", "improvement 3"],
        "recommendation": "detailed recommendation for this developer"
    }
    
    Rating criteria:
    - languages: variety and depth of programming languages
    - projects: number and quality of projects
    - social: followers, following, community presence
    - consistency: repo activity and descriptions
    - codeQuality: repo names, descriptions, variety of projects
    - overall: average of all ratings
    `

    const response = await groq.chat.completions.create ({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt,
            }
        ],
        temperature: 0.7,
        max_tokens: 1000,
    })

    const content = response.choices[0].message.content!;

    const jsonMatch = content.match(/\{[\s\S]*\}/)

     if (!jsonMatch) {
        throw new Error("AI did not return valid JSON");
    }

    const result: AnalysisResult = JSON.parse(jsonMatch[0])
    return result
}