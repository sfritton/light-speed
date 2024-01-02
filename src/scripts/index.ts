import { CAVE_TILES } from './common/Tile';
import { WaveFunctionCollapse } from './wave-function-collapse/WaveFunctionCollapse';
import { FILL_STYLES } from './common/images';
import { CellularAutomata } from './cellular-automata/CellularAutomata';
import { CellRenderDetails } from './common/types';

const ZOOM_LEVEL = 1;
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;
const CELL_SIZE = 32;
const ROWS = Math.floor((CANVAS_WIDTH / CELL_SIZE) * ZOOM_LEVEL);
const COLUMNS = Math.floor((CANVAS_HEIGHT / CELL_SIZE) * ZOOM_LEVEL);
const TILE_SIZE = 64;
const GRAYS = Object.keys(CAVE_TILES).map((_, i) => {
  const brightness = 255 - i * 10;

  return `rgb(${brightness} ${brightness} ${brightness})`;
});

const canvas = document.querySelector<HTMLCanvasElement>('canvas.wfc');
const context = canvas?.getContext('2d');

const drawCell = (cell: CellRenderDetails) => {
  if (!context) return;
  const x = cell.x * CELL_SIZE;
  const y = cell.y * CELL_SIZE;

  // Wave Function Collapse - uncollapsed cell
  if (cell.entropy > 1) {
    context.fillStyle = GRAYS[cell.entropy - 1];
    context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
  }

  if (!cell.tileName) return;

  const imageDetails = FILL_STYLES[cell.tileName];

  if (!imageDetails) throw new Error(`Could not find image details for ${cell.tileName}`);

  if (!imageDetails.image) return;

  context.drawImage(
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

  return;
};

const drawGrid = (cells: CellRenderDetails[]) => {
  if (!context) return;
  context.textAlign = 'center';
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fillStyle = '#8b6150';
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  cells.forEach((cell) => drawCell(cell));
};

const regenerateButton = document.getElementById('regenerate') as HTMLButtonElement | null;

let ca: CellularAutomata | undefined;

const generateCave = async () => {
  if (regenerateButton) regenerateButton.disabled = true;
  const wfc = new WaveFunctionCollapse(drawGrid, ROWS, COLUMNS);
  await wfc.run();
  // ca = new CellularAutomata(drawGrid, ROWS + 1, COLUMNS + 1);
  // ca.run();
  // ca.draw();
  if (regenerateButton) regenerateButton.disabled = false;
};

generateCave();

regenerateButton?.addEventListener('click', () => {
  generateCave();
});

canvas?.addEventListener('click', (e) => {
  var rect = canvas.getBoundingClientRect();
  const canvasX = e.clientX - rect.left;
  const canvasY = e.clientY - rect.top;

  const cellX = Math.floor(canvasX / CELL_SIZE);
  const cellY = Math.floor(canvasY / CELL_SIZE);

  if (ca) {
    const index = ca.getIndexFromCoordinates(cellX, cellY);
    console.log({
      isFloor: ca.getCell(cellX, cellY),
      neighborFloorCount: ca.getNeighborFloorCount(cellX, cellY),
      // floodResult: ca.floodFill(index),
      caveSize: ca.caveSizes[index],
    });
  }

  if (!context) return;

  context.lineWidth = 1;
  context.strokeStyle = '#0ff';
  context.strokeRect(cellX * CELL_SIZE, cellY * CELL_SIZE, CELL_SIZE, CELL_SIZE);
});
