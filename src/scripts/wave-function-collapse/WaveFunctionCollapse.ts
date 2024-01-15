import { CellRenderDetails } from '../common/types';
import { Cell } from './Cell';

const ZONE_WIDTH = 16;
const ZONE_HEIGHT = 12;

function shuffleArray(array: any[], rng: () => number) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
export class WaveFunctionCollapse {
  gridWidth: number;
  gridHeight: number;
  startTime = 0;
  draw: () => void;
  cells: Cell[];
  uncollapsedCells: Cell[];
  currentZone: Cell[];
  lowestEntropyCellIndex = 0;
  rng: () => number;

  constructor(
    draw: (cells: CellRenderDetails[]) => void,
    rng: () => number,
    gridWidth: number,
    gridHeight = gridWidth,
  ) {
    this.draw = () => draw(this.cells);
    this.rng = rng;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.cells = [...new Array(gridWidth * gridHeight)].map(
      (_, i) => new Cell(i % gridWidth, Math.floor(i / gridWidth), this.rng, gridWidth, gridHeight),
    );
    this.cells.forEach((cell) => cell.setNeighbors(this.cells));
    this.setCurrentZone(0, 0);
  }

  setCurrentZone(x: number, y: number) {
    this.currentZone = this.cells.filter(
      (cell) => cell.x >= x && cell.x < x + ZONE_WIDTH && cell.y >= y && cell.y < y + ZONE_HEIGHT,
      [],
    );
    this.uncollapsedCells = this.currentZone.filter((cell) => !cell.isCollapsed);
    shuffleArray(this.uncollapsedCells, this.rng);
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

      for (let y = 0; y < this.gridHeight; y += ZONE_HEIGHT) {
        for (let x = 0; x < this.gridWidth; x += ZONE_WIDTH) {
          this.runZone(x, y);
        }
      }
      console.log(`Finished in ${new Date().getTime() - this.startTime}ms`);
    } finally {
      this.draw();
    }
  };

  runAsync = async () => {
    for (let y = 0; y < this.gridHeight; y += ZONE_HEIGHT) {
      for (let x = 0; x < this.gridWidth; x += ZONE_WIDTH) {
        await this.runZoneAsync(x, y);
      }
    }
    this.draw();
    console.log(`Finished in ${new Date().getTime() - this.startTime}ms`);
  };

  runZone = (x: number, y: number) => {
    this.setCurrentZone(x, y);
    // choose random cell and collapse
    const index = Math.floor(this.rng() * this.uncollapsedCells.length);
    const cell = this.uncollapsedCells[index];
    cell.collapse();

    // Step through the zone until all of its cells are collapsed
    this.step();
  };

  runZoneAsync = async (x: number, y: number) => {
    this.setCurrentZone(x, y);
    // choose random cell and collapse
    const index = Math.floor(this.rng() * this.uncollapsedCells.length);
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
