import yaml from 'js-yaml';
import { ProjectData, RawProjectData } from '../types/project';
import projectYaml from '../data/projects/liberty_mutual.yml?raw';

export class ProjectLoader {
  static async loadProject(): Promise<ProjectData[]> {
    try {
      console.log('Loading project data...');

      // Parse the imported YAML content
      const data = yaml.load(projectYaml) as RawProjectData;
      console.log('Parsed YAML data:', data);


      return data.projects.map((project) => ({
        company: data.company,
        location: data.location,
        role: data.role,
        period: data.period,
        project_name: project.project_name,
        tech_stack: project.tech_stack || [],
        achievements: project.achievements || []
      }));
    } catch (error) {
      console.error('Error in loadProject:', error);
      throw new Error(`Failed to load project: ${error.message}`);
    }
  }

  static async loadAllProjects(): Promise<ProjectData[]> {
    try {
      return await this.loadProject();
    } catch (error) {
      console.error('Error in loadAllProjects:', error);
      throw error;
    }
  }
}
