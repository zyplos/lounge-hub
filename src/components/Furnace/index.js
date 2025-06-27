import coalImage from "../assets/items/coal.png";
import MinecraftContainer from "../MinecraftContainer";
import MinecraftSlot from "../MinecraftSlot";
import MinecraftResultSlot from "../MinecraftResultSlot";
import MinecraftResultArrow from "../MinecraftResultArrow";
import styles from "./styles.module.css";

function Furnace({ input, result, type }) {
  return (
    <MinecraftContainer>
      <div className={styles.header}>{type}</div>
      <div className={styles.inlineFlex}>
        <div className={styles.inputGrid}>
          {input && <MinecraftSlot image={input[1]} name={input[0]} />}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 90 90"
            className={styles.fuelIcon}
          >
            <rect x="6.92" width="6.92" height="13.85" />
            <polygon points="20.77 48.46 20.77 13.85 13.85 13.85 13.85 27.69 6.92 27.69 6.92 41.54 0 41.54 0 69.23 6.92 69.23 6.92 83.08 0 83.08 0 90 6.92 90 13.85 90 20.77 90 20.77 62.31 13.85 62.31 13.85 48.46 20.77 48.46" />
            <rect x="41.54" y="13.85" width="6.92" height="13.85" />
            <polygon points="55.38 62.31 55.38 27.69 48.46 27.69 48.46 41.54 41.54 41.54 41.54 55.38 34.62 55.38 34.62 90 41.54 90 48.46 90 55.38 90 55.38 76.15 48.46 76.15 48.46 62.31 55.38 62.31" />
            <rect x="76.15" width="6.92" height="13.85" />
            <polygon points="90 69.23 90 41.54 83.08 41.54 83.08 27.69 76.15 27.69 76.15 13.85 69.23 13.85 69.23 48.46 76.15 48.46 76.15 62.31 69.23 62.31 69.23 90 76.15 90 83.08 90 90 90 90 83.08 83.08 83.08 83.08 69.23 90 69.23" />
          </svg>
          <MinecraftSlot image={coalImage} name="Any Fuel" />
        </div>
        <MinecraftResultArrow />
        <MinecraftResultSlot name={result[0]} image={result[1]} />
      </div>
    </MinecraftContainer>
  );
}

Furnace.defaultProps = {
  type: "Furnace",
  input: [false],
  result: false,
};

export default Furnace; 