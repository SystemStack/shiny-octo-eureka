
export interface IContainerProps {
  displayOptions: any,// Partial<DisplayOptions>,
  width: number,
  height: number,
  leftWidth: number,
  rightWidth: number,
  topHeight: number,
  middleHeight: number,
  bottomHeight: number,
}

export interface IPosition { x: number, y: number, z: number }
export interface IEntityState {
  position: IPosition,
  entityName: string,
  curse: string,
  class: string,
  title: string,
  level: number,
  hp: number,
  maxHp: number,
  mp: number,
  maxMp: number,
  xp: number,
}
export interface IEntityModel {
  current: string,
  base: string,
  action: string,
  cast: string,
  fg: string,
  bg: string
}
export interface IEntity {
  state: IEntityState,
  model: IEntityModel,
  draw: () => void,
  init: (a: number, b: number) => void,
  act: () => void,
  update: () => void,
}


export interface IMapCell {
  position: Partial<IPosition>,
  model: Partial<IEntityModel>,
}
