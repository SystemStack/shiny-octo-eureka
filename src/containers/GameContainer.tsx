import { useEffect, useRef } from "react";
import { Display } from "rot-js";
import { IContainerProps, IMapCell } from "../interfaces";
import { MapStore } from "../utils/state";

export default function (props: IContainerProps) {
  const opts = {
    ...props.displayOptions,
    fontSize: props.displayOptions.fontSize - 1,
    width: Math.floor(props.leftWidth / (props.displayOptions.fontSize - 1)),
    height: Math.floor(props.middleHeight / (props.displayOptions.fontSize - 1)),
  };
  const display = new Display(opts);
  const displayRef = useRef(null);
  let drawText: (cell: IMapCell) => void;
  let dismounted = false;
  useEffect(() => {
    if (!dismounted) {
      displayRef.current.appendChild(display.getContainer());
      drawText = _drawText(display);
    }
    return () => {
      dismounted = true;
      console.warn("game container dismounted unexpectedly");
    };
  }, [display]);
  const styles = {
    paddingTop: 2 * props.displayOptions.fontSize + "px",
    paddingLeft: 2 * props.displayOptions.fontSize + "px",
  };
  const _drawText = (display: Display) => {
    return (cell: IMapCell) => {
      display.draw(
        cell.position.x,
        cell.position.y,
        cell.model.current,
        cell.model.fg,
        cell.model.bg
      );
    };
  };
  const updateMap = () => {
    if (!drawText) return;
    let cell = MapStore.getState().dequeue();
    if (cell) {
      drawText(cell);
    }
  };
  MapStore.subscribe(updateMap);
  return <div ref={displayRef} className='Game_Container' style={styles}></div>;
}


