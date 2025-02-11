import { ClaudeAPI } from "../api/claude";
import { OpenAIAPI } from "../api/openai";
import { GeneratedResume, ResumeData } from "../types/project";
import { generateResumePrompt } from "../prompts/resumePrompts";
import { AIProvider, AIProviderType } from "../types/ai-provider";

export class ResumeGeneratorService {
  private aiProvider: AIProvider;

  constructor(providerType: AIProviderType = 'claude') {
    this.aiProvider = this.createProvider(providerType);
  }

  private createProvider(providerType: AIProviderType): AIProvider {
    const apiKey = providerType === 'claude'
      ? import.meta.env.VITE_CLAUDE_API_KEY
      : import.meta.env.VITE_OPENAI_API_KEY;

    try {
      switch (providerType) {
        case 'claude':
          return new ClaudeAPI({
            apiKey,
            model: 'claude-3-opus-20240229',
            temperature: 0.7
          });
        case 'openai':
          return new OpenAIAPI({
            apiKey,
            model: 'gpt-4-turbo-preview',
            temperature: 0.7
          });
        default:
          throw new Error(`Unsupported AI provider: ${providerType}`);
      }
    } catch (error) {
      console.error('Error creating AI provider:', error);
      throw error;
    }
  }

  async generateResume(resumeData: ResumeData, jobDescription: string): Promise<GeneratedResume> {
    try {
      console.log('Generating resume with data:', {
        projectsCount: resumeData.projects.length,
        hasProjects: Boolean(resumeData.projects),
        projectNames: resumeData.projects.map(p => p.name)
      });

      if (!Array.isArray(resumeData.projects)) {
        throw new Error('Projects data is not properly structured as an array');
      }

      const prompt = generateResumePrompt(jobDescription, resumeData.projects);
      console.log('Generated prompt:', prompt);

      const response = await this.aiProvider.generateContent(prompt);
      console.log('Raw AI response:', response.completion);

      try {
        const cleanedResponse = response.completion
          .replace(/^```json\s*/, '')
          .replace(/```$/, '')
          .trim();

        let parsedResponse: GeneratedResume;

        try {
          parsedResponse = JSON.parse(cleanedResponse);
        } catch (parseError) {
          console.error('Initial parse error:', parseError);
          // Try to clean the response further
          const jsonStart = cleanedResponse.indexOf('{');
          const jsonEnd = cleanedResponse.lastIndexOf('}') + 1;
          if (jsonStart >= 0 && jsonEnd > jsonStart) {
            const jsonString = cleanedResponse.slice(jsonStart, jsonEnd);
            parsedResponse = JSON.parse(jsonString);
          } else {
            throw parseError;
          }
        }

        // Sort achievements by relevance score
        parsedResponse.projects = parsedResponse.projects.map(project => ({
          ...project,
          selected_achievements: project.selected_achievements
            .sort((a, b) => b.relevance_score - a.relevance_score)
        }));

        return parsedResponse;
      } catch (parseError) {
        console.error('Parse Error:', parseError);
        console.error('Response that failed parsing:', response.completion);
        throw new Error(`Failed to parse API response: ${parseError.message}`);
      }
    } catch (error) {
      console.error('Generation Error:', error);
      throw error;
    }
  }
}
