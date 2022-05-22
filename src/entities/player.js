import { DIRS } from "rot-js";
import { init_weaponeffect } from "../geometry/weaponEffect";
import { drawOver, lockEngine, unlockEngine, validPosition } from "../index";
import { being_prototype } from "./prototypes";
var moveMap = { 38: 0, 33: 1, 39: 2, 34: 3, 40: 4, 35: 5, 37: 6, 36: 7 };

const Player = function () {
  return {
    ...being_prototype,
    _char: "@",
    _fg: "yellow",
    _cast: function () {
      init_weaponeffect();
    },
    _move: function (move) {
      let [x, y] = [this._x + move[0], this._y + move[1]];
      if (!validPosition(x, y)) return;
      drawOver(this._x, this._y);
      this._x = x;
      this._y = y;
      this._draw();
    },
    act: function () {
      lockEngine();
      window.addEventListener("keydown", this);
    },
    handleEvent: function (ev) {
      if (ev.keyCode === 32) {
        this._cast();
      } else if (ev.keyCode in moveMap) {
        this._move(DIRS[8][moveMap[ev.keyCode]]);
      } else {
        return;
      }
      window.removeEventListener("keydown", this);
      unlockEngine();
    },
  };
};

export default Player;
