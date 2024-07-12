"use client";

import { FC } from "react";
import { FaHome, FaMoneyBill } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { queryParams } from "@/utils/queryParams";

import styles from "./styles.module.css";

export const Menu: FC = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    const route = queryParams(path);
    router.push(route);
  };

  return (
    <div id={styles.menu}>
      <div className={styles.item} onClick={() => navigateTo("/codigos")}>
        <FaHome color="#fff" size={34} />
        <span>Código</span>
      </div>
      <div className={styles.item} onClick={() => navigateTo("/saque")}>
        <FaMoneyBill color="#fff" size={34} />
        <span>Saque</span>
      </div>
    </div>
  );
};

export default Menu;
