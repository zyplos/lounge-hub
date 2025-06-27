import styles from "./MinecraftContainer.module.css";

function MinecraftContainer(props) {
  return (
    <div className={styles.minecraftContainer} {...props}>
      {props.children}
    </div>
  );
}

export default MinecraftContainer; 