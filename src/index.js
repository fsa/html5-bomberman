"use strict";
import "./style.css";
import { Map } from "./map.js";

const div = document.getElementById("game");

const game = {
    width: 15,
    height: 11,
    blockSize: Number(
        getComputedStyle(div).getPropertyValue("--canvas-block-size")
    ),
};

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
div.appendChild(canvas);
canvas.width = game.blockSize * game.width;
canvas.height = game.blockSize * game.height;
canvas.style.display = "block";
canvas.style.maxWidth = "100%";
canvas.style.maxHeight = "100vh";
ctx.fillStyle = "#eeeeee";
ctx.fillRect(0, 0, canvas.width, canvas.height);
const map = new Map(game.width, game.height);
drawMap(ctx, map.getMap());

function drawMap(ctx, map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            drawBlock(ctx, map[y][x], x, y);
        }
    }
}

function drawBlock(ctx, block, x, y) {
    let color;
    switch(block.name) {
        case 'stone':
            color = '#124813';
            break;
        case 'empty':
            color = '#FFFFFF';
            break;
        default:
            color = '#555555';
    }
    console.log(
        x * game.blockSize,
        y * game.blockSize,
        game.blockSize,
        game.blockSize
    );
    ctx.fillStyle = color;
    ctx.fillRect(x*game.blockSize, y*game.blockSize, game.blockSize, game.blockSize);
}
