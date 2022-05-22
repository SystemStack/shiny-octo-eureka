const slots = [
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
export default function (props) {
  return (
    <div className='Equipment_Container Worn_Container'>
      {slots.map((slot, index) => {
        return (
          <div className={`${slot}_Container`} key={`${slot}_${index}`}></div>
        );
      })}
    </div>
  );
}
