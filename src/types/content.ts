export type ContentType = 'text' | 'image' | 'video' | 'build' | 'code' | 'download';

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
  thumbnail?: string; // For build type content blocks
  // Code specific properties
  codeFile?: string; // Path to the code file
  language?: string; // Programming language for syntax highlighting
  startLine?: number; // Optional start line to show
  endLine?: number; // Optional end line to show
  // Download specific properties
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  // Text link properties
  links?: {
    text: string;
    url: string;
    isDownload?: boolean;
    fileName?: string;
  }[];
  style?: {
    backgroundColor?: string;
    textColor?: string;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    flexBasis?: string; // For side-by-side content width control (e.g., "60%", "40%")
    maxWidth?: string | number;
    padding?: number;
    borderRadius?: number;
    fontWeight?: string;
    fontSize?: string;
    textAlign?: string;
    width?: string | number;
    height?: string | number;
  };
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