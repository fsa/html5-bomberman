"use strict";
import "./style.css";
import "./img/apple.png";
import "./img/cherry.png";

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

const map = new Map(game.width, game.height, 72);
const drawer = new MapDrawer(div, game);
for (let i = 0; i < 5; i++) {
    map.addMob("money", false, 0.02 * (i + 1));
}
drawer.redraw(map.getMap());

addEventListener("keydown", keydown);
addEventListener("keyup", keyup);

let interval;

function keydown(event) {
    switch (event.keyCode) {
        case 37:
            map.setDirection(3);
            break;
        case 38:
            map.setDirection(0);
            break;
        case 39:
            map.setDirection(1);
            break;
        case 40:
            map.setDirection(2);
            break;
        case 32:
            console.log(interval);
            if (interval) {
                clearInterval(interval);
                interval = null;
            } else {
                interval = setInterval(() => {
                    map.oneStep();
                    drawer.redraw(map.getMap());
                    drawer.drawMobs(map.getMobs());
                    drawer.drawPlayer(map.getPlayer());
                }, 30);
            }
            break;
        case 50:
            map.oneStep();
            drawer.redraw(map.getMap());
            drawer.drawMobs(map.getMobs());
            drawer.drawPlayer(map.getPlayer());
            break;
        default:
            console.log(event.keyCode);
    }
}

function keyup(event) {
    switch (event.keyCode) {
        case 37:
        case 38:
        case 39:
        case 40:
            map.setDirection(-1);
            break;
    }
}
