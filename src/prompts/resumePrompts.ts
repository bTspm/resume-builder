import { Project } from "../types/project";

export const generateResumePrompt = (
  jobDescription: string,
  projects: Project[]
): string => {
  const systemMessage = `You are an expert ATS complaint resume writer specializing in technical resumes for Senior Software Developer. Your goal is to create impactful, metrics-driven achievements that demonstrate both technical expertise and business value.`;

  return `${systemMessage}

Your task:
1. First, analyze the job description to identify:
   - Primary technology stack (e.g., Node.js, Java, Ruby, Typescript)
   - Identify frameworks (e.g., Rails, React, Spring)
   - Key technical requirements (e.g., REST APIs, GraphQL, specific databases, ETL pipelines)
   - Important business context (e.g., financial systems)
   - Important devops functions(e.g., bamboo, github actions, CDK, CFT's) 

2. Create a compelling 65-75 word professional summary that:
   - 9+ years of experience
   - Leads with experience in the job's primary technology stack
   - Emphasizes relevant architectural patterns
   - Demonstrates progression in responsibilities
   - Shows business value aligned with job context
   - Includes relevant keywords naturally

3. For each project, generate 6 high-impact achievements following these rules:
   A. Technology Alignment Scoring (0-100):
      - Direct match with job's primary stack: 40 points
      - Match with job's secondary requirements: 30 points
      - Architectural/pattern match: 20 points
      - Impact metrics: 10 points

   B. Achievement Rephrasing Rules:
      If achievement used same technology as job requires:
        - Lead with that technology
        - Emphasize specific ecosystem knowledge
        Examples by technology:

      Common principles for any technology:
        - Lead with the job's primary technology
        - Emphasize ecosystem-specific patterns
        - Focus on relevant frameworks and tools
        - Maintain core metrics and impact

   C. Project-Specific Guidelines:
      For projects using job's primary technology:
        - Highlight deep ecosystem knowledge
        - Show mastery of best practices
        - Emphasize specific tools and patterns

      For projects using different technologies:
        - Focus on architectural decisions
        - Emphasize business outcomes
        - Show parallel patterns to required stack

      Technology-Specific Transformations:

      When job requires Node.js/TypeScript:
        - Emphasize: Modern JavaScript, TypeScript, AWS Lambda, serverless
        - Example: "Built serverless TypeScript microservices handling 10K req/sec"

      When job requires Java:
        - Emphasize: Spring Boot, enterprise patterns, microservices
        - Example: "Architected Spring Boot microservices processing 1M+ transactions"

      When job requires Ruby:
        - Emphasize: Rails, Ruby gems, ActiveRecord, PostgreSQL
        - Example: "Developed Rails APIs with optimized ActiveRecord queries"

      When job requires Python:
        - Emphasize: Django/Flask, Python packages, data processing
        - Example: "Built scalable Python microservices for data analytics"

      Common elements across all transformations:
        - Maintain core achievement metrics
        - Keep architectural complexity
        - Preserve business impact
        - Focus on relevant patterns

4. Achievement Format:
   - Use STAR format (Situation, Task, Action, Result)
   - Include specific metrics
   - Show business impact
   - Limit to 10-15 words
   - Pattern: [Action] [technical initiative] using [relevant tech/pattern] resulting in [measurable outcome]
   
5. **Compose an ATS-Compliant Cover Letter**:
   - Structure:
     - **Opening Paragraph**:
       - State the specific position you're applying for
       - Express enthusiasm for the role and company
     - **Body Paragraphs**:
       - Highlight relevant experience and achievements
       - Align your skills with the job requirements
       - Use keywords from the job description
     - **Closing Paragraph**:
       - Reiterate your interest in the position
       - Mention any attached documents (e.g., resume, portfolio)
       - Express a desire for an interview or further discussion
   - Tips:
     - Keep the cover letter concise, ideally one page and 250-275 words
     - Use a professional tone and language
     - Ensure the document is ATS-friendly by avoiding complex formatting and using standard fonts


Job Description:
${jobDescription}

Project Details:
${projects.map(project => `
Project: ${project.name}
Period: ${project.period}
Type: ${project.type}
Architecture: ${JSON.stringify(project.architecture)}
Technical Implementation: ${JSON.stringify(project.technical_implementation)}
Key Features: ${project.key_features.join(', ')}
`).join('\n\n')}

Return ONLY valid JSON in this format:
{
  "summary": "Professional summary here",
  "cover_letter": "ATS-compliant cover letter here"
  "projects": [
    {
      "name": "Project Name",
      "selected_achievements": [
        {
          "achievement": "Achievement using STAR format with metrics",
          "relevance_score": 0.95
        }
      ]
    }
  ]
}`;
};
