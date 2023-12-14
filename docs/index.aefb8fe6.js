const $442fcdd8d7a398ea$export$34ddeca23ac38a20 = {
    FOREST: {
        name: "FOREST",
        color: "#227700",
        weight: 3,
        validNeighbors: [
            "FOREST",
            "GRASS"
        ]
    },
    GRASS: {
        name: "GRASS",
        color: "#88aa22",
        weight: 4,
        validNeighbors: [
            "FOREST",
            "GRASS",
            "BEACH"
        ]
    },
    BEACH: {
        name: "BEACH",
        color: "#ddcc88",
        weight: 4,
        validNeighbors: [
            "GRASS",
            "BEACH",
            "WATER"
        ]
    },
    WATER: {
        name: "WATER",
        color: "#8888ff",
        weight: 1,
        validNeighbors: [
            "BEACH",
            "WATER",
            "DEEP_WATER"
        ]
    },
    DEEP_WATER: {
        name: "DEEP_WATER",
        color: "#4466cc",
        weight: 3,
        validNeighbors: [
            "WATER",
            "DEEP_WATER"
        ]
    }
};
const $442fcdd8d7a398ea$export$3b211992cf36885 = {
    TOP_LEFT: {
        name: "TOP_LEFT",
        weight: 1,
        sockets: {
            top: "WALL",
            bottom: "WALL_LEFT",
            left: "WALL",
            right: "WALL_TOP"
        }
    },
    TOP: {
        name: "TOP",
        weight: 1,
        sockets: {
            top: "WALL",
            bottom: "FLOOR",
            left: "WALL_TOP",
            right: "WALL_TOP"
        }
    },
    TOP_RIGHT: {
        name: "TOP_RIGHT",
        weight: 1,
        sockets: {
            top: "WALL",
            bottom: "WALL_RIGHT",
            left: "WALL_TOP",
            right: "WALL"
        }
    },
    LEFT: {
        name: "LEFT",
        weight: 1,
        sockets: {
            top: "WALL_LEFT",
            bottom: "WALL_LEFT",
            left: "WALL",
            right: "FLOOR"
        }
    },
    FLOOR: {
        name: "FLOOR",
        weight: 20,
        sockets: {
            top: "FLOOR",
            bottom: "FLOOR",
            left: "FLOOR",
            right: "FLOOR"
        }
    },
    RIGHT: {
        name: "RIGHT",
        weight: 1,
        sockets: {
            top: "WALL_RIGHT",
            bottom: "WALL_RIGHT",
            left: "FLOOR",
            right: "WALL"
        }
    },
    BOTTOM_LEFT: {
        name: "BOTTOM_LEFT",
        weight: 1,
        sockets: {
            top: "WALL_LEFT",
            bottom: "WALL",
            left: "WALL",
            right: "WALL_BOTTOM"
        }
    },
    BOTTOM: {
        name: "BOTTOM",
        weight: 1,
        sockets: {
            top: "FLOOR",
            bottom: "WALL",
            left: "WALL_BOTTOM",
            right: "WALL_BOTTOM"
        }
    },
    BOTTOM_RIGHT: {
        name: "BOTTOM_RIGHT",
        weight: 1,
        sockets: {
            top: "WALL_RIGHT",
            bottom: "WALL",
            left: "WALL_BOTTOM",
            right: "WALL"
        }
    },
    WALL: {
        name: "WALL",
        weight: 4,
        sockets: {
            top: "WALL",
            bottom: "WALL",
            left: "WALL",
            right: "WALL"
        }
    },
    WALL_TWO: {
        name: "WALL_TWO",
        weight: 1,
        sockets: {
            top: "WALL",
            bottom: "WALL",
            left: "WALL",
            right: "WALL"
        }
    },
    PILLAR_BOTTOM_LEFT: {
        name: "PILLAR_BOTTOM_LEFT",
        weight: 1,
        sockets: {
            top: "FLOOR",
            bottom: "WALL_LEFT",
            left: "WALL_BOTTOM",
            right: "FLOOR"
        }
    },
    PILLAR_BOTTOM_RIGHT: {
        name: "PILLAR_BOTTOM_RIGHT",
        weight: 1,
        sockets: {
            top: "FLOOR",
            bottom: "WALL_RIGHT",
            left: "FLOOR",
            right: "WALL_BOTTOM"
        }
    },
    PILLAR_TOP_LEFT: {
        name: "PILLAR_TOP_LEFT",
        weight: 1,
        sockets: {
            top: "WALL_LEFT",
            bottom: "FLOOR",
            left: "WALL_TOP",
            right: "FLOOR"
        }
    },
    PILLAR_TOP_RIGHT: {
        name: "PILLAR_TOP_RIGHT",
        weight: 1,
        sockets: {
            top: "WALL_RIGHT",
            bottom: "FLOOR",
            left: "FLOOR",
            right: "WALL_TOP"
        }
    },
    LEDGE_TOP_LEFT: {
        name: "LEDGE_TOP_LEFT",
        weight: 1,
        sockets: {
            top: "FLOOR",
            bottom: "LEDGE_LEFT",
            left: "FLOOR",
            right: "LEDGE_TOP"
        }
    },
    LEDGE_TOP: {
        name: "LEDGE_TOP",
        weight: 1,
        sockets: {
            top: "FLOOR",
            bottom: "FLOOR",
            left: "LEDGE_TOP",
            right: "LEDGE_TOP"
        }
    },
    LEDGE_TOP_RIGHT: {
        name: "LEDGE_TOP_RIGHT",
        weight: 1,
        sockets: {
            top: "FLOOR",
            bottom: "LEDGE_RIGHT",
            left: "LEDGE_TOP",
            right: "FLOOR"
        }
    },
    LEDGE_LEFT: {
        name: "LEDGE_LEFT",
        weight: 1,
        sockets: {
            top: "LEDGE_LEFT",
            bottom: "LEDGE_LEFT",
            left: "FLOOR",
            right: "FLOOR"
        }
    },
    LEDGE_RIGHT: {
        name: "LEDGE_RIGHT",
        weight: 1,
        sockets: {
            top: "LEDGE_RIGHT",
            bottom: "LEDGE_RIGHT",
            left: "FLOOR",
            right: "FLOOR"
        }
    },
    LEDGE_BOTTOM_LEFT: {
        name: "LEDGE_BOTTOM_LEFT",
        weight: 1,
        sockets: {
            top: "LEDGE_LEFT",
            bottom: "FLOOR",
            left: "FLOOR",
            right: "LEDGE_BOTTOM"
        }
    },
    LEDGE_BOTTOM: {
        name: "LEDGE_BOTTOM",
        weight: 1,
        sockets: {
            top: "FLOOR",
            bottom: "FLOOR",
            left: "LEDGE_BOTTOM",
            right: "LEDGE_BOTTOM"
        }
    },
    LEDGE_BOTTOM_RIGHT: {
        name: "LEDGE_BOTTOM_RIGHT",
        weight: 1,
        sockets: {
            top: "LEDGE_RIGHT",
            bottom: "FLOOR",
            left: "LEDGE_BOTTOM",
            right: "FLOOR"
        }
    },
    LEDGE_PILLAR_BOTTOM_LEFT: {
        name: "LEDGE_PILLAR_BOTTOM_LEFT",
        weight: 1,
        sockets: {
            top: "FLOOR",
            bottom: "LEDGE_LEFT",
            left: "LEDGE_BOTTOM",
            right: "FLOOR"
        }
    },
    LEDGE_PILLAR_BOTTOM_RIGHT: {
        name: "LEDGE_PILLAR_BOTTOM_RIGHT",
        weight: 1,
        sockets: {
            top: "FLOOR",
            bottom: "LEDGE_RIGHT",
            left: "FLOOR",
            right: "LEDGE_BOTTOM"
        }
    },
    LEDGE_PILLAR_TOP_LEFT: {
        name: "LEDGE_PILLAR_TOP_LEFT",
        weight: 1,
        sockets: {
            top: "LEDGE_LEFT",
            bottom: "FLOOR",
            left: "LEDGE_TOP",
            right: "FLOOR"
        }
    },
    LEDGE_PILLAR_TOP_RIGHT: {
        name: "LEDGE_PILLAR_TOP_RIGHT",
        weight: 1,
        sockets: {
            top: "LEDGE_RIGHT",
            bottom: "FLOOR",
            left: "FLOOR",
            right: "LEDGE_TOP"
        }
    },
    LEDGE_TOP_RAMP_LEFT: {
        name: "LEDGE_TOP_RAMP_LEFT",
        weight: 0,
        sockets: {
            top: "FLOOR",
            bottom: "FLOOR",
            left: "FLOOR",
            right: "LEDGE_TOP"
        }
    },
    LEDGE_TOP_RAMP_RIGHT: {
        name: "LEDGE_TOP_RAMP_RIGHT",
        weight: 0,
        sockets: {
            top: "FLOOR",
            bottom: "FLOOR",
            right: "FLOOR",
            left: "LEDGE_TOP"
        }
    },
    LEDGE_BOTTOM_RAMP_LEFT: {
        name: "LEDGE_BOTTOM_RAMP_LEFT",
        weight: 0,
        sockets: {
            top: "FLOOR",
            bottom: "FLOOR",
            left: "FLOOR",
            right: "LEDGE_BOTTOM"
        }
    },
    LEDGE_BOTTOM_RAMP_RIGHT: {
        name: "LEDGE_BOTTOM_RAMP_RIGHT",
        weight: 0,
        sockets: {
            top: "FLOOR",
            bottom: "FLOOR",
            right: "FLOOR",
            left: "LEDGE_BOTTOM"
        }
    },
    LEDGE_LEFT_RAMP_TOP: {
        name: "LEDGE_LEFT_RAMP_TOP",
        weight: 0,
        sockets: {
            top: "FLOOR",
            bottom: "LEDGE_LEFT",
            left: "FLOOR",
            right: "FLOOR"
        }
    },
    LEDGE_LEFT_RAMP_BOTTOM: {
        name: "LEDGE_LEFT_RAMP_BOTTOM",
        weight: 0,
        sockets: {
            top: "LEDGE_LEFT",
            bottom: "FLOOR",
            left: "FLOOR",
            right: "FLOOR"
        }
    },
    LEDGE_RIGHT_RAMP_TOP: {
        name: "LEDGE_RIGHT_RAMP_TOP",
        weight: 0,
        sockets: {
            top: "FLOOR",
            bottom: "LEDGE_RIGHT",
            left: "FLOOR",
            right: "FLOOR"
        }
    },
    LEDGE_RIGHT_RAMP_BOTTOM: {
        name: "LEDGE_RIGHT_RAMP_BOTTOM",
        weight: 0,
        sockets: {
            top: "LEDGE_RIGHT",
            bottom: "FLOOR",
            left: "FLOOR",
            right: "FLOOR"
        }
    }
};



class $092c7663a47c897d$export$f6f0c3fe4ec306ea {
    get isCollapsed() {
        return this.domain.length === 1;
    }
    get entropy() {
        return this.domain.length;
    }
    get neighbors() {
        return [
            this.top,
            this.bottom,
            this.left,
            this.right
        ].filter((neighbor)=>Boolean(neighbor));
    }
    getPotentialSockets(direction) {
        return this.domain.reduce((acc, tile)=>[
                ...acc,
                (0, $442fcdd8d7a398ea$export$3b211992cf36885)[tile].sockets[direction]
            ], []);
    }
    constructor(x, y){
        this.setNeighbors = (cells, gridWidth, gridHeight = gridWidth)=>{
            this.top = this.y === 0 ? undefined : cells[this.x + gridWidth * (this.y - 1)];
            this.bottom = this.y === gridHeight - 1 ? undefined : cells[this.x + gridWidth * (this.y + 1)];
            this.left = this.x === 0 ? undefined : cells[this.x - 1 + gridWidth * this.y];
            this.right = this.x === gridWidth - 1 ? undefined : cells[this.x + 1 + gridWidth * this.y];
        };
        this.updateDomain = (forceUpdateNeighbors = false)=>{
            if (this.isCollapsed && !forceUpdateNeighbors) return;
            const initialDomainSize = this.domain.length;
            this.domain = this.domain.filter((tileName)=>{
                var _this_top, _this_bottom, _this_left, _this_right;
                const tile = (0, $442fcdd8d7a398ea$export$3b211992cf36885)[tileName];
                if (this.top && !((_this_top = this.top) === null || _this_top === void 0 ? void 0 : _this_top.getPotentialSockets("bottom").includes(tile.sockets.top))) return false;
                if (this.bottom && !((_this_bottom = this.bottom) === null || _this_bottom === void 0 ? void 0 : _this_bottom.getPotentialSockets("top").includes(tile.sockets.bottom))) return false;
                if (this.left && !((_this_left = this.left) === null || _this_left === void 0 ? void 0 : _this_left.getPotentialSockets("right").includes(tile.sockets.left))) return false;
                if (this.right && !((_this_right = this.right) === null || _this_right === void 0 ? void 0 : _this_right.getPotentialSockets("left").includes(tile.sockets.right))) return false;
                return true;
            });
            if (this.domain.length === 0) throw new Error(`Cell at (${this.x}, ${this.y}) has an empty domain!`);
            // update neighbors if this cell changed
            if (forceUpdateNeighbors || this.domain.length !== initialDomainSize) this.neighbors.forEach((neighbor)=>neighbor.updateDomain());
        };
        this.collapse = ()=>{
            // Choose a random tile from the domain, based on the weight of each tile
            const randomNumber = Math.random();
            const totalWeight = this.domain.reduce((sum, tile)=>sum + (0, $442fcdd8d7a398ea$export$3b211992cf36885)[tile].weight, 0);
            let chosenTile = undefined;
            let runningSum = 0;
            this.domain.forEach((tile)=>{
                if (chosenTile) return;
                runningSum += (0, $442fcdd8d7a398ea$export$3b211992cf36885)[tile].weight;
                if (randomNumber < runningSum / totalWeight) chosenTile = tile;
            });
            this.domain = [
                chosenTile !== null && chosenTile !== void 0 ? chosenTile : this.domain[0]
            ];
            // Update neighbors
            this.updateDomain(true);
        };
        this.x = x;
        this.y = y;
        this.domain = Object.keys((0, $442fcdd8d7a398ea$export$3b211992cf36885));
    }
}


const $6b84cfb86d6c6bc6$var$ZONE_WIDTH = 16;
const $6b84cfb86d6c6bc6$var$ZONE_HEIGHT = 12;
function $6b84cfb86d6c6bc6$var$shuffleArray(array) {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [
            array[j],
            array[i]
        ];
    }
}
class $6b84cfb86d6c6bc6$export$75493ecd6c76042 {
    setCurrentZone(x, y) {
        this.currentZone = this.cells.filter((cell)=>cell.x >= x && cell.x < x + $6b84cfb86d6c6bc6$var$ZONE_WIDTH && cell.y >= y && cell.y < y + $6b84cfb86d6c6bc6$var$ZONE_HEIGHT, []);
        this.uncollapsedCells = this.currentZone.filter((cell)=>!cell.isCollapsed);
        $6b84cfb86d6c6bc6$var$shuffleArray(this.uncollapsedCells);
    }
    constructor(draw, gridWidth, gridHeight = gridWidth){
        this.startTime = 0;
        this.lowestEntropyCellIndex = 0;
        this.run = (drawSteps = false)=>{
            try {
                console.log(`Generating a ${this.gridWidth}x${this.gridHeight} grid (${this.gridWidth * this.gridHeight} cells) ...`);
                this.startTime = new Date().getTime();
                if (drawSteps) return this.runAsync();
                for(let y = 0; y < this.gridHeight; y += $6b84cfb86d6c6bc6$var$ZONE_HEIGHT)for(let x = 0; x < this.gridWidth; x += $6b84cfb86d6c6bc6$var$ZONE_WIDTH)this.runZone(x, y);
                console.log(`Finished in ${new Date().getTime() - this.startTime}ms`);
            } finally{
                this.draw();
            }
        };
        this.runAsync = async ()=>{
            for(let y = 0; y < this.gridHeight; y += $6b84cfb86d6c6bc6$var$ZONE_HEIGHT)for(let x = 0; x < this.gridWidth; x += $6b84cfb86d6c6bc6$var$ZONE_WIDTH)await this.runZoneAsync(x, y);
            this.draw();
            console.log(`Finished in ${new Date().getTime() - this.startTime}ms`);
        };
        this.runZone = (x, y)=>{
            this.setCurrentZone(x, y);
            // choose random cell and collapse
            const index = Math.floor(Math.random() * this.uncollapsedCells.length);
            const cell = this.uncollapsedCells[index];
            cell.collapse();
            // Step through the zone until all of its cells are collapsed
            this.step();
        };
        this.runZoneAsync = async (x, y)=>{
            this.setCurrentZone(x, y);
            // choose random cell and collapse
            const index = Math.floor(Math.random() * this.uncollapsedCells.length);
            const cell = this.uncollapsedCells[index];
            cell.collapse();
            // Step through the zone until all of its cells are collapsed
            await this.stepAsync();
        };
        this.step = ()=>{
            const lowestEntropyCell = this.findLowestEntropyCell();
            // There are no more cells to collapse
            if (!lowestEntropyCell) return;
            lowestEntropyCell.collapse();
            this.step();
        };
        this.stepAsync = async ()=>{
            const lowestEntropyCell = this.findLowestEntropyCell();
            // There are no more cells to collapse
            if (!lowestEntropyCell) return;
            lowestEntropyCell.collapse();
            this.draw();
            await new Promise((resolve)=>requestAnimationFrame(()=>resolve(this.stepAsync())));
        };
        this.findLowestEntropyCell = ()=>{
            this.uncollapsedCells = this.uncollapsedCells.filter((cell)=>!cell.isCollapsed);
            if (this.uncollapsedCells.length === 0) return undefined;
            let lowestEntropyCell = this.uncollapsedCells[0];
            this.lowestEntropyCellIndex = 0;
            for(let i = 0; i < this.uncollapsedCells.length && lowestEntropyCell.entropy > 2; i++){
                const cell = this.uncollapsedCells[i];
                if (cell.entropy < lowestEntropyCell.entropy) {
                    lowestEntropyCell = cell;
                    this.lowestEntropyCellIndex = i;
                }
            }
            return lowestEntropyCell;
        };
        this.draw = ()=>draw(this.cells);
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.cells = [
            ...new Array(gridWidth * gridHeight)
        ].map((_, i)=>new (0, $092c7663a47c897d$export$f6f0c3fe4ec306ea)(i % gridWidth, Math.floor(i / gridWidth)));
        this.cells.forEach((cell)=>cell.setNeighbors(this.cells, gridWidth, gridHeight));
        this.setCurrentZone(0, 0);
    }
}


const $65292ecc9a803d25$var$CANVAS_WIDTH = 1024;
const $65292ecc9a803d25$var$CANVAS_HEIGHT = 768;
const $65292ecc9a803d25$var$CELL_SIZE = 32;
const $65292ecc9a803d25$var$ROWS = Math.floor($65292ecc9a803d25$var$CANVAS_WIDTH / $65292ecc9a803d25$var$CELL_SIZE);
const $65292ecc9a803d25$var$COLUMNS = Math.floor($65292ecc9a803d25$var$CANVAS_HEIGHT / $65292ecc9a803d25$var$CELL_SIZE);
const $65292ecc9a803d25$var$GRAYS = Object.keys((0, $442fcdd8d7a398ea$export$3b211992cf36885)).map((_, i)=>{
    const brightness = 255 - i * 10;
    return `rgb(${brightness} ${brightness} ${brightness})`;
});
const $65292ecc9a803d25$var$canvas = document.querySelector("canvas.wfc");
const $65292ecc9a803d25$var$context = $65292ecc9a803d25$var$canvas === null || $65292ecc9a803d25$var$canvas === void 0 ? void 0 : $65292ecc9a803d25$var$canvas.getContext("2d");
const $65292ecc9a803d25$var$image_bottom = document.getElementById("bottom");
const $65292ecc9a803d25$var$image_bottom_left = document.getElementById("bottom_left");
const $65292ecc9a803d25$var$image_bottom_right = document.getElementById("bottom_right");
const $65292ecc9a803d25$var$image_floor = document.getElementById("floor");
const $65292ecc9a803d25$var$image_left = document.getElementById("left");
const $65292ecc9a803d25$var$image_right = document.getElementById("right");
const $65292ecc9a803d25$var$image_top = document.getElementById("top");
const $65292ecc9a803d25$var$image_top_left = document.getElementById("top_left");
const $65292ecc9a803d25$var$image_top_right = document.getElementById("top_right");
const $65292ecc9a803d25$var$image_wall = document.getElementById("wall");
const $65292ecc9a803d25$var$image_wall_two = document.getElementById("wall_two");
const $65292ecc9a803d25$var$image_pillar_top_left = document.getElementById("pillar_top_left");
const $65292ecc9a803d25$var$image_pillar_top_right = document.getElementById("pillar_top_right");
const $65292ecc9a803d25$var$image_pillar_bottom_left = document.getElementById("pillar_bottom_left");
const $65292ecc9a803d25$var$image_pillar_bottom_right = document.getElementById("pillar_bottom_right");
const $65292ecc9a803d25$var$image_ledge_top_left = document.getElementById("ledge_top_left");
const $65292ecc9a803d25$var$image_ledge_top = document.getElementById("ledge_top");
const $65292ecc9a803d25$var$image_ledge_top_right = document.getElementById("ledge_top_right");
const $65292ecc9a803d25$var$image_ledge_pillar_bottom_left = document.getElementById("ledge_pillar_bottom_left");
const $65292ecc9a803d25$var$image_ledge_pillar_bottom_right = document.getElementById("ledge_pillar_bottom_right");
const $65292ecc9a803d25$var$image_ledge_pillar_top_left = document.getElementById("ledge_pillar_top_left");
const $65292ecc9a803d25$var$image_ledge_pillar_top_right = document.getElementById("ledge_pillar_top_right");
const $65292ecc9a803d25$var$image_ledge_left = document.getElementById("ledge_left");
const $65292ecc9a803d25$var$image_ledge_right = document.getElementById("ledge_right");
const $65292ecc9a803d25$var$image_ledge_bottom_left = document.getElementById("ledge_bottom_left");
const $65292ecc9a803d25$var$image_ledge_bottom = document.getElementById("ledge_bottom");
const $65292ecc9a803d25$var$image_ledge_bottom_right = document.getElementById("ledge_bottom_right");
const $65292ecc9a803d25$var$image_ledge_left_ramp_top = document.getElementById("ledge_left_ramp_top");
const $65292ecc9a803d25$var$image_ledge_right_ramp_top = document.getElementById("ledge_right_ramp_top");
const $65292ecc9a803d25$var$image_ledge_top_ramp_left = document.getElementById("ledge_top_ramp_left");
const $65292ecc9a803d25$var$image_ledge_top_ramp_right = document.getElementById("ledge_top_ramp_right");
const $65292ecc9a803d25$var$image_ledge_bottom_ramp_left = document.getElementById("ledge_bottom_ramp_left");
const $65292ecc9a803d25$var$image_ledge_bottom_ramp_right = document.getElementById("ledge_bottom_ramp_right");
const $65292ecc9a803d25$var$image_ledge_left_ramp_bottom = document.getElementById("ledge_left_ramp_bottom");
const $65292ecc9a803d25$var$image_ledge_right_ramp_bottom = document.getElementById("ledge_right_ramp_bottom");
const $65292ecc9a803d25$var$FILL_STYLES = {
    BOTTOM: $65292ecc9a803d25$var$image_bottom,
    BOTTOM_LEFT: $65292ecc9a803d25$var$image_bottom_left,
    BOTTOM_RIGHT: $65292ecc9a803d25$var$image_bottom_right,
    FLOOR: $65292ecc9a803d25$var$image_floor,
    LEFT: $65292ecc9a803d25$var$image_left,
    RIGHT: $65292ecc9a803d25$var$image_right,
    TOP: $65292ecc9a803d25$var$image_top,
    TOP_LEFT: $65292ecc9a803d25$var$image_top_left,
    TOP_RIGHT: $65292ecc9a803d25$var$image_top_right,
    WALL: $65292ecc9a803d25$var$image_wall,
    WALL_TWO: $65292ecc9a803d25$var$image_wall_two,
    PILLAR_TOP_LEFT: $65292ecc9a803d25$var$image_pillar_top_left,
    PILLAR_TOP_RIGHT: $65292ecc9a803d25$var$image_pillar_top_right,
    PILLAR_BOTTOM_LEFT: $65292ecc9a803d25$var$image_pillar_bottom_left,
    PILLAR_BOTTOM_RIGHT: $65292ecc9a803d25$var$image_pillar_bottom_right,
    LEDGE_BOTTOM: $65292ecc9a803d25$var$image_ledge_bottom,
    LEDGE_BOTTOM_LEFT: $65292ecc9a803d25$var$image_ledge_bottom_left,
    LEDGE_BOTTOM_RIGHT: $65292ecc9a803d25$var$image_ledge_bottom_right,
    LEDGE_LEFT: $65292ecc9a803d25$var$image_ledge_left,
    LEDGE_RIGHT: $65292ecc9a803d25$var$image_ledge_right,
    LEDGE_TOP: $65292ecc9a803d25$var$image_ledge_top,
    LEDGE_TOP_LEFT: $65292ecc9a803d25$var$image_ledge_top_left,
    LEDGE_TOP_RIGHT: $65292ecc9a803d25$var$image_ledge_top_right,
    LEDGE_PILLAR_TOP_LEFT: $65292ecc9a803d25$var$image_ledge_pillar_top_left,
    LEDGE_PILLAR_TOP_RIGHT: $65292ecc9a803d25$var$image_ledge_pillar_top_right,
    LEDGE_PILLAR_BOTTOM_LEFT: $65292ecc9a803d25$var$image_ledge_pillar_bottom_left,
    LEDGE_PILLAR_BOTTOM_RIGHT: $65292ecc9a803d25$var$image_ledge_pillar_bottom_right,
    LEDGE_LEFT_RAMP_TOP: $65292ecc9a803d25$var$image_ledge_left_ramp_top,
    LEDGE_RIGHT_RAMP_TOP: $65292ecc9a803d25$var$image_ledge_right_ramp_top,
    LEDGE_TOP_RAMP_LEFT: $65292ecc9a803d25$var$image_ledge_top_ramp_left,
    LEDGE_TOP_RAMP_RIGHT: $65292ecc9a803d25$var$image_ledge_top_ramp_right,
    LEDGE_BOTTOM_RAMP_LEFT: $65292ecc9a803d25$var$image_ledge_bottom_ramp_left,
    LEDGE_BOTTOM_RAMP_RIGHT: $65292ecc9a803d25$var$image_ledge_bottom_ramp_right,
    LEDGE_LEFT_RAMP_BOTTOM: $65292ecc9a803d25$var$image_ledge_left_ramp_bottom,
    LEDGE_RIGHT_RAMP_BOTTOM: $65292ecc9a803d25$var$image_ledge_right_ramp_bottom
};
const $65292ecc9a803d25$var$drawCell = (cell)=>{
    if (!$65292ecc9a803d25$var$context) return;
    const x = cell.x * $65292ecc9a803d25$var$CELL_SIZE;
    const y = cell.y * $65292ecc9a803d25$var$CELL_SIZE;
    if (cell.isCollapsed) {
        const image = $65292ecc9a803d25$var$FILL_STYLES[(0, $442fcdd8d7a398ea$export$3b211992cf36885)[cell.domain[0]].name];
        $65292ecc9a803d25$var$context.drawImage(image, x, y, $65292ecc9a803d25$var$CELL_SIZE, $65292ecc9a803d25$var$CELL_SIZE);
        return;
    }
    $65292ecc9a803d25$var$context.fillStyle = $65292ecc9a803d25$var$GRAYS[cell.domain.length - 1];
    $65292ecc9a803d25$var$context.fillRect(x, y, $65292ecc9a803d25$var$CELL_SIZE, $65292ecc9a803d25$var$CELL_SIZE);
// context.fillStyle = '#000';
// context.fillText(`${cell.domain.length}`, x + CELL_SIZE / 2, y + CELL_SIZE / 2);
};
const $65292ecc9a803d25$var$drawGrid = (cells)=>{
    if (!$65292ecc9a803d25$var$context) return;
    $65292ecc9a803d25$var$context.textAlign = "center";
    $65292ecc9a803d25$var$context.clearRect(0, 0, $65292ecc9a803d25$var$CANVAS_WIDTH, $65292ecc9a803d25$var$CANVAS_HEIGHT);
    cells.forEach((cell)=>$65292ecc9a803d25$var$drawCell(cell));
};
const $65292ecc9a803d25$var$regenerateButton = document.getElementById("regenerate");
const $65292ecc9a803d25$var$generateCave = async ()=>{
    if ($65292ecc9a803d25$var$regenerateButton) $65292ecc9a803d25$var$regenerateButton.disabled = true;
    const wfc = new (0, $6b84cfb86d6c6bc6$export$75493ecd6c76042)($65292ecc9a803d25$var$drawGrid, $65292ecc9a803d25$var$ROWS, $65292ecc9a803d25$var$COLUMNS);
    await wfc.run(true);
    if ($65292ecc9a803d25$var$regenerateButton) $65292ecc9a803d25$var$regenerateButton.disabled = false;
};
$65292ecc9a803d25$var$generateCave();
$65292ecc9a803d25$var$regenerateButton === null || $65292ecc9a803d25$var$regenerateButton === void 0 ? void 0 : $65292ecc9a803d25$var$regenerateButton.addEventListener("click", ()=>$65292ecc9a803d25$var$generateCave());


//# sourceMappingURL=index.aefb8fe6.js.map
