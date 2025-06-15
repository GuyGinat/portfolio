"use client";
import Image from "next/image";
import type { ContentBlock as ContentBlockType } from "@/types/content";
import { useState } from "react";
import { CodeBlock } from "./CodeBlock";

interface ContentBlockProps {
  block: ContentBlockType;
  isSideBySide?: boolean;
}

export function ContentBlock({ block, isSideBySide = false }: ContentBlockProps) {
  const [isBuildLoaded, setIsBuildLoaded] = useState(false);

  const getBlockStyles = () => {
    const styles: React.CSSProperties = {};
    if (block.style) {
      if (block.style.backgroundColor) styles.backgroundColor = block.style.backgroundColor;
      if (block.style.textColor) styles.color = block.style.textColor;
      if (block.style.marginTop) styles.marginTop = `${block.style.marginTop}px`;
      if (block.style.marginBottom) styles.marginBottom = `${block.style.marginBottom}px`;
      if (block.style.marginLeft) styles.marginLeft = `${block.style.marginLeft}px`;
      if (block.style.marginRight) styles.marginRight = `${block.style.marginRight}px`;
      if (block.style.padding) styles.padding = `${block.style.padding}px`;
      if (block.style.borderRadius) styles.borderRadius = `${block.style.borderRadius}px`;
      if (block.style.fontWeight) styles.fontWeight = block.style.fontWeight;
      if (block.style.fontSize) styles.fontSize = block.style.fontSize;
      if (block.style.width) styles.width = block.style.width;
      if (block.style.height) styles.height = block.style.height;
      if (isSideBySide && block.style.flexBasis) styles.flexBasis = block.style.flexBasis;
    }
    return styles;
  };

  const renderTextWithLinks = (text: string, links?: ContentBlockType['links']) => {
    if (!links || links.length === 0) return <>{text}</>;

    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    links.forEach((link, index) => {
      const linkIndex = text.indexOf(link.text, lastIndex);
      if (linkIndex === -1) return;

      // Add text before the link
      if (linkIndex > lastIndex) {
        parts.push(text.slice(lastIndex, linkIndex));
      }

      // Add the link
      const linkElement = link.isDownload ? (
        <a
          key={index}
          href={link.url}
          download={link.fileName}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {link.text}
        </a>
      ) : (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {link.text}
        </a>
      );
      parts.push(linkElement);

      lastIndex = linkIndex + link.text.length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return <>{parts}</>;
  };

  switch (block.type) {
    case 'text':
      return (
        <div 
          className={`prose max-w-none mb-8 ${isSideBySide ? 'flex-1' : ''}`}
          style={getBlockStyles()}
        >
          {block.title && (
            <h2 
              className="text-2xl font-bold mb-4"
              style={block.style?.textColor ? { color: block.style.textColor } : undefined}
            >
              {block.title}
            </h2>
          )}
          <p 
            className="text-gray-700 leading-relaxed whitespace-pre-line"
            style={block.style?.textColor ? { color: block.style.textColor } : undefined}
          >
            {renderTextWithLinks(block.content || '', block.links)}
          </p>
        </div>
      );

    case 'image':
      return (
        <div 
          className={`mb-8 ${isSideBySide ? 'flex-1' : ''}`}
          style={getBlockStyles()}
        >
          <div className={`bg-white rounded-lg p-4 ${isSideBySide ? '' : 'shadow-md'}`}>
            <div className="aspect-w-16 aspect-h-9 relative" style={{ minHeight: block.minHeight, maxHeight: block.maxHeight, minWidth: block.minWidth, maxWidth: block.maxWidth }}>
              <Image
                src={block.url!}
                alt={block.alt || ''}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            {block.referenceText && (
              <p 
                className="text-gray-500 text-sm mt-2 italic"
                style={block.style?.textColor ? { color: block.style.textColor } : undefined}
              >
                {block.referenceText}
              </p>
            )}
          </div>
        </div>
      );

    case 'video':
      return (
        <div 
          className={`mb-8 ${isSideBySide ? 'flex-1' : ''}`}
          style={getBlockStyles()}
        >
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="aspect-w-16 aspect-h-9" style={{ minHeight: block.minHeight, maxHeight: block.maxHeight, minWidth: block.minWidth, maxWidth: block.maxWidth }}>
              <video
                src={block.url}
                className="rounded-lg"
                style={{ minHeight: block.minHeight, maxHeight: block.maxHeight, minWidth: block.minWidth, maxWidth: block.maxWidth }}                
                controls
              />
            </div>
            {block.referenceText && (
              <p 
                className="text-gray-500 text-sm mt-2 italic"
                style={block.style?.textColor ? { color: block.style.textColor } : undefined}
              >
                {block.referenceText}
              </p>
            )}
          </div>
        </div>
      );

    case 'build':
      return (
        <div 
          className={`mb-8 ${isSideBySide ? 'flex-1' : ''}`}
          style={getBlockStyles()}
        >
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="aspect-w-16 aspect-h-9">
              {!isBuildLoaded ? (
                <div 
                  className="w-full h-full min-h-[400px] flex items-center justify-center relative"
                  style={{
                    minHeight: block.minHeight,
                    maxHeight: block.maxHeight,
                    minWidth: block.minWidth,
                    maxWidth: block.maxWidth,
                    backgroundImage: `url(${block.thumbnail || '/images/tower/tower.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50" />
                  <button
                    onClick={() => setIsBuildLoaded(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors relative z-10"
                  >
                    Play Game
                  </button>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <iframe
                    src={block.url}
                    style={{
                      minHeight: block.minHeight,
                      maxHeight: block.maxHeight,
                      minWidth: block.minWidth,
                      maxWidth: block.maxWidth,
                    }}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    onClick={() => setIsBuildLoaded(false)}
                    className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Unload Game
                  </button>
                </div>
              )}
            </div>
            {block.referenceText && (
              <p 
                className="text-gray-500 text-sm mt-2 italic"
                style={block.style?.textColor ? { color: block.style.textColor } : undefined}
              >
                {block.referenceText}
              </p>
            )}
          </div>
        </div>
      );

    case 'code':
      return (
        <div 
          className={`mb-8 ${isSideBySide ? 'flex-1' : ''}`}
        >
          <div 
            className="bg-white rounded-lg shadow-md p-4 w-full"
            style={getBlockStyles()}
          >
            {block.title && (
              <h3 className="text-lg font-semibold mb-2">{block.title}</h3>
            )}
            <div className="w-full">
              <CodeBlock
                codeFile={block.codeFile!}
                language={block.language}
                startLine={block.startLine}
                endLine={block.endLine}
                style={{
                  width: '100%',
                  ...(block.style?.flexBasis && { flexBasis: block.style.flexBasis }),
                  ...(block.style?.maxWidth && { maxWidth: block.style.maxWidth }),
                }}
              />
            </div>
            {block.referenceText && (
              <p className="text-gray-500 text-sm mt-2 italic">
                {block.referenceText}
              </p>
            )}
          </div>
        </div>
      );

    case 'download':
      return (
        <div 
          className={`mb-8 ${isSideBySide ? 'flex-1' : ''}`}
          style={getBlockStyles()}
        >
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {block.title && (
                  <h3 
                    className="text-lg font-semibold mb-1"
                    style={block.style?.textColor ? { color: block.style.textColor } : undefined}
                  >
                    {block.title}
                  </h3>
                )}
                <div 
                  className="text-sm text-gray-600"
                  style={block.style?.textColor ? { color: block.style.textColor } : undefined}
                >
                  {block.fileType && <span className="mr-2">{block.fileType}</span>}
                  {block.fileSize && <span>{block.fileSize}</span>}
                </div>
              </div>
              <a
                href={block.url}
                download={block.fileName}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download
              </a>
            </div>
            {block.referenceText && (
              <p 
                className="text-gray-500 text-sm mt-2 italic"
                style={block.style?.textColor ? { color: block.style.textColor } : undefined}
              >
                {block.referenceText}
              </p>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
} 