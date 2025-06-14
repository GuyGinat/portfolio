export type ContentType = 'text' | 'image' | 'video' | 'build';

export interface ContentBlock {  
  type: ContentType;
  content?: string;  // For text content
  title?: string;   // For text subheader
  url?: string;     // For image, video, or build URLs
  alt?: string;     // For image alt text
  referenceText?: string; 
  minHeight?: number; 
  maxHeight?: number; 
  minWidth?: number; 
  maxWidth?: number; 
  sideBySide?: boolean;
}

export interface Game {
  title: string;
  description: string;
  features: string[];
  buildUrl: string;
  tags: string[];
}

export interface Tool {
  title: string;
  description: string;
  features: string[];
  demoUrl: string;
  tags: string[];
}

export interface TowerContent {
  title: string;
  content: ContentBlock[];
  introduction: {
    title: string;
    content: string;
  };
  games: Game[];
  tool: Tool;
  conclusion: {
    title: string;
    content: string;
  };
} 