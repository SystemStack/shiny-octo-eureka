import { getDisplay } from "./index";

export const monster_prototype = {
  _x: 0,
  _y: 0,
  _char: "👹",
  _attackingChar: "🤺",
  _model: ".",
  _draw: function () {
    getDisplay().draw(this._x, this._y, this._model, "#ff0", "black");
  },
  init: function (_x, _y) {
    this._x = _x;
    this._y = _y;
    this._model = this._char;
    this._draw();
  },
  act: function (noop) {},
};
