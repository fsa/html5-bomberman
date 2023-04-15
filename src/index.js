"use strict";
import "./style.css";
import { Map } from "./map.js";
import { MapDrawer } from "./map_drawer.js";

const div = document.getElementById("game");

const game = {
    width: 15,
    height: 11,
    blockSize: Number(
        getComputedStyle(div).getPropertyValue("--canvas-block-size")
    ),
};

const canvas = document.createElement("canvas");
div.appendChild(canvas);
canvas.width = game.blockSize * game.width;
canvas.height = game.blockSize * game.height;
canvas.style.display = "block";
canvas.style.maxWidth = "100%";
canvas.style.maxHeight = "100vh";
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#eeeeee";
ctx.fillRect(0, 0, canvas.width, canvas.height);
const map = new Map(game.width, game.height);
const drawer = new MapDrawer(ctx, game.blockSize);
drawer.redraw(map);
