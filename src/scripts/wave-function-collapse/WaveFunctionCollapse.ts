import { Cell } from './Cell';

const ZONE_SIZE = 16;

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Approximate runtime:
 * - 25x25: 90ms
 * - 50x50: 380ms
 * - 100x100: 1500ms
 * - 200x200: 6000ms
 * - 400x400: 25000ms
 * - 800x800: 108000ms
 *
 * ~ 0.15ms per cell (or 6000 cells per second) with linear scaling
 */
export class WaveFunctionCollapse {
  gridWidth: number;
  gridHeight: number;
  startTime = 0;
  draw: () => void;
  cells: Cell[];
  uncollapsedCells: Cell[];
  currentZone: Cell[];
  lowestEntropyCellIndex = 0;

  constructor(draw: (cells: Cell[]) => void, gridWidth: number, gridHeight = gridWidth) {
    this.draw = () => draw(this.cells);
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.cells = [...new Array(gridWidth * gridHeight)].map(
      (_, i) => new Cell(i % gridWidth, Math.floor(i / gridWidth)),
    );
    this.cells.forEach((cell) => cell.setNeighbors(this.cells, gridWidth, gridHeight));
    this.setCurrentZone(0, 0);
  }

  setCurrentZone(x: number, y: number) {
    this.currentZone = this.cells.filter(
      (cell) => cell.x >= x && cell.x < x + ZONE_SIZE && cell.y >= y && cell.y < y + ZONE_SIZE,
      [],
    );
    this.uncollapsedCells = this.currentZone.filter((cell) => !cell.isCollapsed);
    shuffleArray(this.uncollapsedCells);
  }

  run = (drawSteps = false) => {
    try {
      console.log(
        `Generating a ${this.gridWidth}x${this.gridHeight} grid (${
          this.gridWidth * this.gridHeight
        } cells) ...`,
      );
      this.startTime = new Date().getTime();
      if (drawSteps) return this.runAsync();

      for (let y = 0; y < this.gridHeight; y += ZONE_SIZE) {
        for (let x = 0; x < this.gridWidth; x += ZONE_SIZE) {
          this.runZone(x, y);
        }
      }
      console.log(`Finished in ${new Date().getTime() - this.startTime}ms`);
    } finally {
      this.draw();
    }
  };

  runAsync = async () => {
    for (let y = 0; y < this.gridHeight; y += ZONE_SIZE) {
      for (let x = 0; x < this.gridWidth; x += ZONE_SIZE) {
        await this.runZoneAsync(x, y);
      }
    }
    this.draw();
    console.log(`Finished in ${new Date().getTime() - this.startTime}ms`);
  };

  runZone = (x: number, y: number) => {
    this.setCurrentZone(x, y);
    // choose random cell and collapse
    const index = Math.floor(Math.random() * this.uncollapsedCells.length);
    const cell = this.uncollapsedCells[index];
    cell.collapse();

    // Step through the zone until all of its cells are collapsed
    this.step();
  };

  runZoneAsync = async (x: number, y: number) => {
    this.setCurrentZone(x, y);
    // choose random cell and collapse
    const index = Math.floor(Math.random() * this.uncollapsedCells.length);
    const cell = this.uncollapsedCells[index];
    cell.collapse();

    // Step through the zone until all of its cells are collapsed
    await this.stepAsync();
  };

  step = () => {
    const lowestEntropyCell = this.findLowestEntropyCell();

    // There are no more cells to collapse
    if (!lowestEntropyCell) return;

    lowestEntropyCell.collapse();

    this.step();
  };

  stepAsync = async () => {
    const lowestEntropyCell = this.findLowestEntropyCell();

    // There are no more cells to collapse
    if (!lowestEntropyCell) return;

    lowestEntropyCell.collapse();

    this.draw();
    await new Promise((resolve) => requestAnimationFrame(() => resolve(this.stepAsync())));
  };

  findLowestEntropyCell = () => {
    this.uncollapsedCells = this.uncollapsedCells.filter((cell) => !cell.isCollapsed);

    if (this.uncollapsedCells.length === 0) return undefined;

    let lowestEntropyCell = this.uncollapsedCells[0];
    this.lowestEntropyCellIndex = 0;

    for (let i = 0; i < this.uncollapsedCells.length && lowestEntropyCell.entropy > 2; i++) {
      const cell = this.uncollapsedCells[i];

      if (cell.entropy < lowestEntropyCell.entropy) {
        lowestEntropyCell = cell;
        this.lowestEntropyCellIndex = i;
      }
    }

    return lowestEntropyCell;
  };
}
