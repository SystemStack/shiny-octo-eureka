import { Display, Engine, Scheduler } from "rot-js";
import "../assets/index.css";
import Monster from "./entities/monster";
import Player from "./entities/player";
import World from "./maps/world";
import { init_background } from "./three/background";
import { centerCanvas, displayOptions } from "./utils";

const Game = {
  display: new Display(displayOptions),
  map: {},
  world: {},
  monsters: [],
  init: function () {
    const container = this.display.getContainer();
    container.style.opacity = 0.8;
    container.style.zIndex = "100";
    document.body.appendChild(container);
    centerCanvas(container);
    init_background(container);
    this.world = World;
    this.world.init();
    this.player = this._createBeing(Player);
    for (let i = 0; i < 3; i++) {
      let mon = this._createBeing(Monster);
      this.monsters.push(mon);
    }
    this._start();
  },
  _createBeing: function (factory) {
    let key = this.world.getFreeCell();
    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    let being = factory();
    being.init(x, y);
    return being;
  },
  _start: function () {
    let scheduler = new Scheduler.Simple();
    scheduler.add(this.player, true);
    for (let i = 0; i < this.monsters.length; i++)
      scheduler.add(this.monsters[i], true);

    this.engine = new Engine(scheduler);
    this.engine.start();
  },
};

Game.init();

export function draw(x = 0, y = 0, chr = ".", fg, bg) {
  Game.display.draw(x, y, chr, fg, bg);
}
export function drawOver(x = 0, y = 0) {
  Game.display.draw(
    x,
    y,
    Game.world.currentDungeon.map[x + "," + y],
    null,
    null
  );
}
export function unlockEngine() {
  Game.engine.unlock();
}
export function lockEngine() {
  Game.engine.lock();
}
export function getMapXY(x, y) {
  return Game.world.currentDungeon.map[x + "," + y];
}
export function validPosition(x, y) {
  return x + "," + y in Game.world.currentDungeon.map;
}
export function getPlayerPosition() {
  return { x: Game.player._x, y: Game.player._y };
}
