// Modified projectLoader.ts
import yaml from 'js-yaml';
import { ResumeData } from '../types/project';
import javaYaml from '../data/projects/java.yml?raw';
import nodeYaml from '../data/projects/node.yml?raw';
import rubyYaml from '../data/projects/ruby.yml?raw';

export class ProjectLoader {
  static async loadResumeData(techStack: string = 'java'): Promise<ResumeData> {
    try {
      console.log('Loading resume data for tech stack:', techStack);

      // Select the appropriate YAML file based on tech stack
      let yamlContent;
      switch (techStack) {
        case 'java':
          yamlContent = javaYaml;
          break;
        case 'node':
          yamlContent = nodeYaml;
          break;
        case 'ruby':
          yamlContent = rubyYaml;
          break;
        default:
          throw new Error(`Unsupported tech stack: ${techStack}`);
      }

      // Parse the YAML content
      const data = yaml.load(yamlContent) as ResumeData;

      // Validate the parsed data
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid YAML data structure');
      }

      if (!Array.isArray(data.projects)) {
        throw new Error('Projects data is not an array');
      }

      console.log('Loaded resume data:', {
        techStack,
        projectsCount: data.projects.length,
        hasProjects: Boolean(data.projects),
        projectNames: data.projects.map(p => p.name)
      });

      return data;
    } catch (error) {
      console.error('Error in loadResumeData:', error);
      throw new Error(`Failed to load resume data: ${error.message}`);
    }
  }
}
