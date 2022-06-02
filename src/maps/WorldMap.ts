import { Dungeon } from "./DungeonMap";
const Self = {
  dungeonLevels: new Array(),
  currentDungeonLevel: 0,
  // create getter
  get currentDungeon() {
    return Self.dungeonLevels[Self.currentDungeonLevel - 1];
  },
  get level() {
    return Self.currentDungeonLevel;
  },
  init: function () {
    let dungeon = Dungeon(1);
    dungeon.init();
    Self.dungeonLevels.push(dungeon);
    Self.currentDungeonLevel += 1;
  },
  _createLevel: function () { },
  getFreeCell() {
    return Self.currentDungeon.getFreeCell();
  },
};

export default Self;
