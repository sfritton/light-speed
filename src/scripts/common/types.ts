import { TileName } from './Tile';

export interface CellRenderDetails {
  x: number;
  y: number;
  tileName?: TileName;
  entropy: number;
}
