"use strict";
export class Map {
    constructor(x, y) {
        this.map = new Array(y);
        for (let i = 0; i < y; i++) {
            this.map[i] = new Array(x).fill(new Empty());
            this.map[i][0] = new Rock();
            this.map[i][x - 1] = new Rock();
        }
        for (let i = 0; i < x; i++) {
            this.map[0][i] = new Rock();
            this.map[y - 1][i] = new Rock();
        }
        for (let j = 2; j < y - 1; j += 2) {
            for (let i = 2; i < x - 1; i += 2) {
                this.map[j][i] = new Rock();
            }
        }
        for (let i = 0; i < 50; i++) {
            let block_x = Math.floor(Math.random() * x);
            let block_y = Math.floor(Math.random() * y);
            if (this.map[block_y][block_x].name == "empty") {
                this.map[block_y][block_x] = new Block();
            }
        }
        for (let i = 1; i < 4; i++) {
            this.map[1][i] = new Empty;
            this.map[i][1] = new Empty;
        }
    }

    getMap() {
        return this.map;
    }
}

class Rock {
    name = "stone";
    move = false;
    enemy_move = false;
}

class Empty {
    name = "empty";
    move = true;
    enemy_move = true;
}

class Block {
    name = "block";
    move = false;
    enemy_move = true;
}
