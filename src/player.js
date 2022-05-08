import { DIRS } from "rot-js";
import { draw, getEngine, getMap } from "./index";
var moveMap = { 38: 0, 33: 1, 39: 2, 34: 3, 40: 4, 35: 5, 37: 6, 36: 7 };

const Player = function () {
  return {
    _model: "@",
    _draw: function () {
      draw(this._x, this._y, this._model, "yellow");
    },
    init: function (_x, _y) {
      this._x = _x;
      this._y = _y;
      this._draw();
    },
    act: function () {
      getEngine().lock();
      window.addEventListener("keydown", this);
    },
    cast: function () {
      console.log("cast");
      getEngine().unlock();
    },
    handleEvent: function (ev) {
      if (ev.keyCode === 32) return this.cast();
      if (!(ev.keyCode in moveMap)) return;
      let diff = DIRS[8][moveMap[ev.keyCode]];
      let x = this._x + diff[0];
      let y = this._y + diff[1];
      var newKey = x + "," + y;
      let map = getMap();
      if (!(newKey in map)) return;
      draw(this._x, this._y, map[this._x + "," + this._y]);
      this._x = x;
      this._y = y;
      this._draw();
      window.removeEventListener("keydown", this);
      getEngine().unlock();
    },
  };
};

export default Player;
