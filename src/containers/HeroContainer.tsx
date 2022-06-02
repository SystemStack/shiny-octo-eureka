import { useEffect, useRef } from "react";
import { Display } from "rot-js";
import { IContainerProps } from "../interfaces";
import { HeroStore } from "../utils/state";
export default function (props: IContainerProps) {
  const opts = {
    ...props.displayOptions,
    fontSize: props.displayOptions.fontSize - 1,
    width: Math.floor(props.leftWidth / (props.displayOptions.fontSize - 1)),
    height: Math.floor(props.middleHeight / (props.displayOptions.fontSize - 1)),
  };
  console.log(opts)
  const display = new Display(opts);
  const displayRef = useRef(null);
  let drawText: (a: string, b: string) => void;
  let dismounted = false;
  useEffect(() => {
    if (!dismounted) {
      displayRef.current.appendChild(display.getContainer());
      drawText = _drawText(display);
    }
    return () => {
      dismounted = true;
      console.warn("hero container dismounted unexpectedly");
    };
  }, [display]);
  const _drawText = (display: any, prevl1 = "", prevl2 = "") => {
    return (l1: typeof prevl1, l2: typeof prevl2) => {
      if (l1 === prevl1 && l2 === prevl2) return;
      display.clear();
      prevl1 = l1;
      prevl2 = l2;
      display.drawText(opts.width - l1.length, 0, l1, opts.width - 6);
      display.drawText(opts.width - l2.length, 1.25, l2);
    };
  };
  function updateTitle() {
    if (!drawText) return;
    const [line1, line2] = [
      HeroStore.getState().text,
      HeroStore.getState().text2,
    ];
    drawText(line1, line2);
  }

  HeroStore.subscribe((state) => [state.text, state.text2], updateTitle);
  return <div ref={displayRef} className='Hero_Container'></div>;
}
