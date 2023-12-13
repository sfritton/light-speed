import { CAVE_TILES, SocketTileName } from './Tile';

export class Cell {
  x: number;
  y: number;
  domain: string[];
  top?: Cell;
  bottom?: Cell;
  left?: Cell;
  right?: Cell;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.domain = Object.keys(CAVE_TILES) as string[];
  }

  get isCollapsed() {
    return this.domain.length === 1;
  }

  get entropy() {
    return this.domain.length;
  }

  get neighbors(): Cell[] {
    return [this.top, this.bottom, this.left, this.right].filter((neighbor) =>
      Boolean(neighbor),
    ) as Cell[];
  }

  getPotentialSockets(direction: 'top' | 'bottom' | 'left' | 'right') {
    return this.domain.reduce<string[]>(
      (acc, tile) => [...acc, CAVE_TILES[tile].sockets[direction]],
      [],
    );
  }

  setNeighbors = (cells: Cell[], gridWidth: number, gridHeight = gridWidth) => {
    this.top = this.y === 0 ? undefined : cells[this.x + gridWidth * (this.y - 1)];
    this.bottom = this.y === gridHeight - 1 ? undefined : cells[this.x + gridWidth * (this.y + 1)];
    this.left = this.x === 0 ? undefined : cells[this.x - 1 + gridWidth * this.y];
    this.right = this.x === gridWidth - 1 ? undefined : cells[this.x + 1 + gridWidth * this.y];
  };

  updateDomain = (forceUpdateNeighbors = false) => {
    if (this.isCollapsed && !forceUpdateNeighbors) return;

    const initialDomainSize = this.domain.length;

    this.domain = this.domain.filter((tileName) => {
      const tile = CAVE_TILES[tileName as SocketTileName];

      if (this.top && !this.top?.getPotentialSockets('bottom').includes(tile.sockets.top))
        return false;
      if (this.bottom && !this.bottom?.getPotentialSockets('top').includes(tile.sockets.bottom))
        return false;
      if (this.left && !this.left?.getPotentialSockets('right').includes(tile.sockets.left))
        return false;
      if (this.right && !this.right?.getPotentialSockets('left').includes(tile.sockets.right))
        return false;
      return true;
    });

    if (this.domain.length === 0) throw new Error('Cell domain is empty!');

    // update neighbors if this cell changed
    if (forceUpdateNeighbors || this.domain.length !== initialDomainSize)
      this.neighbors.forEach((neighbor) => neighbor.updateDomain());
  };

  collapse = () => {
    // Choose a random tile from the domain, based on the weight of each tile
    const randomNumber = Math.random();
    const totalWeight = this.domain.reduce((sum, tile) => sum + CAVE_TILES[tile].weight, 0);
    let chosenTile: string | undefined = undefined;
    let runningSum = 0;

    this.domain.forEach((tile) => {
      if (chosenTile) return;
      runningSum += CAVE_TILES[tile].weight;
      if (randomNumber < runningSum / totalWeight) chosenTile = tile;
    });
    this.domain = [chosenTile ?? this.domain[0]];

    // Update neighbors
    this.updateDomain(true);
  };
}
