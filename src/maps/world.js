import { Dungeon } from "./dungeon";

const World = {
  dungeonLevels: [],
  currentDungeonLevel: 0,
  // create getter
  get currentDungeon() {
    return this.dungeonLevels[this.currentDungeonLevel - 1];
  },
  get level() {
    return this.currentDungeonLevel;
  },
  init: function () {
    let dungeon = Dungeon(1);
    dungeon.init();
    this.dungeonLevels.push(dungeon);
    this.currentDungeonLevel += 1;
  },
  _createLevel: function () {},
  getFreeCell() {
    return this.currentDungeon.getFreeCell();
  },
};

export default World;
