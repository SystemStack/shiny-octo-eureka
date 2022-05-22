import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { colors, displayOptions } from "./options";
const state = create((set) => ({
  colors,
  displayOptions,
}));

export const LogStore = create(
  subscribeWithSelector((_joke, get, setter) => ({
    logs: [],
    append: (message) => {
      const l = get().logs;
      l.push(message);
      setter.setState({ logs: l });
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

export const HeroStore = create(
  subscribeWithSelector((_joke, get, setter) => ({
    text: "",
    text2: "",
    state: {
      // TODO: move to hero
      player1: "Trollantha",
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
    update: (heroState) => {
      let newState = Object.assign({}, get().state, heroState);
      setter.setState({
        state: newState,
        text: `${newState.player1} ${newState.curse} ${newState.class} ${newState.title}`,
        text2: `Level ${newState.level} ${newState.hp}/${newState.maxHp} HP ❤️ ${newState.mp}/${newState.maxMp} MP 📿`,
      });
    },
  }))
);
