import { DIRS } from "rot-js";
import { getDisplay, getEngine, getMap } from "./index";
var keyMap = { 38: 0, 33: 1, 39: 2, 34: 3, 40: 4, 35: 5, 37: 6, 36: 7 };

const Player = function () {
  return {
    _x: 0,
    _y: 0,
    _draw: function () {
      getDisplay().draw(this._x, this._y, "@", "#ff0", "black");
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
    handleEvent: function (ev) {
      if (!(ev.keyCode in keyMap)) return;
      let diff = DIRS[8][keyMap[ev.keyCode]];
      let x = this._x + diff[0];
      let y = this._y + diff[1];
      var newKey = x + "," + y;
      let map = getMap();
      let display = getDisplay();
      if (!(newKey in map)) return;

      display.draw(
        this._x,
        this._y,
        map[this._x + "," + this._y],
        "#fff",
        "black"
      );
      this._x = x;
      this._y = y;
      this._draw();
      window.removeEventListener("keydown", this);
      getEngine().unlock();
    },
  };
};

export default Player;
