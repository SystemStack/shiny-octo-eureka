import { drawOver } from "../index";
import { monster_prototype } from "./prototypes";

const Monster = function () {
  return {
    ...monster_prototype,
    act: function () {
      let path = this._getPathToPlayer();
      if (path.length <= 2) {
        this._model = this._actionChar;
      } else {
        this._model = this._char;
        drawOver(this._x, this._y);
        this._x = path[0][0];
        this._y = path[0][1];
      }
      this._draw();
    },
  };
};
export default Monster;
