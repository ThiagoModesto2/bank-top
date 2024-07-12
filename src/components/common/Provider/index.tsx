import { type FC, ReactNode } from "react";

import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";

import styles from "./styles.module.css";

interface ProviderProps {
  children: ReactNode;
  showMenu?: boolean;
}

export const Provider: FC<ProviderProps> = ({ children, showMenu }) => {
  return (
    <>
      <Header />
      <div id={styles.provider}>{children}</div>
      {showMenu ? <Menu /> : <Footer />}
    </>
  );
};

export default Provider;
