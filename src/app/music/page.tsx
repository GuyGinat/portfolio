"use client";

// import { useAudioVisualizer } from '@/hooks/useAudioVisualizer';
// import { useAudio } from '@/contexts/AudioContext';
import { GRID_SIZE_X, GRID_SIZE_Y } from '@/components/ThreeBackground';
import BackgroundWithControls from '@/components/BackgroundWithControls';

// List of available tracks
const AVAILABLE_TRACKS = [
  { name: "Desert Flow", url: "/music/Desert Flow.mp3" },
  { name: "French Bot Tragedy", url: "/music/French Bot Tragedy.mp3" },
  // Add more tracks as needed
];

// Define frequency ranges to match grid size
// The FFT size is 256, which gives us 128 frequency bins
// We'll split these into GRID_SIZE_X buckets
const BINS_PER_BUCKET = Math.floor(128 / GRID_SIZE_X);

const FREQUENCY_RANGES = Array.from({ length: GRID_SIZE_X }, (_, i) => ({
  name: `bucket${i}`,
  start: i * BINS_PER_BUCKET,
  end: (i + 1) * BINS_PER_BUCKET
}));

export default function MusicPage() {
  // const { isPlaying, currentTrack, togglePlay, stopTrack } = useAudioVisualizer({
  //   frequencyRanges: FREQUENCY_RANGES,
  //   onFrequencyData: (frequencies) => {
  //     // For each column (bucket)
  //     for (let x = 0; x < GRID_SIZE_X; x++) {
  //       const bucketValue = frequencies[`bucket${x}`];
        
  //       // Calculate how many cubes should be black based on the bucket value
  //       const activeHeight = Math.floor(bucketValue * GRID_SIZE_Y);
        
  //       // For each row in the column
  //       for (let y = 0; y < GRID_SIZE_Y; y++) {
  //         // If the row is within the active height, make it black, otherwise white
  //         if (y < activeHeight) {
  //           // Use the BackgroundWithControls component's setCustomCubeColor function
  //           const event = new CustomEvent('setCubeColor', {
  //             detail: { x, y, color1: "#000000", color2: "#000000" }
  //           });
  //           window.dispatchEvent(event);
  //         } else {
  //           const event = new CustomEvent('setCubeColor', {
  //             detail: { x, y, color1: "#FFFFFF", color2: "#FFFFFF" }
  //           });
  //           window.dispatchEvent(event);
  //         }
  //       }
  //     }
  //   }
  // });

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Music Visualizer</h1>
    </div>
    // <BackgroundWithControls>
    //   <div className="min-h-screen flex items-center justify-center">
    //     <div className="w-full max-w-2xl p-8 bg-black/30 backdrop-blur-md rounded-lg border border-white/20">
    //       <h1 className="text-4xl font-bold text-white mb-8 text-center">Music Visualizer</h1>
          
    //       {/* Music Player */}
    //       <div className="space-y-6">
    //         {/* Now Playing */}
    //         {currentTrack && (
    //           <div className="text-center text-white/80">
    //             <p className="text-sm">Now Playing</p>
    //             <p className="text-xl font-medium">
    //               {AVAILABLE_TRACKS.find(t => t.url === currentTrack)?.name}
    //             </p>
    //           </div>
    //         )}

    //         {/* Track List */}
    //         <div className="space-y-2">
    //           {AVAILABLE_TRACKS.map((track) => (
    //             <button
    //               key={track.url}
    //               onClick={() => togglePlay(track.url)}
    //               className={`w-full px-4 py-3 rounded-lg text-left transition-all
    //                 ${currentTrack === track.url
    //                   ? 'bg-indigo-500 text-white'
    //                   : 'bg-black/30 text-white/70 hover:bg-black/50'
    //                 }`}
    //             >
    //               <div className="flex items-center justify-between">
    //                 <span className="font-medium">{track.name}</span>
    //                 {currentTrack === track.url && isPlaying && (
    //                   <span className="text-sm">▶️ Playing</span>
    //                 )}
    //               </div>
    //             </button>
    //           ))}
    //         </div>

    //         {/* Controls */}
    //         {isPlaying && (
    //           <div className="flex justify-center">
    //             <button
    //               onClick={stopTrack}
    //               className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
    //             >
    //               Stop
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </BackgroundWithControls>
  );
} 