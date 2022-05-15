import { Display } from "rot-js";

const displayOptions = {
  fontSize: 48,
  forceSquareRatio: true,
  fontFamily: "monospace",
  _height: 0,
  get height() {
    return this._height;
  },
  set height(value) {
    this._height = value;
  },
  _width: 0,
  get width() {
    return this._width;
  },
  set width(value) {
    this._width = value;
  },
};
export function getDisplayOptions() {
  return displayOptions;
}

export const colors = {
  "@": "white",
  ".": "orange",
  "+": "limegreen",
};

export function getContainer() {
  const sections = [
    "Game",
    "Hero",
    "Log",
    "Spell",
    "Button_Group",
    "Equipment",
  ];

  const container = document.createElement("div");
  container.className = "container";
  for (const section of sections) {
    const sectionContainer = document.createElement("div");
    sectionContainer.className = `${section}_Section`;
    container.appendChild(sectionContainer);
  }
  return container;
}

export function initEquipmentContainer() {
  const sections = [
    "Main_Hand",
    "Off_Hand",
    "Boot",
    "Helmet",
    "Amulet",
    "Shoulder",
    "Torso",
    "Leg",
    "Glove",
    "Bracer",
    "Right_Ring",
    "Left_Ring",
    "Ammo",
  ];
  const container = document.getElementsByClassName("Equipment_Section")[0];
  container.classList.add("equipment_container");
  for (const section of sections) {
    const sectionContainer = document.createElement("div");
    sectionContainer.className = `${section}_Container`;
    container.appendChild(sectionContainer);
  }
  return container;
}

export function getGameDisplay() {
  const section = document.body.getElementsByClassName("Game_Section")[0];
  displayOptions.height =
    Math.floor(section.clientHeight / displayOptions.fontSize) - 2;
  displayOptions.width =
    Math.floor(section.clientWidth / displayOptions.fontSize) - 2;
  const display = new Display(displayOptions);

  const canvas = display.getContainer();
  canvas.style.zIndex = 100;
  canvas.style.opacity = 0.8;
  // Because the map digger has an offset of 2 for walls and 2 for floors, we need to
  // offset the canvas by 2x to center it.
  canvas.style.paddingTop = 2 * displayOptions.fontSize + "px";
  canvas.style.paddingLeft = 2 * displayOptions.fontSize + "px";
  section.appendChild(canvas);
  return display;
}

export function getLogDisplay() {
  const section = document.body.getElementsByClassName("Log_Section")[0];
  const [width, height] = [
    Math.floor(section.clientWidth / displayOptions.fontSize),
    Math.floor(section.clientHeight / displayOptions.fontSize),
  ];
  const display = new Display({
    ...displayOptions,
    width: width,
    height: height,
  });
  const canvas = display.getContainer();
  section.appendChild(canvas);
  display.drawText(0, 0, "Welcome to the dungeon!", width); //loremipsum
  display.drawText(0, 1.25, "You feel hungry.", width); //loremipsum
  return display;
}

export function getHeroDisplay() {
  const section = document.body.getElementsByClassName("Hero_Section")[0];
  const [width, height] = [
    Math.floor(section.clientWidth / displayOptions.fontSize),
    Math.floor(section.clientHeight / displayOptions.fontSize),
  ];
  const display = new Display({
    ...displayOptions,
    width: width,
    height: height,
  });
  const canvas = display.getContainer();
  const text = "Trollantha, Valkyrie of the North"; //loremipsum
  display.drawText(width - text.length, 1, text, width); //loremipsum
  section.appendChild(canvas);
  return display;
}
