import MinecraftContainer from "../MinecraftContainer";
import MinecraftSlot from "../MinecraftSlot";
import MinecraftResultSlot from "../MinecraftResultSlot";
import MinecraftResultArrow from "../MinecraftResultArrow";
import styles from "./styles.module.css";

function Stonecutter({ input, result, amount }) {
  return (
    <MinecraftContainer>
      <div className={styles.header}>Stonecutter</div>
      <div className={styles.inlineFlex}>
        {input && <MinecraftSlot image={input[1]} name={input[0]} />}
        <MinecraftResultArrow />
        <span className={styles.resultBorder}>
          <MinecraftResultSlot
            name={result[0]}
            image={result[1]}
            amount={amount}
            type="stonecutter"
          />
        </span>
      </div>
    </MinecraftContainer>
  );
}

Stonecutter.defaultProps = {
  recipe: [false],
  result: false,
};

export default Stonecutter; 