import { ProjectData } from "../types/project.ts";

export const generateResumePrompt = (
  jobDescription: string,
  projects: ProjectData[]
): string => {
  const systemMessage = `You are a top-tier resume writer skilled in crafting ATS-compliant resumes tailored to job descriptions.`;

  return `${systemMessage}
Your task:
1. Create a compelling 65-75 word professional summary based on job description and project details.
   - Highlight 9+ years of experience in full-stack development, cloud computing, and leadership within regulated industries.
   - Use specific job-relevant keywords from the job description (such as "API integration," "cross-browser compatibility," "agile development").
   - Showcase quantified outcomes (percentages, time savings, operational improvements).
   - Emphasize collaboration, leadership, and delivering impactful user experiences.

2. Select exactly 6-7 diverse achievements for each project:
   - Cover technical complexity, process improvements, business outcomes, and leadership or mentoring contributions.
   - Ensure each achievement includes:
     * Strong action verbs (e.g., led, optimized, automated).
     * Measurable business outcomes (revenue, customer satisfaction, cost reduction).
     * Keywords aligned with the job description.
   - Avoid repeating similar types of achievements.

Job Description:
${jobDescription}

Project Details:
${projects
    .map(
      (project) => `
Company: ${project.company}
Role: ${project.role}
Project: ${project.project_name}
Tech Stack: ${project.tech_stack.join(', ')}

Achievements:
${project.achievements.map((achievement) => `- ${achievement}`).join('\n')}
`
    )
    .join('\n\n')}

Validation Checklist:
- Summary length is between 65-75 words.
- Each project has exactly 6-7 achievements.
- Achievements contain action verbs, metrics, and technical insights.
- Points closely align with job requirements.
- The format is valid JSON.

Return ONLY the following JSON:
{
  "summary": "Generated 65-75 word summary here",
  "projects": [
    {
      "name": "project name",
      "selected_achievements": [
        "achievement1",
        "achievement2",
        "achievement3",
        "achievement4",
        "achievement5",
        "achievement6",
        "achievement7"
      ]
    }
  ]
}`;
};
