export enum ProjectCategory {
  UX_UI = 'UX/UI Design',
  AUTOMATION = 'Automation & AI',
  WEB_DEV = 'Web Development',
  GAME_DEV = 'Game Development'
}

export interface TechStack {
  name: string;
  icon: string; // Lucide icon name or simple string identifier
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  description: string;
  image: string; // Placeholder URL
  technologies: string[];
  link?: string; // URL to live project or prototype
  challenges?: string;
  solution?: string;
  details?: {
    type: 'design' | 'code' | 'hybrid';
    artifacts?: string[]; // URLs to wireframes/screenshots
    codeSnippet?: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}