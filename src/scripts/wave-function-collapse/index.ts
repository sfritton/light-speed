import { Cell } from './Cell';
import { CAVE_TILES, SocketTileName } from './Tile';
import { WaveFunctionCollapse } from './WaveFunctionCollapse';

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;
const CELL_SIZE = 32;
const ROWS = Math.floor(CANVAS_WIDTH / CELL_SIZE);
const COLUMNS = Math.floor(CANVAS_HEIGHT / CELL_SIZE);
const GRAYS = Object.keys(CAVE_TILES).map((_, i) => {
  const brightness = 255 - i * 10;

  return `rgb(${brightness} ${brightness} ${brightness})`;
});

const canvas = document.querySelector<HTMLCanvasElement>('canvas.wfc');
const context = canvas?.getContext('2d');

const image_bottom = document.getElementById('bottom');
const image_bottom_left = document.getElementById('bottom_left');
const image_bottom_right = document.getElementById('bottom_right');
const image_floor = document.getElementById('floor');
const image_left = document.getElementById('left');
const image_right = document.getElementById('right');
const image_top = document.getElementById('top');
const image_top_left = document.getElementById('top_left');
const image_top_right = document.getElementById('top_right');
const image_wall = document.getElementById('wall');
const image_wall_two = document.getElementById('wall_two');
const image_pillar_top_left = document.getElementById('pillar_top_left');
const image_pillar_top_right = document.getElementById('pillar_top_right');
const image_pillar_bottom_left = document.getElementById('pillar_bottom_left');
const image_pillar_bottom_right = document.getElementById('pillar_bottom_right');
const image_ledge_top_left = document.getElementById('ledge_top_left');
const image_ledge_top = document.getElementById('ledge_top');
const image_ledge_top_right = document.getElementById('ledge_top_right');
const image_ledge_pillar_bottom_left = document.getElementById('ledge_pillar_bottom_left');
const image_ledge_pillar_bottom_right = document.getElementById('ledge_pillar_bottom_right');
const image_ledge_pillar_top_left = document.getElementById('ledge_pillar_top_left');
const image_ledge_pillar_top_right = document.getElementById('ledge_pillar_top_right');
const image_ledge_left = document.getElementById('ledge_left');
const image_ledge_right = document.getElementById('ledge_right');
const image_ledge_bottom_left = document.getElementById('ledge_bottom_left');
const image_ledge_bottom = document.getElementById('ledge_bottom');
const image_ledge_bottom_right = document.getElementById('ledge_bottom_right');
const image_ledge_left_ramp_top = document.getElementById('ledge_left_ramp_top');
const image_ledge_right_ramp_top = document.getElementById('ledge_right_ramp_top');
const image_ledge_top_ramp_left = document.getElementById('ledge_top_ramp_left');
const image_ledge_top_ramp_right = document.getElementById('ledge_top_ramp_right');
const image_ledge_bottom_ramp_left = document.getElementById('ledge_bottom_ramp_left');
const image_ledge_bottom_ramp_right = document.getElementById('ledge_bottom_ramp_right');
const image_ledge_left_ramp_bottom = document.getElementById('ledge_left_ramp_bottom');
const image_ledge_right_ramp_bottom = document.getElementById('ledge_right_ramp_bottom');

const FILL_STYLES: Record<SocketTileName, HTMLElement | null> = {
  BOTTOM: image_bottom,
  BOTTOM_LEFT: image_bottom_left,
  BOTTOM_RIGHT: image_bottom_right,
  FLOOR: image_floor,
  LEFT: image_left,
  RIGHT: image_right,
  TOP: image_top,
  TOP_LEFT: image_top_left,
  TOP_RIGHT: image_top_right,
  WALL: image_wall,
  WALL_TWO: image_wall_two,
  PILLAR_TOP_LEFT: image_pillar_top_left,
  PILLAR_TOP_RIGHT: image_pillar_top_right,
  PILLAR_BOTTOM_LEFT: image_pillar_bottom_left,
  PILLAR_BOTTOM_RIGHT: image_pillar_bottom_right,
  LEDGE_BOTTOM: image_ledge_bottom,
  LEDGE_BOTTOM_LEFT: image_ledge_bottom_left,
  LEDGE_BOTTOM_RIGHT: image_ledge_bottom_right,
  LEDGE_LEFT: image_ledge_left,
  LEDGE_RIGHT: image_ledge_right,
  LEDGE_TOP: image_ledge_top,
  LEDGE_TOP_LEFT: image_ledge_top_left,
  LEDGE_TOP_RIGHT: image_ledge_top_right,
  LEDGE_PILLAR_TOP_LEFT: image_ledge_pillar_top_left,
  LEDGE_PILLAR_TOP_RIGHT: image_ledge_pillar_top_right,
  LEDGE_PILLAR_BOTTOM_LEFT: image_ledge_pillar_bottom_left,
  LEDGE_PILLAR_BOTTOM_RIGHT: image_ledge_pillar_bottom_right,
  LEDGE_LEFT_RAMP_TOP: image_ledge_left_ramp_top,
  LEDGE_RIGHT_RAMP_TOP: image_ledge_right_ramp_top,
  LEDGE_TOP_RAMP_LEFT: image_ledge_top_ramp_left,
  LEDGE_TOP_RAMP_RIGHT: image_ledge_top_ramp_right,
  LEDGE_BOTTOM_RAMP_LEFT: image_ledge_bottom_ramp_left,
  LEDGE_BOTTOM_RAMP_RIGHT: image_ledge_bottom_ramp_right,
  LEDGE_LEFT_RAMP_BOTTOM: image_ledge_left_ramp_bottom,
  LEDGE_RIGHT_RAMP_BOTTOM: image_ledge_right_ramp_bottom,
};

const drawCell = (cell: Cell) => {
  if (!context) return;
  const x = cell.x * CELL_SIZE;
  const y = cell.y * CELL_SIZE;

  if (cell.isCollapsed) {
    const image = FILL_STYLES[CAVE_TILES[cell.domain[0]].name];
    context.drawImage(image, x, y, CELL_SIZE, CELL_SIZE);
    return;
  }

  context.fillStyle = GRAYS[cell.domain.length - 1];
  context.fillRect(x, y, CELL_SIZE, CELL_SIZE);

  context.fillStyle = '#000';
  // context.fillText(`${cell.domain.length}`, x + CELL_SIZE / 2, y + CELL_SIZE / 2);
};

const drawGrid = (cells: Cell[]) => {
  if (!context) return;
  context.textAlign = 'center';
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  cells.forEach((cell) => drawCell(cell));
};

const wfc = new WaveFunctionCollapse(drawGrid, ROWS, COLUMNS);

wfc.run(true);
