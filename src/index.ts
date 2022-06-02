import { createRoot } from '@react-three/fiber';
import { Engine, Scheduler } from 'rot-js';
import Container from './containers/index';
import MonsterSpawner from './entities/MonsterSpawner';
import PlayerSpawner from './entities/PlayerSpawner';
import './index.css';
import { IEntityState, IMapCell, IPosition } from './interfaces';
import { HeroStore, LogStore, MapStore } from './utils/state';

interface GameObject {
  monsters: Array<any>,
  init: () => void,
  createEntity: (factory: () => any) => any,
  start: () => void,
  player: any,
  engine: any,
  world: any,
}

const Self: GameObject = {
  monsters: Array(),
  player: null,
  engine: null,
  world: null,
  init: function () {
    const divRoot = document.getElementById('root')
    console.log(divRoot)
    if (divRoot) {
      createRoot(divRoot).render(Container());
      // Self.world = World;
      // Self.world.init();
      // Self.start();
    } else {
      console.error('render root not found');
      setTimeout(Self.init, 100);
    }
  },
  createEntity: function (factory) {
    let key = Self.world.getFreeCell();
    var parts = key.split(',');
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    let entity = factory();
    entity.init(x, y);
    return entity;
  },
  start: function () {
    Self.player = Self.createEntity(PlayerSpawner);
    for (let i = 0; i < 3; i++) {
      let mon = Self.createEntity(MonsterSpawner);
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

export function unlockEngine() {
  Self.engine.unlock();
}
export function lockEngine() {
  Self.engine.lock();
}
export function getMapXY(x: number, y: number) {
  return Self.world.currentDungeon.map[x + ',' + y];
}
export function validPosition(x: number, y: number) {
  return x + ',' + y in Self.world.currentDungeon.map;
}
export function getPlayerPosition(): IPosition {
  return Self.player.position;
}
export function drawLogText(text: string) {
  LogStore.getState().append(text);
}
export function drawHeroText(heroState: IEntityState) {
  HeroStore.getState().update(heroState);
}
export function drawOnMap(mapProps: IMapCell) {
  MapStore.getState().append(mapProps);

}
