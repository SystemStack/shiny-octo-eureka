import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { IEntityState, IMapCell } from '../interfaces';

type subscription<T1> = [['zustand/subscribeWithSelector', T1]];

interface ILogStore {
  logs: string[];
  append: (log: string) => void;
  dequeue: () => string | void;
}
interface IHeroStore {
  text: string,
  text2: string,
  state: IEntityState,
  update: (state: IEntityState) => void,
}
interface IMapStore {
  queue: IMapCell[];
  append: (props: IMapCell) => void;
  dequeue: () => IMapCell | void;
}


export const LogStore = create<ILogStore, subscription<ILogStore>>(
  subscribeWithSelector((_joke, get, setter) => ({
    logs: [],
    append: (message) => {
      if (message && message.length) {
        const l = get().logs;
        l.push(message);
        setter.setState({ logs: l });
      }
    },
    dequeue: () => {
      if (get().logs.length) {
        let message = get().logs[0];
        const l = get().logs.slice(1);
        setter.setState({ logs: l });
        return message;
      }
    },
  }))
);

// should be like a factory instantiated by each entity
export const HeroStore = create<IHeroStore, subscription<IHeroStore>>(
  subscribeWithSelector((_joke, get, setter) => ({
    text: "",
    text2: "",
    state: {
      entityName: "",
      curse: "",
      class: "",
      title: "",
      level: 0,
      hp: 0,
      maxHp: 0,
      mp: 0,
      maxMp: 0,
      xp: 0,
      position: { x: 0, y: 0, z: 0 },
    },
    update: (heroState) => {
      let newState = Object.assign({}, get().state, heroState);
      setter.setState({
        state: newState,
        text: `${newState.entityName} ${newState.curse} ${newState.class} ${newState.title}`,
        text2: `Level ${newState.level} ${newState.hp}/${newState.maxHp} HP ❤️ ${newState.mp}/${newState.maxMp} MP 📿`,
      });
    },
  }))
);


export const MapStore = create<IMapStore, subscription<IMapStore>>(
  subscribeWithSelector((_joke, get, setter) => ({
    queue: [],
    append: (props) => {
      const l = get().queue;
      l.push(props);
      setter.setState({ queue: l });
    },
    dequeue: () => {
      if (get().queue.length) {
        let next = get().queue[0];
        const l = get().queue.slice(1);
        setter.setState({ queue: l });
        return next;
      }
    },
  }))
);
