import MinecraftContainer from "../MinecraftContainer";
import MinecraftSlot from "../MinecraftSlot";
import MinecraftResultSlot from "../MinecraftResultSlot";
import MinecraftResultArrow from "../MinecraftResultArrow";
import styles from "./styles.module.css";

function CraftingTable({ input, result, amount }) {
  return (
    <MinecraftContainer>
      <div className={styles.header}>Crafting</div>
      <div className={styles.inlineFlex}>
        <div className={styles.grid3x3}>
          {input.map((item, index) => {
            return <MinecraftSlot key={index} image={item[1]} name={item[0]} />;
          })}
        </div>
        <MinecraftResultArrow />
        <MinecraftResultSlot
          name={result[0]}
          image={result[1]}
          amount={amount}
        />
      </div>
    </MinecraftContainer>
  );
}

CraftingTable.defaultProps = {
  input: [false],
  result: false,
  amount: null,
};

export default CraftingTable; 