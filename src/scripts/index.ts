import { Cell as CellWfc } from './wave-function-collapse/Cell';
import { CAVE_TILES, SocketTileName } from './common/Tile';
import { WaveFunctionCollapse } from './wave-function-collapse/WaveFunctionCollapse';
import { FILL_STYLES } from './common/images';
import { CellularAutomata, CellularAutomataCell } from './cellular-automata/CellularAutomata';

type Cell = CellWfc | CellularAutomataCell;

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;
const CELL_SIZE = 8;
const ROWS = Math.floor(CANVAS_WIDTH / CELL_SIZE);
const COLUMNS = Math.floor(CANVAS_HEIGHT / CELL_SIZE);
const GRAYS = Object.keys(CAVE_TILES).map((_, i) => {
  const brightness = 255 - i * 10;

  return `rgb(${brightness} ${brightness} ${brightness})`;
});

const canvas = document.querySelector<HTMLCanvasElement>('canvas.wfc');
const context = canvas?.getContext('2d');

const drawCell = (cell: Cell) => {
  if (!context) return;
  const x = cell.x * CELL_SIZE;
  const y = cell.y * CELL_SIZE;

  if (!(cell instanceof CellWfc)) {
    // const image = cell.isFloor ? FILL_STYLES.FLOOR : FILL_STYLES.WALL;

    // if (!(image instanceof HTMLImageElement)) return;

    // context.drawImage(image, x, y, CELL_SIZE, CELL_SIZE);
    context.fillStyle = cell.isFloor ? '#d2bdb5' : '#885545';
    context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
    // context.fillStyle = '#000';
    // context.fillText(`${cell.x},${cell.y}`, x + CELL_SIZE / 2, y + CELL_SIZE * 0.6);
    return;
  }

  if (cell.isCollapsed) {
    const image = FILL_STYLES[CAVE_TILES[cell.domain[0]].name];
    context.drawImage(image, x, y, CELL_SIZE, CELL_SIZE);
    return;
  }

  context.fillStyle = GRAYS[cell.domain.length - 1];
  context.fillRect(x, y, CELL_SIZE, CELL_SIZE);

  // context.fillStyle = '#000';
  // context.fillText(`${cell.domain.length}`, x + CELL_SIZE / 2, y + CELL_SIZE / 2);
};

const drawStepCount = (stepCount: number) => {
  if (!context) return;

  const PADDING = 16;

  context.font = '20px sans-serif';
  context.fillStyle = '#fff';
  context.strokeStyle = '#000';
  context.lineWidth = 4;
  context.textAlign = 'right';
  context.strokeText(`Step: ${stepCount}`, CANVAS_WIDTH - PADDING, PADDING + 20);
  context.fillText(`Step: ${stepCount}`, CANVAS_WIDTH - PADDING, PADDING + 20);
};

const drawGrid = (cells: Cell[], stepCount: number) => {
  if (!context) return;
  context.textAlign = 'center';
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  cells.forEach((cell) => drawCell(cell));

  drawStepCount(stepCount);
};

const regenerateButton = document.getElementById('regenerate') as HTMLButtonElement | null;
const stepButton = document.getElementById('step') as HTMLButtonElement | null;

let ca: CellularAutomata | undefined;

const generateCave = async () => {
  if (regenerateButton) regenerateButton.disabled = true;
  if (stepButton) stepButton.disabled = true;
  // const wfc = new WaveFunctionCollapse(drawGrid, ROWS, COLUMNS);
  // await wfc.run(true);
  ca = new CellularAutomata(drawGrid, ROWS, COLUMNS);
  ca.run();
  ca.draw();
  if (regenerateButton) regenerateButton.disabled = false;
  if (stepButton) stepButton.disabled = false;
};

generateCave();

stepButton?.addEventListener('click', () => {
  ca?.step(3);
  ca?.draw();
});

regenerateButton?.addEventListener('click', () => {
  generateCave();
});
