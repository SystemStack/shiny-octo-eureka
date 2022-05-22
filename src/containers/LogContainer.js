import { useEffect, useRef } from "react";
import { Display } from "rot-js";
import { displayOptions } from "../utils/options";
import { LogStore } from "../utils/state";
export default function (props) {
  const opts = {
    ...displayOptions,
    width: Math.floor(props.leftWidth / displayOptions.fontSize),
    height: Math.floor(props.bottomHeight / displayOptions.fontSize),
  };
  const display = new Display(opts);
  const displayRef = useRef(null);
  let drawText;
  let dismounted = false;
  useEffect(() => {
    displayRef.current.appendChild(display.getContainer());
    drawText = _drawText(display);
    return () => {
      dismounted = true;
      console.warn("log container dismounted unexpectedly");
    };
  }, [display]);
  const _drawText = (display, posY = 0) => {
    return (text) => {
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
