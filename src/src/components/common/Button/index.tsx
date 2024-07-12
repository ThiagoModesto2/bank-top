import { FC } from "react";
import styles from "./styles.module.css";

interface ButtonProps {
  handleSubmit: () => void;
  title?: string;
}

export const Button: FC<ButtonProps> = ({
  title = "Cadastrar",
  handleSubmit,
}) => {
  return (
    <button id={styles.prosseguirButton} onClick={handleSubmit}>
      {title}
    </button>
  );
};

export default Button;
