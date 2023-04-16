"use strict";
export class MapDrawer {
    #div;

    constructor(div, game) {
        this.#div = div;
        this.blockSize = game.blockSize;
        const canvas = document.createElement("canvas");
        div.appendChild(canvas);
        canvas.width = game.blockSize * game.width;
        canvas.height = game.blockSize * game.height;
        canvas.style.display = "block";
        canvas.style.maxWidth = "100%";
        canvas.style.maxHeight = "100vh";
        this.ctx = canvas.getContext("2d");
    }

    redraw(map) {
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                this.drawSquare(map[y][x].name, x, y);
            }
        }
    }

    //Тестовая функция
    drawMobs(mobs) {
        mobs.forEach((mob) => {
            //this.drawSquare("mob", mob.x, mob.y);
            let image = new Image();
            image.src = "img/apple.png";
            this.drawImg(image, mob.x, mob.y);
        });
    }

    drawSquare(name, x, y) {
        let color;
        switch (name) {
            case "stone":
                color = "#124813";
                break;
            case "block":
                color = "#999999";
                break;
            case "mob":
                color = "yellow";
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

    drawImg(image, x, y) {
        this.ctx.drawImage(
            image,
            x * this.blockSize,
            y * this.blockSize,
            this.blockSize,
            this.blockSize
        );
    }
}
