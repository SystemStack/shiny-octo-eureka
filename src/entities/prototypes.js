import { Path } from "rot-js";
import { draw, getPlayerPosition, validPosition } from "../index";

export const being_prototype = {
  _x: 0,
  _y: 0,
  _model: ".",
  _actionChar: "&",
  _fg: "#fdf",
  _bg: "#000",
  _draw: function () {
    draw(this._x, this._y, this._model, this._fg, this._bg);
  },
  init: function (_x, _y) {
    this._x = _x;
    this._y = _y;
    this._model = this._char;
    this._draw();
  },
};

export const monster_prototype = {
  ...being_prototype,
  _char: "👹",
  _actionChar: "🤺",
  _fg: "#f00",
  _getPathToPlayer: function () {
    let { x, y } = getPlayerPosition();
    let path = [];
    new Path.AStar(x, y, validPosition, { topology: 4 }).compute(
      this._x,
      this._y,
      (x, y) => {
        path.push([x, y]);
      }
    );
    path.shift();
    return path;
  },
  act: function (noop) {
    console.error("act() is not implemented");
  },
};
