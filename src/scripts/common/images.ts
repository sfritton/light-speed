import { SocketTileName } from './Tile';

// TODO: this could be a single image, cuz that's what spritesheets are for
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

export const FILL_STYLES: Record<SocketTileName, HTMLElement | null> = {
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

const imageCaveTiles = document.getElementById('cave_tiles') as HTMLImageElement | null;

// @ts-expect-error: Missing some tiles
export const FILL_STYLES_NEW: Record<
  SocketTileName,
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
