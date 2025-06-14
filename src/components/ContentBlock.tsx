import Image from "next/image";
import type { ContentBlock as ContentBlockType } from "@/types/content";

interface ContentBlockProps {
  block: ContentBlockType;
  isSideBySide?: boolean;
}

export function ContentBlock({ block, isSideBySide = false }: ContentBlockProps) {
  switch (block.type) {
    case 'text':
      return (
        <div className={`prose max-w-none mb-8 ${isSideBySide ? 'flex-1' : ''}`}>
          {block.title && (
            <h2 className="text-2xl font-bold mb-4">{block.title}</h2>
          )}
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {block.content}
          </p>
        </div>
      );

    case 'image':
      return (
        <div className={`mb-8 ${isSideBySide ? 'flex-1' : ''}`}>
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
              <p className="text-gray-500 text-sm mt-2 italic">
                {block.referenceText}
              </p>
            )}
          </div>
        </div>
      );

    case 'video':
      return (
        <div className={`mb-8 ${isSideBySide ? 'flex-1' : ''}`}>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="aspect-w-16 aspect-h-9" style={{ minHeight: block.minHeight, maxHeight: block.maxHeight, minWidth: block.minWidth, maxWidth: block.maxWidth }}>
              <iframe
                src={block.url}
                className=" rounded-lg"
                style={{ minHeight: block.minHeight, maxHeight: block.maxHeight, minWidth: block.minWidth, maxWidth: block.maxWidth }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      );

    case 'build':
      return (
        <div className={`mb-8 ${isSideBySide ? 'flex-1' : ''}`}>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={block.url}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
} 