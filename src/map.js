"use strict";
export class Map {
    #map;
    #player;
    #mobs = [];
    #width;
    #height;
    #mob_count = 0;

    constructor(width, height, blockCount = 72) {
        this.#width = width;
        this.#height = height;
        this.#map = new Array(height);
        // Создаём пустую карту с бортиками из камня
        for (let i = 0; i < height; i++) {
            if (i == 0 || i == height - 1) {
                this.#map[i] = new Array(width).fill(new Rock());
            } else {
                this.#map[i] = new Array(width).fill(new Empty());
                this.#map[i][0] = new Rock();
                this.#map[i][width - 1] = new Rock();
            }
        }
        // Добавляем блоки на поле
        for (let j = 2; j < height - 1; j += 2) {
            for (let i = 2; i < width - 1; i += 2) {
                this.#map[j][i] = new Rock();
            }
        }
        // Добавляем удаляемые препятствия
        for (let i = 0; i < blockCount; i++) {
            let block_x = Math.floor(Math.random() * width);
            let block_y = Math.floor(Math.random() * height);
            if (this.#map[block_y][block_x].name == "empty") {
                this.#map[block_y][block_x] = new Block();
            }
        }
        // Чистим поле рядом со спауном
        for (let i = 1; i < 3; i++) {
            this.#map[1][i] = new Empty();
            this.#map[i][1] = new Empty();
        }
        this.#player = { x: 1, y: 1 };
    }

    getMap() {
        return this.#map;
    }

    getPlayer() {
        return this.#player;
    }

    addMob(name, ghost, speed) {
        let x;
        let y;
        do {
            x = Math.floor(Math.random() * (this.#width - 2)) + 1;
            y = Math.floor(Math.random() * (this.#height - 2)) + 1;
        } while ((x < 6 && y < 6) || this.#map[y][x].move == false);
        this.#mobs.push({
            id: ++this.#mob_count,
            x: x,
            y: y,
            name: name,
            ghost: ghost,
            direction: -1,
            speed: speed,
        });
    }

    getMobs() {
        return this.#mobs;
    }

    oneStep() {
        this.#mobs.forEach((mob, i) => {
            let x = mob.x;
            let y = mob.y;
            let new_x;
            let new_y;
            if (mob.direction == -1) {
                mob.x = Math.round(mob.x);
                mob.y = Math.round(mob.y);
                let entities = [
                    this.#map[mob.y - 1][mob.x],
                    this.#map[mob.y][mob.x + 1],
                    this.#map[mob.y + 1][mob.x],
                    this.#map[mob.y][mob.x - 1],
                ];
                let directions = [];
                for (let i = 0; i < 4; i++) {
                    if (entities[i].move) {
                        directions.push(i);
                    }
                }
                if (directions.length>0) {
                    mob.direction =
                        directions[Math.floor(Math.random() * directions.length)];
                }
            }
            switch (mob.direction) {
                case 0:
                    mob.y -= mob.speed;
                    if (Math.floor(y) != Math.floor(mob.y)) {
                        new_y = Math.floor(mob.y);
                    }
                    break;
                case 1:
                    mob.x += mob.speed;
                    if (Math.floor(x) != Math.floor(mob.x)) {
                        new_x = Math.floor(mob.x)+1;
                    }
                    break;
                case 2:
                    mob.y += mob.speed;
                    if (Math.floor(y) != Math.floor(mob.y)) {
                        new_y = Math.floor(mob.y)+1;
                    }
                    break;
                case 3:
                    mob.x -= mob.speed;
                    if (Math.floor(x) != Math.floor(mob.x)) {
                        new_x = Math.floor(mob.x);
                    }
                    break;
            }
            if (typeof new_x !== "undefined") {
                let new_entity = this.#map[mob.y][new_x];
                if (mob.ghost) {
                    if (new_entity.ghost_move === false) {
                        mob.direction = -1;
                    }
                } else {
                    if (new_entity.move === false) {
                        mob.direction = -1;
                    }
                }
            }
            if (typeof new_y !== "undefined") {
                let new_entity = this.#map[new_y][mob.x];
                if (mob.ghost) {
                    if (new_entity.ghost_move === false) {
                        mob.direction = -1;
                    }
                } else {
                    if (new_entity.move === false) {
                        mob.direction = -1;
                    }
                }
            }
        });
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
