"use strict";
export class Map {
    #map;
    #player;
    #mobs = [];
    #width;
    #height;
    #mob_count = 0;
    #direction = -1;

    constructor(width, height, blockCount = 72) {
        this.#width = width;
        this.#height = height;
        this.#map = new Array(height);
        // Создаём пустую карту с бортиками из камня
        for (let j = 0; j < height; j++) {
            this.#map[j] = [];
            if (j == 0 || j == height - 1) {
                for (let i = 0; i < width; i++) {
                    this.#map[j].push(new Rock());
                }
            } else {
                for (let i = 0; i < width; i++) {
                    if (
                        i == 0 ||
                        i == width - 1 ||
                        (i % 2 == 0 && j % 2 == 0)
                    ) {
                        this.#map[j].push(new Rock());
                    } else {
                        this.#map[j].push(new Empty());
                    }
                }
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
        this.#player = {
            x: 1,
            y: 1,
            getX() {
                return Math.round(this.x);
            },
            getY() {
                return Math.round(this.y);
            },
        };
    }

    getMap() {
        return this.#map;
    }

    getPlayer() {
        return this.#player;
    }

    setDirection(direction) {
        this.#direction = direction;
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
            getX() {
                return Math.round(this.x);
            },
            getY() {
                return Math.round(this.y);
            },
        });
    }

    getMobs() {
        return this.#mobs;
    }

    oneStep() {
        this.#mobs.forEach((mob) => {
            this.moveMob(mob);
        });
        this.movePlayer();
    }

    moveMob(mob) {
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
            if (directions.length > 0) {
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
                if (Math.ceil(x) != Math.ceil(mob.x)) {
                    new_x = Math.ceil(mob.x);
                }
                break;
            case 2:
                mob.y += mob.speed;
                if (Math.ceil(y) != Math.ceil(mob.y)) {
                    new_y = Math.ceil(mob.y);
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
            let new_entity = this.#map[mob.getY()][new_x];
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
            let new_entity = this.#map[new_y][mob.getX()];
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
    }

    movePlayer() {
        let direction = this.#direction;
        let speed = 0.05;
        let x = this.#player.x;
        let y = this.#player.y;
        let new_x;
        let new_y;
        if (direction == -1) {
            return;
        }
        switch (direction) {
            case 0:
                this.#player.y -= speed;
                if (Math.floor(y) != Math.floor(this.#player.y)) {
                    new_y = Math.floor(this.#player.y);
                }
                break;
            case 1:
                this.#player.x += speed;
                if (Math.ceil(x) != Math.ceil(this.#player.x)) {
                    new_x = Math.ceil(this.#player.x);
                }
                break;
            case 2:
                this.#player.y += speed;
                if (Math.ceil(y) != Math.ceil(this.#player.y)) {
                    new_y = Math.ceil(this.#player.y);
                }
                break;
            case 3:
                this.#player.x -= speed;
                if (Math.floor(x) != Math.floor(this.#player.x)) {
                    new_x = Math.floor(this.#player.x);
                }
                break;
        }
        if (typeof new_x !== "undefined") {
            let new_entity = this.#map[this.#player.getY()][new_x];
            if (new_entity.move === false) {
                this.#player.x = this.#player.getX();
            }
        }
        if (typeof new_y !== "undefined") {
            let new_entity = this.#map[new_y][this.#player.getX()];
            if (new_entity.move === false) {
                this.#player.y = this.#player.getY();
            }
        }
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
