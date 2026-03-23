import { NextResponse, NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const geminiModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

async function fetchRepoFile(owner: string, repo: string, path: string): Promise<string | null> {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3.raw',
        },
    });
    if (!res.ok) return null;
    return res.text();
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json({ error: 'GITHUB_TOKEN is not configured' }, { status: 500 });
    }

    const { repoUrl } = await req.json();

    if (!repoUrl) {
      return NextResponse.json({ error: 'GitHub URL is required' }, { status: 400 });
    }

    const urlParts = new URL(repoUrl).pathname.split('/').filter(Boolean);
    if (urlParts.length < 2) {
        return NextResponse.json({ error: 'Invalid GitHub URL' }, { status: 400 });
    }
    const [owner, repo] = urlParts;

    let repoData, readmeContent, packageJsonContent;
    try {
        [repoData, readmeContent, packageJsonContent] = await Promise.all([
            fetch(`https://api.github.com/repos/${owner}/${repo}`, {
                headers: {
                    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                },
            }).then(res => {
                if (!res.ok) throw new Error(`GitHub API error for repo data: ${res.statusText}`);
                return res.json();
            }),
            fetchRepoFile(owner, repo, 'README.md'),
            fetchRepoFile(owner, repo, 'package.json')
        ]);
    } catch (error: any) {
        console.error('GitHub API fetch error:', error.message);
        return NextResponse.json({ error: `Failed to fetch from GitHub: ${error.message}` }, { status: 500 });
    }
    
    let technologies: string[] = [];
    if (packageJsonContent) {
        try {
            const pkg = JSON.parse(packageJsonContent);
            technologies = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.devDependencies || {}));
        } catch (e) {
            console.warn('Could not parse package.json');
        }
    } else if (repoData.language) {
        technologies = [repoData.language];
    }
    
    const prompt = `
        Analyze the following GitHub repository information and generate a project summary for a portfolio.
        Your response must be a valid JSON object with the following fields: "title", "slug", "description", "technologies".

        Repository Name: ${repoData.name}
        Repository Description: ${repoData.description}
        Main Language: ${repoData.language}
        Technologies from package.json: ${technologies.join(', ') || 'Not available'}
        README.md content:
        ---
        ${readmeContent || 'Not available'}
        ---

        Based on the information above, please generate the following fields in a clean, professional tone:
        1.  **title**: A concise and engaging title for the project.
        2.  **slug**: A URL-friendly slug based on the title.
        3.  **description**: A 2-3 sentence summary of the project's purpose and key features.
        4.  **technologies**: A comma-separated list of the most important technologies used.
    `;

    let text;
    try {
        const model = genAI.getGenerativeModel({ model: geminiModel });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();

        if (!text) {
            throw new Error('Empty response from AI');
        }
    } catch (error: any) {
        console.error('Gemini API error:', error.message);
        return NextResponse.json({ error: `Failed to generate summary from AI using model "${geminiModel}": ${error.message}` }, { status: 500 });
    }
    
    let parsedSummary;
    try {
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        parsedSummary = JSON.parse(jsonString);
    } catch (error: any) {
        console.error('JSON parsing error:', error.message);
        return NextResponse.json({ error: `Failed to parse AI response: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({
        ...parsedSummary,
        githubUrl: repoUrl,
        projectUrl: repoData.homepage || '',
        imageUrl: '', // Leave empty for user to fill
    }, { status: 200 });

  } catch (error: any) {
    console.error('Overall error in analyze-repo:', error.message);
    return NextResponse.json({ error: `An unexpected error occurred: ${error.message}` }, { status: 500 });
  }
}
