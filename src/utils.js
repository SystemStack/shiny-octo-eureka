export function centerCanvas(canvas) {
  canvas.style.position = "absolute";
  canvas.style.top = "50%";
  canvas.style.left = "50%";
  canvas.style.transform = "translate(-50%, -50%)";
}

export const displayOptions = {
  height: Math.floor(window.innerHeight / 20) + 1,
  width: Math.floor(window.innerWidth / 20) + 1,
  fontSize: 18,
  forceSquareRatio: true,
};

export const colors = {
  "@": "white",
  ".": "orange",
  "+": "limegreen",
};
