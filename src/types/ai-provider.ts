import { ClaudeResponse } from "./project.ts";

export type AIProviderType = 'claude' | 'openai' ;

export interface AIProvider {
  generateContent(prompt: string): Promise<ClaudeResponse>;
}

export interface AIProviderInfo {
  id: AIProviderType;
  name: string;
}

export const AI_PROVIDERS: AIProviderInfo[] = [
  {
    id: 'claude',
    name: 'Claude AI',
  },
  {
    id: 'openai',
    name: 'GPT-4',
  }
];
