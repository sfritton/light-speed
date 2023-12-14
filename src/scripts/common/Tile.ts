export type TileName = 'FOREST' | 'GRASS' | 'BEACH' | 'WATER' | 'DEEP_WATER';

export interface Tile {
  name: TileName;
  weight: number;
  color: string;
  validNeighbors: TileName[];
}

export const TILES: Record<TileName, Tile> = {
  FOREST: {
    name: 'FOREST',
    color: '#227700',
    weight: 3,
    validNeighbors: ['FOREST', 'GRASS'],
  },
  GRASS: {
    name: 'GRASS',
    color: '#88aa22',
    weight: 4,
    validNeighbors: ['FOREST', 'GRASS', 'BEACH'],
  },
  BEACH: {
    name: 'BEACH',
    color: '#ddcc88',
    weight: 4,
    validNeighbors: ['GRASS', 'BEACH', 'WATER'],
  },
  WATER: {
    name: 'WATER',
    color: '#8888ff',
    weight: 1,
    validNeighbors: ['BEACH', 'WATER', 'DEEP_WATER'],
  },
  DEEP_WATER: {
    name: 'DEEP_WATER',
    color: '#4466cc',
    weight: 3,
    validNeighbors: ['WATER', 'DEEP_WATER'],
  },
};

export type SocketTileName =
  | 'FLOOR'
  | 'WALL'
  | 'WALL_TWO'
  | 'TOP_LEFT'
  | 'TOP'
  | 'TOP_RIGHT'
  | 'RIGHT'
  | 'BOTTOM_RIGHT'
  | 'BOTTOM'
  | 'BOTTOM_LEFT'
  | 'LEFT'
  | 'PILLAR_TOP_LEFT'
  | 'PILLAR_TOP_RIGHT'
  | 'PILLAR_BOTTOM_LEFT'
  | 'PILLAR_BOTTOM_RIGHT'
  | 'LEDGE_TOP_LEFT'
  | 'LEDGE_TOP'
  | 'LEDGE_TOP_RIGHT'
  | 'LEDGE_RIGHT'
  | 'LEDGE_BOTTOM_RIGHT'
  | 'LEDGE_BOTTOM'
  | 'LEDGE_BOTTOM_LEFT'
  | 'LEDGE_LEFT'
  | 'LEDGE_PILLAR_TOP_LEFT'
  | 'LEDGE_PILLAR_TOP_RIGHT'
  | 'LEDGE_PILLAR_BOTTOM_LEFT'
  | 'LEDGE_PILLAR_BOTTOM_RIGHT'
  | 'LEDGE_LEFT_RAMP_TOP'
  | 'LEDGE_RIGHT_RAMP_TOP'
  | 'LEDGE_TOP_RAMP_LEFT'
  | 'LEDGE_TOP_RAMP_RIGHT'
  | 'LEDGE_BOTTOM_RAMP_LEFT'
  | 'LEDGE_BOTTOM_RAMP_RIGHT'
  | 'LEDGE_LEFT_RAMP_BOTTOM'
  | 'LEDGE_RIGHT_RAMP_BOTTOM';

export type SocketNameVertical =
  | 'WALL'
  | 'FLOOR'
  | 'WALL_BOTTOM'
  | 'WALL_TOP'
  | 'LEDGE_BOTTOM'
  | 'LEDGE_TOP';
export type SocketNameHorizontal =
  | 'WALL'
  | 'FLOOR'
  | 'WALL_LEFT'
  | 'WALL_RIGHT'
  | 'LEDGE_LEFT'
  | 'LEDGE_RIGHT';
export interface SocketTile {
  name: SocketTileName;
  weight: number;
  sockets: {
    top: SocketNameHorizontal;
    bottom: SocketNameHorizontal;
    left: SocketNameVertical;
    right: SocketNameVertical;
  };
}

export const CAVE_TILES: Record<SocketTileName, SocketTile> = {
  TOP_LEFT: {
    name: 'TOP_LEFT',
    weight: 1,
    sockets: {
      top: 'WALL',
      bottom: 'WALL_LEFT',
      left: 'WALL',
      right: 'WALL_TOP',
    },
  },
  TOP: {
    name: 'TOP',
    weight: 1,
    sockets: {
      top: 'WALL',
      bottom: 'FLOOR',
      left: 'WALL_TOP',
      right: 'WALL_TOP',
    },
  },
  TOP_RIGHT: {
    name: 'TOP_RIGHT',
    weight: 1,
    sockets: {
      top: 'WALL',
      bottom: 'WALL_RIGHT',
      left: 'WALL_TOP',
      right: 'WALL',
    },
  },
  LEFT: {
    name: 'LEFT',
    weight: 1,
    sockets: {
      top: 'WALL_LEFT',
      bottom: 'WALL_LEFT',
      left: 'WALL',
      right: 'FLOOR',
    },
  },
  FLOOR: {
    name: 'FLOOR',
    weight: 20,
    sockets: {
      top: 'FLOOR',
      bottom: 'FLOOR',
      left: 'FLOOR',
      right: 'FLOOR',
    },
  },
  RIGHT: {
    name: 'RIGHT',
    weight: 1,
    sockets: {
      top: 'WALL_RIGHT',
      bottom: 'WALL_RIGHT',
      left: 'FLOOR',
      right: 'WALL',
    },
  },
  BOTTOM_LEFT: {
    name: 'BOTTOM_LEFT',
    weight: 1,
    sockets: {
      top: 'WALL_LEFT',
      bottom: 'WALL',
      left: 'WALL',
      right: 'WALL_BOTTOM',
    },
  },
  BOTTOM: {
    name: 'BOTTOM',
    weight: 1,
    sockets: {
      top: 'FLOOR',
      bottom: 'WALL',
      left: 'WALL_BOTTOM',
      right: 'WALL_BOTTOM',
    },
  },
  BOTTOM_RIGHT: {
    name: 'BOTTOM_RIGHT',
    weight: 1,
    sockets: {
      top: 'WALL_RIGHT',
      bottom: 'WALL',
      left: 'WALL_BOTTOM',
      right: 'WALL',
    },
  },
  WALL: {
    name: 'WALL',
    weight: 4,
    sockets: {
      top: 'WALL',
      bottom: 'WALL',
      left: 'WALL',
      right: 'WALL',
    },
  },
  WALL_TWO: {
    name: 'WALL_TWO',
    weight: 1,
    sockets: {
      top: 'WALL',
      bottom: 'WALL',
      left: 'WALL',
      right: 'WALL',
    },
  },
  PILLAR_BOTTOM_LEFT: {
    name: 'PILLAR_BOTTOM_LEFT',
    weight: 1,
    sockets: {
      top: 'FLOOR',
      bottom: 'WALL_LEFT',
      left: 'WALL_BOTTOM',
      right: 'FLOOR',
    },
  },
  PILLAR_BOTTOM_RIGHT: {
    name: 'PILLAR_BOTTOM_RIGHT',
    weight: 1,
    sockets: {
      top: 'FLOOR',
      bottom: 'WALL_RIGHT',
      left: 'FLOOR',
      right: 'WALL_BOTTOM',
    },
  },
  PILLAR_TOP_LEFT: {
    name: 'PILLAR_TOP_LEFT',
    weight: 1,
    sockets: {
      top: 'WALL_LEFT',
      bottom: 'FLOOR',
      left: 'WALL_TOP',
      right: 'FLOOR',
    },
  },
  PILLAR_TOP_RIGHT: {
    name: 'PILLAR_TOP_RIGHT',
    weight: 1,
    sockets: {
      top: 'WALL_RIGHT',
      bottom: 'FLOOR',
      left: 'FLOOR',
      right: 'WALL_TOP',
    },
  },
  LEDGE_TOP_LEFT: {
    name: 'LEDGE_TOP_LEFT',
    weight: 1,
    sockets: {
      top: 'FLOOR',
      bottom: 'LEDGE_LEFT',
      left: 'FLOOR',
      right: 'LEDGE_TOP',
    },
  },
  LEDGE_TOP: {
    name: 'LEDGE_TOP',
    weight: 1,
    sockets: {
      top: 'FLOOR',
      bottom: 'FLOOR',
      left: 'LEDGE_TOP',
      right: 'LEDGE_TOP',
    },
  },
  LEDGE_TOP_RIGHT: {
    name: 'LEDGE_TOP_RIGHT',
    weight: 1,
    sockets: {
      top: 'FLOOR',
      bottom: 'LEDGE_RIGHT',
      left: 'LEDGE_TOP',
      right: 'FLOOR',
    },
  },
  LEDGE_LEFT: {
    name: 'LEDGE_LEFT',
    weight: 1,
    sockets: {
      top: 'LEDGE_LEFT',
      bottom: 'LEDGE_LEFT',
      left: 'FLOOR',
      right: 'FLOOR',
    },
  },
  LEDGE_RIGHT: {
    name: 'LEDGE_RIGHT',
    weight: 1,
    sockets: {
      top: 'LEDGE_RIGHT',
      bottom: 'LEDGE_RIGHT',
      left: 'FLOOR',
      right: 'FLOOR',
    },
  },
  LEDGE_BOTTOM_LEFT: {
    name: 'LEDGE_BOTTOM_LEFT',
    weight: 1,
    sockets: {
      top: 'LEDGE_LEFT',
      bottom: 'FLOOR',
      left: 'FLOOR',
      right: 'LEDGE_BOTTOM',
    },
  },
  LEDGE_BOTTOM: {
    name: 'LEDGE_BOTTOM',
    weight: 1,
    sockets: {
      top: 'FLOOR',
      bottom: 'FLOOR',
      left: 'LEDGE_BOTTOM',
      right: 'LEDGE_BOTTOM',
    },
  },
  LEDGE_BOTTOM_RIGHT: {
    name: 'LEDGE_BOTTOM_RIGHT',
    weight: 1,
    sockets: {
      top: 'LEDGE_RIGHT',
      bottom: 'FLOOR',
      left: 'LEDGE_BOTTOM',
      right: 'FLOOR',
    },
  },
  LEDGE_PILLAR_BOTTOM_LEFT: {
    name: 'LEDGE_PILLAR_BOTTOM_LEFT',
    weight: 1,
    sockets: {
      top: 'FLOOR',
      bottom: 'LEDGE_LEFT',
      left: 'LEDGE_BOTTOM',
      right: 'FLOOR',
    },
  },
  LEDGE_PILLAR_BOTTOM_RIGHT: {
    name: 'LEDGE_PILLAR_BOTTOM_RIGHT',
    weight: 1,
    sockets: {
      top: 'FLOOR',
      bottom: 'LEDGE_RIGHT',
      left: 'FLOOR',
      right: 'LEDGE_BOTTOM',
    },
  },
  LEDGE_PILLAR_TOP_LEFT: {
    name: 'LEDGE_PILLAR_TOP_LEFT',
    weight: 1,
    sockets: {
      top: 'LEDGE_LEFT',
      bottom: 'FLOOR',
      left: 'LEDGE_TOP',
      right: 'FLOOR',
    },
  },
  LEDGE_PILLAR_TOP_RIGHT: {
    name: 'LEDGE_PILLAR_TOP_RIGHT',
    weight: 1,
    sockets: {
      top: 'LEDGE_RIGHT',
      bottom: 'FLOOR',
      left: 'FLOOR',
      right: 'LEDGE_TOP',
    },
  },
  LEDGE_TOP_RAMP_LEFT: {
    name: 'LEDGE_TOP_RAMP_LEFT',
    weight: 0,
    sockets: {
      top: 'FLOOR',
      bottom: 'FLOOR',
      left: 'FLOOR',
      right: 'LEDGE_TOP',
    },
  },
  LEDGE_TOP_RAMP_RIGHT: {
    name: 'LEDGE_TOP_RAMP_RIGHT',
    weight: 0,
    sockets: {
      top: 'FLOOR',
      bottom: 'FLOOR',
      right: 'FLOOR',
      left: 'LEDGE_TOP',
    },
  },
  LEDGE_BOTTOM_RAMP_LEFT: {
    name: 'LEDGE_BOTTOM_RAMP_LEFT',
    weight: 0,
    sockets: {
      top: 'FLOOR',
      bottom: 'FLOOR',
      left: 'FLOOR',
      right: 'LEDGE_BOTTOM',
    },
  },
  LEDGE_BOTTOM_RAMP_RIGHT: {
    name: 'LEDGE_BOTTOM_RAMP_RIGHT',
    weight: 0,
    sockets: {
      top: 'FLOOR',
      bottom: 'FLOOR',
      right: 'FLOOR',
      left: 'LEDGE_BOTTOM',
    },
  },
  LEDGE_LEFT_RAMP_TOP: {
    name: 'LEDGE_LEFT_RAMP_TOP',
    weight: 0,
    sockets: {
      top: 'FLOOR',
      bottom: 'LEDGE_LEFT',
      left: 'FLOOR',
      right: 'FLOOR',
    },
  },
  LEDGE_LEFT_RAMP_BOTTOM: {
    name: 'LEDGE_LEFT_RAMP_BOTTOM',
    weight: 0,
    sockets: {
      top: 'LEDGE_LEFT',
      bottom: 'FLOOR',
      left: 'FLOOR',
      right: 'FLOOR',
    },
  },
  LEDGE_RIGHT_RAMP_TOP: {
    name: 'LEDGE_RIGHT_RAMP_TOP',
    weight: 0,
    sockets: {
      top: 'FLOOR',
      bottom: 'LEDGE_RIGHT',
      left: 'FLOOR',
      right: 'FLOOR',
    },
  },
  LEDGE_RIGHT_RAMP_BOTTOM: {
    name: 'LEDGE_RIGHT_RAMP_BOTTOM',
    weight: 0,
    sockets: {
      top: 'LEDGE_RIGHT',
      bottom: 'FLOOR',
      left: 'FLOOR',
      right: 'FLOOR',
    },
  },
};
