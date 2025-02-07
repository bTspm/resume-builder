export interface ProjectData {
  company: string;
  location: string;
  role: string;
  period: string;
  project_name: string;
  tech_stack: string[];
  achievements: string[];
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

// Add this to help with type checking
export interface RawProjectData {
  company: string;
  location: string;
  role: string;
  period: string;
  projects: Project[];
}

export interface Project {
  project_name: string;
  tech_stack:   string[];
  achievements: string[];
}


export interface TechnicalSkills {
  languages: string[];
  frameworks: string[];
  databases: string[];
  cloud_devops: string[];
  development_tools: string[];
}

export interface ProjectWithAchievements {
  name: string;
  selected_achievements: string[];
}

export interface GeneratedResume {
  summary: string;
  technical_skills: TechnicalSkills;
  projects: ProjectWithAchievements[];
}



