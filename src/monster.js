import { Path } from "rot-js";
import { getDisplay, getMap, getPlayer } from "./index";

const Monster = function () {
  return {
    _x: 0,
    _y: 0,
    _draw: function (action) {
      if (action) {
        getDisplay().draw(this._x, this._y, action, "#ff0", "black");
      } else {
        getDisplay().draw(this._x, this._y, "👹", "#ff0", "black");
      }
    },
    init: function (_x, _y) {
      this._x = _x;
      this._y = _y;
      this._draw();
    },
    act: function () {
      const player = getPlayer();
      let x = player._x;
      let y = player._y;
      let pathHelper = function (_map) {
        let map = _map();
        return function (x, y) {
          return x + "," + y in map;
        };
      };
      var astar = new Path.AStar(x, y, pathHelper(getMap), { topology: 4 });
      var path = [];
      var pathCallback = function (x, y) {
        path.push([x, y]);
      };
      astar.compute(this._x, this._y, pathCallback);
      path.shift();
      if (path.length < 2) {
        this._draw("🤺");
      } else {
        if (path.length) {
          x = path[0][0];
          y = path[0][1];
          getDisplay().draw(
            this._x,
            this._y,
            getMap()[this._x + "," + this._y]
          );
          this._x = x;
          this._y = y;
        }
        this._draw();
      }
    },
  };
};
export default Monster;
