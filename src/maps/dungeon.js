import { Map, RNG } from "rot-js";
import { draw } from "../index";
import { displayOptions } from "../utils";

export const digger = new Map.Digger(
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

export const Dungeon = function (level = 1) {
  return {
    level: level,
    freeCells: [],
    map: {},
    init: function () {
      this._createMap();
    },
    getFreeCell() {
      let index = Math.floor(RNG.getUniform() * this.freeCells.length);
      return this.freeCells.splice(index, 1)[0];
    },
    _createMap: function () {
      this.freeCells = [];

      var callback = function (x, y, wall) {
        if (wall) {
          let a = x == 0,
            b = y == 0,
            c = x == displayOptions.width - 3,
            d = y == displayOptions.height - 3;
          if (/*corner*/ (a && (b || d)) || (c && (b || d))) {
            draw(x, y, "+");
          } /*vertical*/ else if (a || c) {
            draw(x, y, "|");
          } /*horizontal*/ else if (b || d) {
            draw(x, y, "⸻");
          } /*interior*/ else {
            draw(x, y, "#");
          }
          return;
        }
        const key = x + "," + y;
        this.freeCells.push(key);
        this.map[key] = ".";
      };
      digger.create(callback.bind(this));
      this._generateBoxes();
      this._generateStairs();
      this._draw();
    },
    _draw: function () {
      for (var key in this.map) {
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        draw(x, y, this.map[key]);
      }
    },
    _generateBoxes: function () {
      for (var i = 0; i < 10; i++) {
        this.map[this.getFreeCell()] = "*";
      }
    },
    _generateStairs: function () {
      this.map[this.getFreeCell()] = ">";
    },
  };
};
