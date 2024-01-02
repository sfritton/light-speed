import { TileName } from './Tile';

const imageCaveTiles = document.getElementById('cave_tiles') as HTMLImageElement | null;

export const FILL_STYLES: Record<
  TileName,
  { image: HTMLImageElement | null; x: number; y: number }
> = {
  TOP_LEFT: { x: 0, y: 0, image: imageCaveTiles },
  TOP: { x: 1, y: 0, image: imageCaveTiles },
  TOP_RIGHT: { x: 2, y: 0, image: imageCaveTiles },
  PILLAR_BOTTOM_RIGHT: { x: 3, y: 0, image: imageCaveTiles },
  PILLAR_BOTTOM_LEFT: { x: 5, y: 0, image: imageCaveTiles },
  LEFT: { x: 0, y: 1, image: imageCaveTiles },
  FLOOR: { x: 1, y: 1, image: imageCaveTiles },
  RIGHT: { x: 2, y: 1, image: imageCaveTiles },
  PILLAR_TOP_RIGHT: { x: 3, y: 2, image: imageCaveTiles },
  PILLAR_TOP_LEFT: { x: 5, y: 2, image: imageCaveTiles },
  BOTTOM_LEFT: { x: 0, y: 2, image: imageCaveTiles },
  BOTTOM: { x: 1, y: 2, image: imageCaveTiles },
  BOTTOM_RIGHT: { x: 2, y: 2, image: imageCaveTiles },
  WALL: { x: 4, y: 1, image: imageCaveTiles },
  WALL_TWO: { x: 6, y: 2, image: imageCaveTiles },
  DIAGONAL_BL_TO_TR: { x: 6, y: 0, image: imageCaveTiles },
  DIAGONAL_BR_TO_TL: { x: 6, y: 1, image: imageCaveTiles },
};
