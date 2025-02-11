export interface ProfessionalInfo {
  company: string;
  location: string;
  total_experience: string;
  period: string;
}

export interface Architecture {
  type?: string;
  pattern?: string;
  migration?: string;
  availability?: string;
}

export interface TechnicalImplementation {
  backend: {
    technology: string;
    service_type?: string;
    api?: string;
    version_migration?: string;
  }[];
  frontend: {
    framework: string;
    language?: string;
  }[];
  databases: {
    type?: string;
    cache?: string;
    search?: string;
  }[];
  cloud?: {
    platform: string;
    services: string[];
  };
  devops?: {
    ci_cd?: string[];
    monitoring?: string[];
  };
  security?: {
    auth: string;
  }[];
  background_processing?: string[];
}

export interface Project {
  name: string;
  period: string;
  type: string;
  architecture: Architecture[];
  technical_implementation: TechnicalImplementation;
  key_features: string[];
}

export interface CoreSkills {
  architecture: string[];
  security: string[];
  reliability: string[];
  development: string[];
  monitoring: {
    tools: string[];
  };
  testing: {
    frameworks: string[];
  };
  devops: string[];
  productivity_tools: string[];
}

export interface Leadership {
  technical: string[];
  management: string[];
}

export interface ResumeData {
  professional_info: ProfessionalInfo;
  projects: Project[];
  core_skills: CoreSkills;
  leadership: Leadership;
}

export interface GeneratedAchievement {
  achievement: string;
  relevance_score: number;
}

export interface GeneratedProject {
  name: string;
  selected_achievements: GeneratedAchievement[];
}

export interface GeneratedResume {
  summary: string;
  cover_letter: string;
  projects: GeneratedProject[];
}

export interface ClaudeConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface ClaudeResponse {
  completion: string;
  stop_reason: string | null;
  model: string;
}
