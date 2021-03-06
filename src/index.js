import { createRoot } from "react-dom/client";
import { Engine, Scheduler } from "rot-js";
import Container from "./containers";
import Monster from "./entities/monster";
import Player from "./entities/player";
import "./index.css";
import "./utils/state";
import { HeroStore, LogStore } from "./utils/state";

const Self = {
  monsters: Array(),
  init: function () {
    createRoot(document.getElementById("root")).render(Container());
    // Self.world = World;
    // Self.world.init();
    // Self._start();

    // root.render(<GameContainer />);
  },
  _createBeing: function (factory) {
    let key = Self.world.getFreeCell();
    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    let being = factory();
    being.init(x, y);
    return being;
  },
  _start: function () {
    // TODO: move to monsterspawner
    Self.player = Self._createBeing(Player);
    for (let i = 0; i < 3; i++) {
      let mon = Self._createBeing(Monster);
      Self.monsters.push(mon);
    }
    let scheduler = new Scheduler.Simple();
    scheduler.add(Self.player, true);
    for (let i = 0; i < Self.monsters.length; i++)
      scheduler.add(Self.monsters[i], true);

    Self.engine = new Engine(scheduler);
    Self.engine.start();
  },
};

Self.init();

export function draw(x = 0, y = 0, chr = ".", fg, bg) {
  Self.gameDisplay.draw(x, y, chr, fg, bg);
}
export function drawOver(x = 0, y = 0) {
  Self.gameDisplay.draw(
    x,
    y,
    Self.world.currentDungeon.map[x + "," + y],
    null,
    null
  );
}
export function unlockEngine() {
  Self.engine.unlock();
}
export function lockEngine() {
  Self.engine.lock();
}
export function getMapXY(x, y) {
  return Self.world.currentDungeon.map[x + "," + y];
}
export function validPosition(x, y) {
  return x + "," + y in Self.world.currentDungeon.map;
}
export function getPlayerPosition() {
  return { x: Self.player._x, y: Self.player._y };
}
export function drawLogText(text) {
  if (text && text.length) {
    LogStore.getState().append(text);
  }
}
export function drawHeroText(heroState) {
  HeroStore.getState().update(heroState);
}
