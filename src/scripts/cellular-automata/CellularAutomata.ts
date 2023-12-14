export interface CellularAutomataCell {
  x: number;
  y: number;
  isFloor: boolean;
}

const WALL_THRESHOLD = 0.38;
const LIVE_NEIGHBOR_THRESHOLD = 5;
const TOTAL_STEPS = 10;
const SOFTENING_STEPS = 2;

export class CellularAutomata {
  stepCount: number;
  gridWidth: number;
  gridHeight: number;
  startTime = 0;
  drawFn: (cells: CellularAutomataCell[], stepCount: number) => void;
  cells: boolean[]; // true for floor, false for wall

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
  }

  draw() {
    this.drawFn(
      this.cells.map((isFloor, index) => {
        const { x, y } = this.getCoordinatesFromIndex(index);

        return { x, y, isFloor };
      }),
      this.stepCount,
    );
  }

  getCoordinatesFromIndex = (index: number) => ({
    x: index % this.gridWidth,
    y: Math.floor(index / this.gridWidth),
  });

  getCell = (x: number, y: number) => this.cells[x + y * this.gridWidth];

  getCellValue = (x: number, y: number) => (this.getCell(x, y) ? 1 : 0);

  getNeighborWallCount = (index: number) => {
    const { x, y } = this.getCoordinatesFromIndex(index);
    let neighbourCellCount = 0;

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
  };

  step = (threshold = LIVE_NEIGHBOR_THRESHOLD) => {
    this.stepCount++;
    this.cells = this.cells.map((oldValue, index) => {
      const neighborWallCount = this.getNeighborWallCount(index);
      const newValue = neighborWallCount >= threshold;
      // console.log({
      //   ...this.getCoordinatesFromIndex(index),
      //   neighborWallCount,
      //   oldValue,
      //   newValue,
      // });
      return newValue;
    });
  };

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

    console.log(`Finished in ${new Date().getTime() - this.startTime}ms`);
  };
}
