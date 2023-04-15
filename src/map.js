"use strict";
export class Map {
    constructor(x, y, blockCount = 72) {
        this.map = new Array(y);
        // Создаём пустую карту с бортиками из камня
        for (let i = 0; i < y; i++) {
            if (i == 0 || i == y - 1) {
                this.map[i] = new Array(x).fill(new Rock());
            } else {
                this.map[i] = new Array(x).fill(new Empty());
                this.map[i][0] = new Rock();
                this.map[i][x - 1] = new Rock();
            }
        }
        // Добавляем блоки на поле
        for (let j = 2; j < y - 1; j += 2) {
            for (let i = 2; i < x - 1; i += 2) {
                this.map[j][i] = new Rock();
            }
        }
        // Добавляем удаляемые препятствия
        for (let i = 0; i < blockCount; i++) {
            let block_x = Math.floor(Math.random() * x);
            let block_y = Math.floor(Math.random() * y);
            if (this.map[block_y][block_x].name == "empty") {
                this.map[block_y][block_x] = new Block();
            }
        }
        // Чистим поле рядом со спауном
        for (let i = 1; i < 3; i++) {
            this.map[1][i] = new Empty();
            this.map[i][1] = new Empty();
        }
    }

    getMap() {
        return this.map;
    }
}

class Rock {
    name = "stone";
    move = false;
    ghost_move = false;
}

class Empty {
    name = "empty";
    move = true;
    ghost_move = true;
}

class Block {
    name = "block";
    move = false;
    ghost_move = true;
}
