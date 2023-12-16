import { Cell as CellWfc } from './wave-function-collapse/Cell';
import { CAVE_TILES, SocketTileName } from './common/Tile';
import { WaveFunctionCollapse } from './wave-function-collapse/WaveFunctionCollapse';
import { FILL_STYLES } from './common/images';
import { CellularAutomata, CellularAutomataCell } from './cellular-automata/CellularAutomata';

type Cell = CellWfc | CellularAutomataCell;

const SPEED = 16;
const ZOOM_LEVEL = 1;
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;
const CELL_SIZE = 16;
const ROWS = Math.floor((CANVAS_WIDTH / CELL_SIZE) * ZOOM_LEVEL);
const COLUMNS = Math.floor((CANVAS_HEIGHT / CELL_SIZE) * ZOOM_LEVEL);
const GRAYS = Object.keys(CAVE_TILES).map((_, i) => {
  const brightness = 255 - i * 10;

  return `rgb(${brightness} ${brightness} ${brightness})`;
});

const canvas = document.querySelector<HTMLCanvasElement>('canvas.wfc');
const context = canvas?.getContext('2d');
let offsetX = 0;
let offsetY = 0;

const drawCell = (cell: Cell) => {
  if (!context) return;
  const x = cell.x * CELL_SIZE - offsetX;
  const y = cell.y * CELL_SIZE - offsetY;

  if (!(cell instanceof CellWfc)) {
    const image = FILL_STYLES[cell.tileName];

    if (!(image instanceof HTMLImageElement)) return;

    context.drawImage(image, x, y, CELL_SIZE, CELL_SIZE);
    // if (cell.x % 2 === 1 && cell.y % 2 === 1) {
    // context.lineWidth = 1;
    // context.strokeStyle = '#000';
    // context.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
    // context.fillStyle = cell.tileName === 'WALL' ? 'black' : 'white';
    // context.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
    // }
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

const drawPlayer = () => {
  if (!context) return;

  context.fillStyle = '#000';
  context.fillRect(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CELL_SIZE, CELL_SIZE);
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
  context.fillStyle = '#885445';
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  cells.forEach((cell) => drawCell(cell));

  // drawStepCount(stepCount);
  // drawPlayer();
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
  // ca?.step(3);
  ca?.cleanup();
  ca?.draw();
});

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

// document.addEventListener('keydown', (e) => {
//   if (!activeKeySet.has(e.key)) return;
//   activeKeys[e.key] = true;
//   const MIN_X = CANVAS_WIDTH / -2;
//   const MIN_Y = CANVAS_HEIGHT / -2;
//   const MAX_X = CANVAS_WIDTH * (ZOOM_LEVEL - 0.5) - CELL_SIZE;
//   const MAX_Y = CANVAS_HEIGHT * (ZOOM_LEVEL - 0.5) - CELL_SIZE;
//   switch (e.key) {
//     case 'ArrowRight':
//       e.preventDefault();
//       offsetX += SPEED;
//       if (offsetX > MAX_X) {
//         offsetX = MAX_X;
//       }
//       break;
//     case 'ArrowLeft':
//       e.preventDefault();
//       offsetX -= SPEED;
//       if (offsetX < MIN_X) offsetX = MIN_X;
//       break;
//     case 'ArrowDown':
//       e.preventDefault();
//       offsetY += SPEED;
//       if (offsetY > MAX_Y) offsetY = MAX_Y;
//       break;
//     case 'ArrowUp':
//       e.preventDefault();
//       offsetY -= SPEED;
//       if (offsetY < MIN_Y) offsetY = MIN_Y;
//       break;
//   }
//   ca?.draw();
// });

const activeKeys = {
  ArrowRight: 0,
  ArrowLeft: 0,
  ArrowUp: 0,
  ArrowDown: 0,
};

const activeKeySet = new Set(Object.keys(activeKeys));

document.addEventListener('keyup', (e) => {
  if (!activeKeySet.has(e.key)) return;
  e.preventDefault();
  activeKeys[e.key] = 0;
});

document.addEventListener('keydown', (e) => {
  if (!activeKeySet.has(e.key)) return;
  e.preventDefault();
  activeKeys[e.key] = 1;
});

const move = () => {
  const upForce = activeKeys.ArrowUp;
  const downForce = activeKeys.ArrowDown;
  const leftForce = activeKeys.ArrowLeft;
  const rightForce = activeKeys.ArrowRight;

  const verticalForce = downForce - upForce;
  const horizontalForce = rightForce - leftForce;
  // TODO: convert to movement, call once per frame
};
