
export const colors = {
  "@": "white",
  ".": "orange",
  "+": "limegreen",
};
interface IDisplayOptions {
  fontSize: number,
  forceSquareRatio: boolean,
  fontFamily: string,
  height: number,
  width: number
}

export const displayOptions: Partial<IDisplayOptions> = {
  fontSize: 15,
  forceSquareRatio: true,
  fontFamily: "monospace",
};
