import Anthropic from '@anthropic-ai/sdk';
import { ClaudeConfig, ClaudeResponse } from '../types/project';

export class ClaudeAPI {
  private client: Anthropic;
  private model: string;
  private maxTokens: number;
  private temperature: number;

  constructor(config: ClaudeConfig) {
    try {
      this.client = new Anthropic({
        apiKey: config.apiKey,
        dangerouslyAllowBrowser: true
      });
      this.model = config.model || 'claude-3-opus-20240229';
      this.maxTokens = config.maxTokens || 4096;
      this.temperature = config.temperature || 0.7;

      console.log('Claude API initialized with model:', this.model);
    } catch (error) {
      console.error('Error initializing Claude API:', error);
      throw error;
    }
  }

  async generateContent(prompt: string): Promise<ClaudeResponse> {
    try {
      console.log('Sending prompt to Claude:', prompt);

      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
        messages: [
          {
            role: 'user',
            content: prompt + "\nPlease format your response as valid JSON without any additional text or markdown.",
          }
        ],
        system: "You are a resume optimization assistant. Always respond with valid JSON that matches the specified format exactly.",
      });

      console.log('Raw Claude response:', response);
      console.log('Response content:', response.content[0].text);

      // Ensure the response is properly formatted JSON
      const text = response.content[0].text.trim();

      // Try to parse the response to validate it's proper JSON
      try {
        JSON.parse(text);
      } catch (parseError) {
        console.error('Invalid JSON response from Claude:', text);
        throw new Error('Response is not valid JSON');
      }

      return {
        completion: text,
        stop_reason: response.stop_reason || null,
        model: response.model,
      };
    } catch (error: any) {
      console.error('Claude API Error:', error);
      console.error('Error details:', {
        message: error.message,
        type: error.type,
        status: error.status,
      });
      throw {
        message: error.message || 'Error communicating with Claude AI',
        type: error.type || 'UNKNOWN_ERROR',
        status: error.status,
      };
    }
  }
}
