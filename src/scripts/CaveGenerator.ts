import { FILL_STYLES } from './common/images';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CELL_SIZE,
  COLUMNS,
  GRAYS,
  ROWS,
  TILE_SIZE,
} from './constants';
import { CellRenderDetails } from './common/types';
import { CellularAutomata } from './cellular-automata/CellularAutomata';
import { WaveFunctionCollapse } from './wave-function-collapse/WaveFunctionCollapse';
import seedrandom from 'seedrandom';

export type GenerationAlgorithm = 'cellular-automata' | 'wave-function-collapse';

export class CaveGenerator {
  context: CanvasRenderingContext2D | null | undefined;
  drawCave: () => void;
  algorithm: GenerationAlgorithm;
  _showGrid: boolean = false;
  seed: string | undefined;

  constructor(
    context: CanvasRenderingContext2D | null | undefined,
    algorithm: GenerationAlgorithm = 'cellular-automata',
  ) {
    this.context = context;
    this.algorithm = algorithm;
  }

  set showGrid(showGrid: boolean) {
    this._showGrid = showGrid;

    this.drawCave();
  }

  get showGrid() {
    return this._showGrid;
  }

  drawCell = (cell: CellRenderDetails) => {
    if (!this.context) return;
    const x = cell.x * CELL_SIZE;
    const y = cell.y * CELL_SIZE;

    // Wave Function Collapse - uncollapsed cell
    if (cell.entropy > 1) {
      this.context.fillStyle = GRAYS[cell.entropy - 1];
      this.context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
    }

    if (!cell.tileName) return;

    const imageDetails = FILL_STYLES[cell.tileName];

    if (!imageDetails) throw new Error(`Could not find image details for ${cell.tileName}`);

    if (!imageDetails.image) return;

    this.context.drawImage(
      imageDetails.image,
      imageDetails.x * TILE_SIZE,
      imageDetails.y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE,
      x,
      y,
      CELL_SIZE,
      CELL_SIZE,
    );
  };

  drawGridLines = () => {
    if (!this.context || !this.showGrid) return;

    this.context.strokeStyle = '#935e4c';
    this.context.lineWidth = 0.5;
    this.context.beginPath();

    for (let x = 0; x < CANVAS_WIDTH; x += CELL_SIZE) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, CANVAS_HEIGHT);
    }

    for (let y = 0; y < CANVAS_HEIGHT; y += CELL_SIZE) {
      this.context.moveTo(0, y);
      this.context.lineTo(CANVAS_WIDTH, y);
    }

    this.context.stroke();
    this.context.closePath();
  };

  drawGrid = (cells: CellRenderDetails[]) => {
    if (!this.context) return;
    this.context.textAlign = 'center';
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.context.fillStyle = '#8b6150';
    this.context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    cells.forEach((cell) => this.drawCell(cell));

    this.drawGridLines();
  };

  generate = async () => {
    const rng = this.seed ? seedrandom(this.seed) : Math.random;

    if (this.algorithm === 'cellular-automata') {
      const ca = new CellularAutomata(this.drawGrid, rng, ROWS + 1, COLUMNS + 1);
      ca.run();
      ca.draw();
      this.drawCave = () => ca.draw();
    } else {
      const wfc = new WaveFunctionCollapse(this.drawGrid, rng, ROWS, COLUMNS);
      await wfc.run();
      this.drawCave = () => wfc.draw();
    }
  };
}
