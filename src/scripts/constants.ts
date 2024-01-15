import { CAVE_TILES } from './common/Tile';

export const CANVAS_WIDTH = 1024;
export const CANVAS_HEIGHT = 768;
export const CELL_SIZE = 32;
export const ROWS = Math.floor(CANVAS_WIDTH / CELL_SIZE);
export const COLUMNS = Math.floor(CANVAS_HEIGHT / CELL_SIZE);
export const TILE_SIZE = 64;

const caveTileKeys = Object.keys(CAVE_TILES);
export const GRAYS = caveTileKeys.map((_, i) => {
  const brightness = 255 - i * (255 / (caveTileKeys.length - 1));

  return `rgb(${brightness} ${brightness} ${brightness})`;
});
