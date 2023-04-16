"use strict";
import "./style.css";
import "./img/apple.png";

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
for(let i=0;i<5;i++) {
    map.addMob("money", false, 0.02*(i+1));
}
drawer.redraw(map.getMap());
drawer.drawMobs(map.getMobs())

/*addEventListener("keydown", movePlayer);
function movePlayer() {
    map.oneStep();
    drawer.redraw(map.getMap());
    drawer.drawMobs(map.getMobs());

}
*/

let interval = setInterval(() => {
    map.oneStep();
    drawer.redraw(map.getMap());
    drawer.drawMobs(map.getMobs());
}, 30);

//clearInterval(interval);