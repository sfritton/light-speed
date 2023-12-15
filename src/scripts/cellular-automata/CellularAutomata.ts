import { SocketTileName } from '../common/Tile';

export interface CellularAutomataCell {
  x: number;
  y: number;
  tileName: SocketTileName;
}

const WALL_THRESHOLD = 0.38;
const LIVE_NEIGHBOR_THRESHOLD = 5;
const TOTAL_STEPS = 10;
const SOFTENING_STEPS = 2;
const CLEANUP_COUNT = 10;

export class CellularAutomata {
  stepCount: number;
  gridWidth: number;
  gridHeight: number;
  startTime = 0;
  drawFn: (cells: CellularAutomataCell[], stepCount: number) => void;
  cells: boolean[]; // true for floor, false for wall
  floodChecks: boolean[];
  caveSizes: number[];

  constructor(
    draw: (cells: CellularAutomataCell[], stepCount: number) => void,
    gridWidth: number,
    gridHeight = gridWidth,
  ) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.drawFn = draw;
    this.stepCount = 0;

    this.cells = [...new Array(gridWidth * gridHeight)].map(() => Math.random() > WALL_THRESHOLD);
    this.floodChecks = this.cells.map(() => false);
    this.caveSizes = this.cells.map(() => 0);
  }

  draw() {
    this.drawFn(
      this.cells.map((_, index) => {
        const { x, y } = this.getCoordinatesFromIndex(index);
        const tileName = this.getTileName(index);

        return { x, y, tileName };
      }),
      this.stepCount,
    );
  }

  getTileName = (index: number): SocketTileName => {
    const isFloor = this.cells[index];
    if (isFloor) return 'FLOOR';

    const neighborFloorCount = this.getNeighborFloorCount(index);
    const { x, y } = this.getCoordinatesFromIndex(index);

    if (neighborFloorCount === 0) {
      return Math.random() > 0.85 ? 'WALL_TWO' : 'WALL';
    }

    const hasTopWall = !this.getCell(x, y - 1);
    const hasBottomWall = !this.getCell(x, y + 1);
    const hasLeftWall = !this.getCell(x - 1, y);
    const hasRightWall = !this.getCell(x + 1, y);

    // Inside corners
    if (neighborFloorCount === 1) {
      if (this.getCell(x - 1, y - 1)) return 'BOTTOM_RIGHT';
      if (this.getCell(x + 1, y + 1)) return 'TOP_LEFT';
      if (this.getCell(x - 1, y + 1)) return 'TOP_RIGHT';
      if (this.getCell(x + 1, y - 1)) return 'BOTTOM_LEFT';
    }

    // TODO: this should never happen
    if (neighborFloorCount > 5) {
      return 'WALL';
    }

    // Edges
    if (hasTopWall && hasRightWall && !hasBottomWall && hasLeftWall) return 'TOP';
    if (hasTopWall && hasRightWall && hasBottomWall && !hasLeftWall) return 'RIGHT';
    if (!hasTopWall && hasRightWall && hasBottomWall && hasLeftWall) return 'BOTTOM';
    if (hasTopWall && !hasRightWall && hasBottomWall && hasLeftWall) return 'LEFT';

    // Outside corners
    if (hasTopWall && hasRightWall && !hasBottomWall && !hasLeftWall) return 'PILLAR_TOP_RIGHT';
    if (!hasTopWall && hasRightWall && hasBottomWall && !hasLeftWall) return 'PILLAR_BOTTOM_RIGHT';
    if (hasTopWall && !hasRightWall && !hasBottomWall && hasLeftWall) return 'PILLAR_TOP_LEFT';
    if (!hasTopWall && !hasRightWall && hasBottomWall && hasLeftWall) return 'PILLAR_BOTTOM_LEFT';

    // TODO: this should never happen
    return 'WALL';
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
    // const { x, y } = this.getCoordinatesFromIndex(index);
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

  step = (threshold = LIVE_NEIGHBOR_THRESHOLD) => {
    this.stepCount++;
    this.cells = this.cells.map((oldValue, index) => {
      const neighborFloorCount = this.getNeighborFloorCount(index);
      const newValue = neighborFloorCount >= threshold;
      // console.log({
      //   ...this.getCoordinatesFromIndex(index),
      //   neighborFloorCount,
      //   oldValue,
      //   newValue,
      // });
      return newValue;
    });
  };

  expandWalls = () => {
    this.cells = this.cells.map((oldValue, index) => {
      const neighborFloorCount = this.getNeighborFloorCount(index);
      const newValue = neighborFloorCount >= 8;
      return newValue;
    });
  };

  cleanup = () => {
    this.cells = this.cells.map((oldValue, index) => {
      const neighborFloorCount = this.getNeighborFloorCount(index);
      const newValue = oldValue || neighborFloorCount >= 5;
      return newValue;
    });
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

  run = () => {
    console.log(
      `Generating a ${this.gridWidth}x${this.gridHeight} grid (${
        this.gridWidth * this.gridHeight
      } cells) with ${TOTAL_STEPS} steps …`,
    );
    this.startTime = new Date().getTime();

    while (this.stepCount < TOTAL_STEPS - SOFTENING_STEPS) {
      this.step();
    }
    while (this.stepCount < TOTAL_STEPS) {
      this.step(LIVE_NEIGHBOR_THRESHOLD - 2);
    }

    for (let i = 0; i < CLEANUP_COUNT; i++) {
      this.cleanup();
    }

    this.expandWalls();

    this.findCaveSizes();

    this.fillSmallCaves();

    console.log(`Finished in ${new Date().getTime() - this.startTime}ms`);
  };
}
