import { ContentBlock } from "@/components/ContentBlock";
import { towerContent } from "@/data/tower-content";
import type { ContentBlock as ContentBlockType } from "@/types/content";
import { div } from "three/tsl";

export default function TowerPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full h-full">
      <div className="bg-gray-200 opacity-90 flex flex-col items-center py-12 justify-center min-h-[80vh] w-5/6">
        <h1 className="text-3xl font-bold mb-4 text-center">Tower</h1>
        <p className="text-gray-600 mb-6 text-center max-w-2xl italic">
          An exploration of grids, circles and game design.
        </p>

        {/* Content Blocks Section */}
        <div className="w-full max-w-4xl mt-12 space-y-8">
          {towerContent.map((block: ContentBlockType, index: number) => {
            // Check if this block and the next one should be side by side
            const nextBlock = towerContent[index + 1];
            const isSideBySide = block.sideBySide && nextBlock;

            if (isSideBySide) {
              return (
                <div key={index} className="flex gap-8">
                  <ContentBlock block={block} isSideBySide={true} />
                  <ContentBlock block={nextBlock} isSideBySide={true} />
                </div>
              );
            }

            // Skip the next block if it was rendered in the side-by-side layout
            if (index > 0 && towerContent[index - 1]?.sideBySide) {
              return null;
            }

            return <ContentBlock key={index} block={block} />;
          })}
        </div>
      </div>
    </div>
  );
} 