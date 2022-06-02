import {
  drawHeroText,
  drawOnMap,
  lockEngine,
  unlockEngine,
  validPosition
} from "../index";
import { IEntity } from "../interfaces";
import EntityPrototype from "./Entity";
interface IPlayer extends IEntity {
  move: (moveX: number, moveY: number) => void;
  cast: () => void;
  handleEvent: (ev: KeyboardEvent) => void;
}

const PlayerSpawner = function (): IPlayer {
  return {
    ...EntityPrototype,
    model: {
      ...EntityPrototype.model,
      base: "@",
      current: "@",
      action: "🤺",
      fg: "#yellow",
      bg: "#000"
    },
    state: {
      ...EntityPrototype.state,
      entityName: "Trollantha",
      curse: "the cowardly",
      class: "Valkyrie",
      title: "of the north",
      level: 1,
      hp: 10,
      maxHp: 10,
      mp: 10,
      maxMp: 10,
      xp: 0
    },

    move: function (moveX: number, moveY: number) {
      let [x, y] = [this.position.x + moveX, this.position.y + moveY];
      if (!validPosition(x, y)) return;
      drawOnMap({
        position: { x: this.position.x, y: this.position.y },
        model: {
          current: ' ',
          fg: 'black',
          bg: 'black'
        }
      });
      this.position.x = x;
      this.position.y = y;
      this.update();
    },
    update: function () {
      drawHeroText(this.state);
      this.draw();
    },
    act: function () {
      lockEngine();
      window.addEventListener("keydown", this);
    },
    cast: function () { console.info("Cast!"); },
    handleEvent: function (ev: KeyboardEvent) {
      if (ev.key === "V") {
        this.cast();
      } else if (ev.key === 'ArrowUp') {
        this.move(0, -1);
      } else if (ev.key === 'ArrowRight') {
        this.move(1, 0);
      } else if (ev.key === 'ArrowDown') {
        this.move(0, 1);
      } else if (ev.key === 'ArrowLeft') {
        this.move(-1, 0);
      } else {
        return;
      }
      window.removeEventListener("keydown", this);
      unlockEngine();
    },
  };
};

export default PlayerSpawner;
