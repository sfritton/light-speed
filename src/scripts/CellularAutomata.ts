import { TileName } from './constants';

export interface CellRenderDetails {
  x: number;
  y: number;
  tileName: TileName;
}

const WALL_THRESHOLD = 0.5;
const LIVE_NEIGHBOR_THRESHOLD = 4;
const TOTAL_STEPS = 3;
const SOFTENING_STEPS = 1;
const CLEANUP_COUNT = 10;

export class CellularAutomata {
  stepCount: number;
  gridWidth: number;
  gridHeight: number;
  startTime = 0;
  drawFn: (cells: CellRenderDetails[]) => void;
  cells: boolean[]; // true for floor, false for wall
  floodChecks: boolean[];
  caveSizes: number[];
  wallTwos: boolean[]; // render wall_two if it's a wall
  rng: () => number;

  constructor(
    draw: (cells: CellRenderDetails[]) => void,
    rng: () => number,
    gridWidth: number,
    gridHeight = gridWidth,
  ) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.drawFn = draw;
    this.stepCount = 0;
    this.rng = rng;
  }

  initCells() {
    this.cells = [...new Array(this.gridWidth * this.gridHeight)].map(
      () => this.rng() > WALL_THRESHOLD,
    );
    this.wallTwos = this.cells.map(() => this.rng() > 0.9);
    this.floodChecks = this.cells.map(() => false);
    this.caveSizes = this.cells.map(() => 0);
  }

  draw() {
    const squares = [...new Array(this.gridWidth * this.gridHeight)].map((_, index) => {
      const { x, y } = this.getCoordinatesFromIndex(index);

      return {
        topLeft: this.getCell(x, y),
        bottomLeft: this.getCell(x, y + 1),
        bottomRight: this.getCell(x + 1, y + 1),
        topRight: this.getCell(x + 1, y),
        x,
        y,
      };
    });

    this.drawFn(
      squares.map(({ x, y, ...corners }) => {
        const tileName = this.getTileName(corners);
        return {
          x,
          y,
          tileName:
            tileName === 'WALL' && this.wallTwos[this.getIndexFromCoordinates(x, y)]
              ? 'WALL_TWO'
              : tileName,
        };
      }),
    );
  }

  getTileName = ({
    topLeft,
    bottomLeft,
    bottomRight,
    topRight,
  }: {
    topLeft: boolean;
    bottomLeft: boolean;
    bottomRight: boolean;
    topRight: boolean;
  }) => {
    // Pure floor and pure wall
    if (topLeft && topRight && bottomLeft && bottomRight) return 'FLOOR';
    if (!topLeft && !topRight && !bottomLeft && !bottomRight) return 'WALL';

    // Edges
    if (topLeft && topRight && !bottomLeft && !bottomRight) return 'BOTTOM';
    if (!topLeft && !topRight && bottomLeft && bottomRight) return 'TOP';
    if (topLeft && !topRight && bottomLeft && !bottomRight) return 'RIGHT';
    if (!topLeft && topRight && !bottomLeft && bottomRight) return 'LEFT';

    // Inside corners
    if (!topLeft && !topRight && !bottomLeft && bottomRight) return 'TOP_LEFT';
    if (!topLeft && !topRight && bottomLeft && !bottomRight) return 'TOP_RIGHT';
    if (!topLeft && topRight && !bottomLeft && !bottomRight) return 'BOTTOM_LEFT';
    if (topLeft && !topRight && !bottomLeft && !bottomRight) return 'BOTTOM_RIGHT';

    // Outside corners
    if (!topLeft && topRight && bottomLeft && bottomRight) return 'PILLAR_TOP_LEFT';
    if (topLeft && !topRight && bottomLeft && bottomRight) return 'PILLAR_TOP_RIGHT';
    if (topLeft && topRight && !bottomLeft && bottomRight) return 'PILLAR_BOTTOM_LEFT';
    if (topLeft && topRight && bottomLeft && !bottomRight) return 'PILLAR_BOTTOM_RIGHT';

    // Diagonals
    if (!topLeft && topRight && bottomLeft && !bottomRight) return 'DIAGONAL_BR_TO_TL';
    if (topLeft && !topRight && !bottomLeft && bottomRight) return 'DIAGONAL_BL_TO_TR';

    throw new Error(`Unknown tile configuration:
 ${topLeft ? 'FLOOR' : ' WALL'} - ${topRight ? 'FLOOR' : 'WALL'}
   |      |
 ${bottomLeft ? 'FLOOR' : ' WALL'} - ${bottomRight ? 'FLOOR' : 'WALL'}
`);
  };

  getCoordinatesFromIndex = (index: number) => ({
    x: index % this.gridWidth,
    y: Math.floor(index / this.gridWidth),
  });

  getIndexFromCoordinates = (x: number, y: number) => {
    if (x < 0 || y < 0 || x > this.gridWidth || y > this.gridHeight) return -1;

    return x + y * this.gridWidth;
  };

  getCell = (x: number, y: number) => {
    const index = this.getIndexFromCoordinates(x, y);
    // Treat imaginary cells outside the grid as walls
    if (index < 0) return false;

    return this.cells[index];
  };

  getCellValue = (x: number, y: number) => (this.getCell(x, y) ? 1 : 0);

  getNeighborFloorCount(a: number, b?: number) {
    let x: number;
    let y: number;
    let neighbourCellCount = 0;

    if (b === undefined) {
      const coordinates = this.getCoordinatesFromIndex(a);
      x = coordinates.x;
      y = coordinates.y;
    } else {
      x = a;
      y = b;
    }

    if (x > 0) {
      neighbourCellCount += this.getCellValue(x - 1, y);
      if (y > 0) {
        neighbourCellCount += this.getCellValue(x - 1, y - 1);
      }
    }

    if (y > 0) {
      neighbourCellCount += this.getCellValue(x, y - 1);
      if (x < this.gridWidth - 1) {
        neighbourCellCount += this.getCellValue(x + 1, y - 1);
      }
    }

    if (x < this.gridWidth - 1) {
      neighbourCellCount += this.getCellValue(x + 1, y);
      if (y < this.gridHeight - 1) {
        neighbourCellCount += this.getCellValue(x + 1, y + 1);
      }
    }

    if (y < this.gridHeight - 1) {
      neighbourCellCount += this.getCellValue(x, y + 1);
      if (x > 0) {
        neighbourCellCount += this.getCellValue(x - 1, y + 1);
      }
    }

    return neighbourCellCount;
  }

  step = ({ threshold = LIVE_NEIGHBOR_THRESHOLD, lockFloor = false } = {}) => {
    this.stepCount++;
    this.cells = this.cells.map((isFloor, index) => {
      if (isFloor && lockFloor) return true;

      const neighborFloorCount = this.getNeighborFloorCount(index);
      if (neighborFloorCount > threshold) return true;
      else if (neighborFloorCount < threshold) return false;
      return isFloor;
    });
  };

  expandWalls = () => {
    this.step({ threshold: 8 });
  };

  cleanup = () => {
    this.step({ threshold: 5, lockFloor: true });
  };

  findCaveSizes() {
    this.cells.map((_, index) => {
      if (this.floodChecks[index]) return;
      this.floodFill(index);
    });
  }

  fillSmallCaves() {
    this.cells = this.cells.map((_, index) => this.caveSizes[index] > 50);
  }

  floodFill(index: number) {
    const caveTiles = this.floodFillHelper(index, []);

    caveTiles.forEach((cellIndex) => {
      this.caveSizes[cellIndex] = caveTiles.length;
    });
  }

  floodFillHelper(index: number, caveTiles: number[]): number[] {
    // If this is a wall or has already been checked, ignore it
    if (!this.cells[index] || this.floodChecks[index]) return caveTiles;

    this.floodChecks[index] = true;

    const { x, y } = this.getCoordinatesFromIndex(index);

    const topTiles = this.floodFillHelper(this.getIndexFromCoordinates(x, y - 1), caveTiles);
    const bottomTiles = this.floodFillHelper(this.getIndexFromCoordinates(x, y + 1), caveTiles);
    const leftTiles = this.floodFillHelper(this.getIndexFromCoordinates(x - 1, y), caveTiles);
    const rightTiles = this.floodFillHelper(this.getIndexFromCoordinates(x + 1, y), caveTiles);

    return [...caveTiles, index, ...topTiles, ...bottomTiles, ...leftTiles, ...rightTiles];
  }

  run = (isRetry = false) => {
    if (!isRetry) {
      console.log(
        `Generating a ${this.gridWidth - 1}x${this.gridHeight - 1} grid (${
          (this.gridWidth - 1) * (this.gridHeight - 1)
        } cells) with ${TOTAL_STEPS} steps …`,
      );
      this.startTime = new Date().getTime();
    }

    this.initCells();

    while (this.stepCount < TOTAL_STEPS - SOFTENING_STEPS) {
      this.step();
    }
    while (this.stepCount < TOTAL_STEPS) {
      this.step({ threshold: LIVE_NEIGHBOR_THRESHOLD - 2 });
    }

    for (let i = 0; i < CLEANUP_COUNT; i++) {
      this.cleanup();
    }

    this.expandWalls();

    this.findCaveSizes();

    this.fillSmallCaves();

    if (this.cells.every((isFloor) => !isFloor)) {
      console.log('Blank cave generated, retrying …');
      this.run(true);
    }

    if (!isRetry) console.log(`Finished in ${new Date().getTime() - this.startTime}ms`);
  };
}
