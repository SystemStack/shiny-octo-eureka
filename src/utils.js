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
export function getGameDisplay() {
  const gameSection = document.body.getElementsByClassName("Game_Section")[0];
  displayOptions.height =
    Math.floor(gameSection.clientHeight / displayOptions.fontSize) - 2;
  displayOptions.width =
    Math.floor(gameSection.clientWidth / displayOptions.fontSize) - 2;
  const display = new Display(displayOptions);

  const gameCanvas = display.getContainer();
  gameCanvas.style.zIndex = 100;
  gameCanvas.style.opacity = 0.8;
  // Because the map digger has an offset of 2 for walls and 2 for floors, we need to
  // offset the canvas by 2x to center it.
  gameCanvas.style.paddingTop = 2 * displayOptions.fontSize + "px";
  gameCanvas.style.paddingLeft = 2 * displayOptions.fontSize + "px";
  gameSection.appendChild(gameCanvas);
  return display;
}
