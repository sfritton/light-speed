import { CAVE_TILES } from './common/Tile';

export const CANVAS_WIDTH = 2048;
export const CANVAS_HEIGHT = 1536;
export const TILE_SIZE = 64;

const caveTileKeys = Object.keys(CAVE_TILES);

export const GRAYS = caveTileKeys.map((_, i) => {
  const brightness = 255 - i * (255 / (caveTileKeys.length - 1));

  return `rgb(${brightness} ${brightness} ${brightness})`;
});
