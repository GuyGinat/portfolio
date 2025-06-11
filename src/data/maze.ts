export type Cell = 0 | 1;

export function generateMaze(width: number, height: number): Cell[][] {
  // Maze dimensions must be odd to allow walls between paths
  const mazeWidth = width % 2 === 0 ? width + 1 : width;
  const mazeHeight = height % 2 === 0 ? height + 1 : height;

  // Initialize all cells as walls
  const maze: Cell[][] = Array.from({ length: mazeHeight }, () =>
    Array(mazeWidth).fill(1)
  );

  function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function carve(x: number, y: number) {
    maze[y][x] = 0;

    const directions = shuffle([
      [0, -2], // up
      [2, 0],  // right
      [0, 2],  // down
      [-2, 0], // left
    ]);

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        ny > 0 && ny < mazeHeight - 1 &&
        nx > 0 && nx < mazeWidth - 1 &&
        maze[ny][nx] === 1
      ) {
        maze[y + dy / 2][x + dx / 2] = 0; // remove wall between
        carve(nx, ny);
      }
    }
  }

  // Start carving from (1,1)
  carve(1, 1);

  return maze;
}