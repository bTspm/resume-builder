// src/api/openai.ts
import OpenAI from 'openai';
import { ClaudeResponse } from '../types/project';

export interface OpenAIConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export class OpenAIAPI {
  private client: OpenAI;
  private model: string;
  private maxTokens: number;
  private temperature: number;

  constructor(config: OpenAIConfig) {
    this.client = new OpenAI({
      apiKey: config.apiKey,
      dangerouslyAllowBrowser: true
    });
    this.model = config.model || 'gpt-4o-mini';
    this.maxTokens = config.maxTokens || 2048;
    this.temperature = config.temperature || 0.7;
  }

  async generateContent(prompt: string): Promise<ClaudeResponse> {
    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
        messages: [{ role: 'user', content: prompt }],
      });

      // Format OpenAI response to match Claude response structure
      return {
        completion: response.choices[0].message.content || '',
        stop_reason: response.choices[0].finish_reason || null,
        model: response.model,
      };
    } catch (error: any) {
      console.error('OpenAI API Error:', error);
      throw {
        message: error.message || 'Error communicating with OpenAI',
        type: error.status || 'UNKNOWN_ERROR',
        status: error.statusCode,
      };
    }
  }
}
