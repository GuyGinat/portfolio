'use client';

import { towerContent } from '@/data/tower-content';
import { ContentBlock } from '@/components/ContentBlock';
import type { ContentBlock as ContentBlockType } from '@/types/content';

export default function GameDevJourneyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        <h1 className="section-title mb-8">Game Development Journey</h1>
        
        <div className="space-y-8">
          {towerContent.map((block: ContentBlockType, index: number) => (
            <ContentBlock key={index} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
} 