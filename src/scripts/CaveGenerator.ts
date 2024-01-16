import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_IMAGE_COORDINATES, TILE_SIZE } from './constants';
import { CellularAutomata, CellRenderDetails } from './CellularAutomata';
import seedrandom from 'seedrandom';

export class CaveGenerator {
  context: CanvasRenderingContext2D | null | undefined;
  caveTilesImg: HTMLImageElement | null;
  drawCave: () => void;
  _showGrid: boolean = false;
  _cellSize: number = 64;
  seed: string | undefined;

  constructor(
    context: CanvasRenderingContext2D | null | undefined,
    caveTilesImg: HTMLImageElement | null,
  ) {
    this.context = context;
    this.caveTilesImg = caveTilesImg;
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

    if (!cell.tileName || !this.caveTilesImg) return;

    const imageCoordinates = TILE_IMAGE_COORDINATES[cell.tileName];

    if (!imageCoordinates) throw new Error(`Could not find image coordinates for ${cell.tileName}`);

    this.context.drawImage(
      this.caveTilesImg,
      imageCoordinates.x * TILE_SIZE,
      imageCoordinates.y * TILE_SIZE,
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

    const ca = new CellularAutomata(this.drawGrid, rng, rows + 1, columns + 1);
    ca.run();
    ca.draw();
    this.drawCave = () => ca.draw();
  };
}
