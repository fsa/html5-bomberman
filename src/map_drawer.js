"use strict";
export class MapDrawer {
    constructor(ctx, blockSize) {
        this.ctx = ctx;
        this.blockSize = blockSize;
    }

    redraw(map_obj) {
        let map = map_obj.getMap();
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                this.drawBlock(map[y][x], x, y);
            }
        }
    }

    drawBlock(block, x, y) {
        let color;
        switch (block.name) {
            case "stone":
                color = "#124813";
                break;
            case "block":
                color = "#999999";
                break;
            default:
                color = "#FFFFFF";
        }
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            x * this.blockSize,
            y * this.blockSize,
            this.blockSize,
            this.blockSize
        );
    }
}
