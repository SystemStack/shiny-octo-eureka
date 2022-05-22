import { lazy, Suspense } from "react";
import { drawHeroText, drawLogText } from "../index";
import { displayOptions } from "../utils/options";
const LogContainer = lazy(() => import("./LogContainer"));
const GameContainer = lazy(() => import("./GameContainer"));
const GameBackgroundContainer = lazy(() => import("./GameBackgroundContainer"));
const HeroContainer = lazy(() => import("./HeroContainer"));
const SpellContainer = lazy(() => import("./SpellContainer"));
const EquipmentContainer = lazy(() => import("./EquipmentContainer"));
const ButtonGroupContainer = lazy(() => import("./ButtonGroupContainer"));
export default function () {
  const containerProps = {
    displayOptions,
    leftWidth: window.innerWidth * (7 / 8),
    rightWidth: window.innerWidth * (1 / 8),
    topHeight: window.innerHeight * (15 / 20),
    middleHeight: window.innerHeight * (1 / 20),
    bottomHeight: window.innerHeight * (4 / 20),
  };
  setInterval(() => {
    drawLogText("Welcome to the game!");
    drawHeroText();
  }, 1000);
  return (
    <Suspense fallback={null}>
      <div className='Container'>
        <GameContainer {...containerProps} />
        <HeroContainer {...containerProps} />
        <LogContainer {...containerProps} />
        <EquipmentContainer {...containerProps} />
        <ButtonGroupContainer {...containerProps} />
        <SpellContainer {...containerProps} />
      </div>
      <div className='Background_Container'>
        <GameBackgroundContainer {...containerProps} />
      </div>
    </Suspense>
  );
}
