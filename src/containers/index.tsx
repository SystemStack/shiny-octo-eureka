import { displayOptions } from "../utils/options";
import ButtonGroupContainer from "./ButtonGroupContainer";
import EquipmentContainer from "./EquipmentContainer";
import GameBackgroundContainer from "./GameBackgroundContainer";
import GameContainer from "./GameContainer";
import HeroContainer from "./HeroContainer";
import LogContainer from "./LogContainer";
import SpellContainer from "./SpellContainer";


export default function () {
  // const { width, height } = useWindowDimensions();
  const width = window.innerWidth;
  const height = window.innerHeight;
  const containerProps = {
    displayOptions,
    width,
    height,
    leftWidth: Math.floor(width * (7 / 8)),
    rightWidth: Math.floor(width * (1 / 8)),
    topHeight: Math.floor(height * (15 / 20)),
    middleHeight: Math.floor(height * (1 / 20)),
    bottomHeight: Math.floor(height * (4 / 20)),
  };
  console.log(containerProps)
  // setTimeout(() => {
  //   drawLogText("Welcome to the game!");
  // }, 1000);
  return (
    <div className='Container'>
      <GameContainer {...containerProps} />
      <HeroContainer {...containerProps} />
      <LogContainer {...containerProps} />
      <EquipmentContainer {...containerProps} />
      <ButtonGroupContainer {...containerProps} />
      <SpellContainer {...containerProps} />
      <div className='Background_Container'>
        <GameBackgroundContainer {...containerProps} />
      </div>
    </div>
  );
}
