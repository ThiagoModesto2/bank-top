import { FC } from "react";
import { FaEarthAfrica } from "react-icons/fa6";
import styles from "./styles.module.css";

export const Footer: FC = () => {
  return (
    <footer id={styles.footer}>
      <FaEarthAfrica color="#fff" />
      Itaú em outros países
    </footer>
  );
};

export default Footer;
