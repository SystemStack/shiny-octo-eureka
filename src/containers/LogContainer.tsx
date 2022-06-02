import { useEffect, useRef } from "react";
import { Display } from "rot-js";
import { IContainerProps } from "../interfaces";
import { LogStore } from "../utils/state";
export default function (props: IContainerProps) {
  const opts = {
    ...props.displayOptions,
    width: Math.floor(props.leftWidth / props.displayOptions.fontSize),
    height: Math.floor(props.bottomHeight / props.displayOptions.fontSize),
  };
  const display = new Display(opts);
  const displayRef = useRef(null);
  let drawText: (msg: string) => void;
  let dismounted = false;
  useEffect(() => {
    if (!dismounted) {
      displayRef.current.appendChild(display.getContainer());
      drawText = _drawText(display);
    }
    return () => {
      dismounted = true;
      console.warn("log container dismounted unexpectedly");
    };
  }, [display]);
  const _drawText = (display: Display, posY = 0) => {
    return (text: string) => {
      display.drawText(0, posY, text);
      posY += 1.25;
    };
  };
  const updateLog = () => {
    if (!drawText) return;
    let msg = LogStore.getState().dequeue();
    if (msg && msg.length) {
      drawText(msg);
    }
  };

  LogStore.subscribe(updateLog);

  return <div ref={displayRef} className='Log_Container'></div>;
}
