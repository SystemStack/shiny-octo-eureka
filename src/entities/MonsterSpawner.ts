import { Path } from "rot-js";
import { getPlayerPosition, validPosition } from "..";
import { IEntity } from "../interfaces";
import EntityPrototype from "./Entity";
interface IMonster extends IEntity {
  getPathToPlayer: () => Array<[number, number]>;
}

export default function (): IMonster {
  return {
    ...EntityPrototype,
    model: {
      ...EntityPrototype.model,
      base: "👹",
      current: "👹",
      action: "🤺",
      fg: "#f00"
    },
    getPathToPlayer: function () {
      let { x, y } = getPlayerPosition();
      let path: any[] = [];
      new Path.AStar(x, y, validPosition, { topology: 4 }).compute(
        this.state.position.x,
        this.state.position.y,
        (x, y) => {
          path.push([x, y]);
        }
      );
      path.shift();
      return path;
    },
    act: function () {
      let path = this.getPathToPlayer();
      if (path.length <= 2) {
        this.model.current = this.model.action;
      } else {
        this.model.current = this.model.base;
        this.state.position.x = path[0][0];
        this.state.position.y = path[0][1];
      }
      this.draw();
    },
  };
};
