"use client";

import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  codeFile: string;
  language?: string;
  startLine?: number;
  endLine?: number;
  style?: React.CSSProperties;
}

export function CodeBlock({ codeFile, language = 'typescript', startLine, endLine, style }: CodeBlockProps) {
  const [code, setCode] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const loadCode = async () => {
      try {
        const response = await fetch(codeFile);
        let text = await response.text();
        
        // Handle line range if specified
        if (startLine || endLine) {
          const lines = text.split('\n');
          const start = startLine ? startLine - 1 : 0;
          const end = endLine || lines.length;
          text = lines.slice(start, end).join('\n');
        }
        
        setCode(text);
      } catch (error) {
        console.error('Error loading code file:', error);
        setCode('Error loading code file');
      } finally {
        setIsLoading(false);
      }
    };

    loadCode();
  }, [codeFile, startLine, endLine]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="w-full relative" style={style}>
      <div className="absolute top-2 right-2 flex gap-2 z-50">
        <button
          onClick={handleCopy}
          className={`px-3 py-1 rounded-lg transition-colors text-sm ${
            copySuccess 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {copySuccess ? 'Copied!' : 'Copy'}
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <div 
        className={`bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-none' : 'max-h-[200px]'
        }`}
      >
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            background: '#1e1e1e',
            width: '100%',
            maxWidth: '100%',
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
} 