import { Map, RNG } from "rot-js";
import { drawOnMap } from "../index";
import { IEntityModel } from "../interfaces";
import { displayOptions } from "../utils/options";

function getDigger() {
  return new Map.Digger(displayOptions.width - 2, displayOptions.height - 2, {
    dugPercentage: 0.95,
    roomWidth: [4, 12],
    roomHeight: [5, 18],
    corridorLength: [3, 10],
    timeLimit: 3750,
  });
}
const cellType: { [x: string]: Partial<IEntityModel> } = {
  vertical: { current: "│", fg: "#f00", bg: "black", },
  corner: { current: "+", fg: "#f00", bg: "black", },
  horizontal: { current: "⸻", fg: "#f00", bg: "black", },
  interior: { current: "#", fg: "#f00", bg: "black", },
};

interface IDungeon {
  level: number,
  map: { [key in string]: string },
  init: () => void,
  getFreeCell: () => [string, number],
  createMap: () => void,
  draw: () => void,
  generateBoxes: () => void,
  generateStairs: () => void,
  freeCells: Array<[string, number]>
}
export const Dungeon = function (level = 1): IDungeon {
  return {
    level: level,
    freeCells: [],
    map: {},
    init: function () {
      this.createMap();
    },
    getFreeCell() {
      let index = Math.floor(RNG.getUniform() * this.freeCells.length);
      return this.freeCells.splice(index, 1)[0];
    },
    createMap: function () {
      this.freeCells = [];

      const callback = function (x: number, y: number, wall: boolean) {
        if (wall) {
          let a = x == 0,
            b = y == 0,
            c = x == displayOptions.width - 3,
            d = y == displayOptions.height - 3;
          if ((a && (b || d)) || (c && (b || d))) {
            return drawOnMap({ position: { x, y }, model: cellType.corner });
          } else if (a || c) {
            return drawOnMap({ position: { x, y }, model: cellType.vertical });
          } else if (b || d) {
            return drawOnMap({ position: { x, y }, model: cellType.horizontal });
          }
          return drawOnMap({ position: { x, y }, model: cellType.internal });
        }
        const key = x + "," + y;
        this.freeCells.push(key);
        this.map[key] = ".";
      };
      let digger = getDigger();
      digger.create(callback.bind(this));
      this.generateBoxes();
      this.generateStairs();
      this.draw();
    },
    draw: function () {
      for (let key in this.map) {
        const parts = key.split(",");
        drawOnMap({
          position: {
            x: parseInt(parts[0]),
            y: parseInt(parts[1])
          },
          model: {
            current: this.map[key]
          }
        });
      }
    },
    generateBoxes: function () {
      for (let i = 0; i < 10; i++) {
        this.map[this.getFreeCell()] = "*";
      }
    },
    generateStairs: function () {
      this.map[this.getFreeCell()] = ">";
    },
  };
};
