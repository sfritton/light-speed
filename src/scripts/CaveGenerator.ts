import { FILL_STYLES } from './common/images';
import { CANVAS_HEIGHT, CANVAS_WIDTH, GRAYS, TILE_SIZE } from './constants';
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
  _cellSize: number = 64;
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

  set cellSize(size: string | undefined) {
    switch (size) {
      case 'large':
        this._cellSize = 16;
        return;
      case 'medium':
        this._cellSize = 32;
        return;
      case 'small':
      default:
        this._cellSize = 64;
        return;
    }
  }

  get showGrid() {
    return this._showGrid;
  }

  drawCell = (cell: CellRenderDetails) => {
    if (!this.context) return;
    const x = cell.x * this._cellSize;
    const y = cell.y * this._cellSize;

    // Wave Function Collapse - uncollapsed cell
    if (cell.entropy > 1) {
      this.context.fillStyle = GRAYS[cell.entropy - 1];
      this.context.fillRect(x, y, this._cellSize, this._cellSize);
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
      this._cellSize,
      this._cellSize,
    );
  };

  drawGridLines = () => {
    if (!this.context || !this.showGrid) return;

    this.context.strokeStyle = '#333';
    this.context.lineWidth = 0.25;
    this.context.beginPath();

    for (let x = 0; x < CANVAS_WIDTH; x += this._cellSize) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, CANVAS_HEIGHT);
    }

    for (let y = 0; y < CANVAS_HEIGHT; y += this._cellSize) {
      this.context.moveTo(0, y);
      this.context.lineTo(CANVAS_WIDTH, y);
    }

    this.context.stroke();
    this.context.closePath();
  };

  drawGrid = (cells: CellRenderDetails[]) => {
    if (!this.context) return;

    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    cells.forEach((cell) => this.drawCell(cell));

    this.drawGridLines();
  };

  generate = async () => {
    const rng = this.seed ? seedrandom(this.seed) : Math.random;
    const rows = Math.floor(CANVAS_WIDTH / this._cellSize);
    const columns = Math.floor(CANVAS_HEIGHT / this._cellSize);

    if (this.algorithm === 'cellular-automata') {
      const ca = new CellularAutomata(this.drawGrid, rng, rows + 1, columns + 1);
      ca.run();
      ca.draw();
      this.drawCave = () => ca.draw();
    } else {
      const wfc = new WaveFunctionCollapse(this.drawGrid, rng, rows, columns);
      await wfc.run(true);
      this.drawCave = () => wfc.draw();
    }
  };
}
