import { Path } from "rot-js";
import { draw, getMap, getPlayer } from "./index";
import { monster_prototype } from "./prototypes";

const Monster = function () {
  return {
    ...monster_prototype,
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
        this._model = this._attackingChar;
        this._draw();
      } else {
        this._model = this._char;
        if (path.length) {
          x = path[0][0];
          y = path[0][1];

          draw(this._x, this._y, getMap()[this._x + "," + this._y]);
          this._x = x;
          this._y = y;
        }
        this._draw();
      }
    },
  };
};
export default Monster;
