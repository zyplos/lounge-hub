import React from "react";
import FullBox, { FullBoxProps } from "../FullBox"; // Import FullBoxProps
import Spinner from "../Spinner";
import styles from "./styles.module.css";

// Props for LoadingFullBox, extending FullBoxProps but omitting 'children'
// as LoadingFullBox defines its own children.
// We also make `useDims` optional here if we always want to set it from LoadingFullBox
interface LoadingFullBoxProps
  extends Omit<FullBoxProps, "children" | "useDims"> {
  text?: string;
}

const LoadingFullBox: React.FC<LoadingFullBoxProps> = ({ text, ...props }) => {
  return (
    // `useDims` is always true for LoadingFullBox.
    // Other FullBoxProps like `usePadding`, `className`, `id`, `style` can be passed via `...props`.
    <FullBox useDims {...props}>
      <Spinner title={text} />
      {text && <p className={styles.loadingText}>{text}</p>}
    </FullBox>
  );
};

export default LoadingFullBox;
