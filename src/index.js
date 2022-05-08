import { Display, Engine, Map, RNG, Scheduler } from "rot-js";
import "../assets/index.css";
import Monster from "./monster";
import { displayOptions } from "./options";
import Player from "./player";
import { bg_init } from "./three/background";
import { init } from "./three/effect";
const digger = new Map.Digger(
  displayOptions.width - 2,
  displayOptions.height - 2,
  {
    dugPercentage: 0.9,
    roomWidth: [4, 12],
    roomHeight: [3, 8],
    // corridorLength: [number, number];
    timeLimit: 1000,
  }
);

const Game = {
  display: new Display(displayOptions),
  map: {},
  engine: {},
  player: {},
  monsters: [],
  init: function () {
    document.body.appendChild(this.display.getContainer());
    const canvas = document.querySelector("canvas");

    bg_init(canvas);
    init(); // weaponeffect
    this._createMap();

    let scheduler = new Scheduler.Simple();
    scheduler.add(this.player, true);
    for (let i = 0; i < this.monsters.length; i++)
      scheduler.add(this.monsters[i], true);

    this.engine = new Engine(scheduler);
    this.engine.start();
  },
  _createMap: function () {
    const freeCells = [];

    var callback = function (x, y, wall) {
      if (wall) {
        let a = x == 0,
          b = y == 0,
          c = x == displayOptions.width - 3,
          d = y == displayOptions.height - 3;
        if (/*corner*/ (a && (b || d)) || (c && (b || d))) {
          this.display.draw(x, y, "+");
        } /*vertical*/ else if (a || c) {
          this.display.draw(x, y, "|");
        } /*horizontal*/ else if (b || d) {
          this.display.draw(x, y, "⸻");
        } /*interior*/ else {
          this.display.draw(x, y, "#");
        }
        return;
      }
      const key = x + "," + y;
      freeCells.push(key);
      this.map[key] = ".";
    };
    digger.create(callback.bind(this));
    this._generateBoxes(freeCells);

    this._drawMap();
    this.player = this._createBeing(Player, freeCells);
    for (let i = 0; i < 3; i++) {
      let mon = this._createBeing(Monster, freeCells);
      this.monsters.push(mon);
    }
  },
  _drawMap: function () {
    for (var key in this.map) {
      var parts = key.split(",");
      var x = parseInt(parts[0]);
      var y = parseInt(parts[1]);
      this.display.draw(x, y, this.map[key]);
    }
  },
  _generateBoxes: function (freeCells) {
    for (var i = 0; i < 10; i++) {
      var index = Math.floor(RNG.getUniform() * freeCells.length);
      var key = freeCells.splice(index, 1)[0];
      this.map[key] = "*";
    }
  },
  _createBeing: function (factory, freeCells) {
    var index = Math.floor(RNG.getUniform() * freeCells.length);
    var key = freeCells.splice(index, 1)[0];
    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    let being = factory();
    being.init(x, y);
    return being;
  },
};

Game.init();

export function getDisplay() {
  return Game.display;
}
export function draw(x = 0, y = 0, chr = ".", fg = "#fff", bg = "#000") {
  Game.display.draw(x, y, chr, fg, bg);
}
export function getEngine() {
  return Game.engine;
}
export function getMap() {
  return Game.map;
}
export function getPlayer() {
  return Game.player;
}
