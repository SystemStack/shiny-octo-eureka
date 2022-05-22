export default function (props) {
  const styles = {
    paddingTop: 2 * props.fontSize + "px",
    paddingLeft: 2 * props.fontSize + "px",
  };

  return <div className='Game_Container' style={styles}></div>;
}
