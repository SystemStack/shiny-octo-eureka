import { drawOnMap } from "../index";
import { IEntity } from "../interfaces";
const EntityPrototype: IEntity = {
  model: {
    current: ".",
    base: ".",
    action: "&",
    cast: "*",
    fg: "#fdf",
    bg: "#000",
  },
  state: {
    position: { x: 0, y: 0, z: 0 },
    entityName: "Trollantha",
    curse: "the cowardly",
    class: "Valkyrie",
    title: "of the north",
    level: 1,
    xp: 0,
    hp: 10,
    maxHp: 10,
    mp: 10,
    maxMp: 10,
  },
  draw: function () {
    drawOnMap({
      ...this.model,
      ...this.state.position
    });
  },
  init: function (x, y) {
    this.position = { x: x, y: y };
    this.draw();
  },
  act: function (): void {
    throw new Error("Function not implemented.");
  },
  update: function (): void {
    throw new Error("Function not implemented.");
  }
};
export default EntityPrototype;