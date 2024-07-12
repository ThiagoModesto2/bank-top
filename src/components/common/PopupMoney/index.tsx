"use client";

import React, { type FC } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

import usePriceStore from "@/store/usePriceStore";
import { formatMoneyBRL } from "@/utils/formatMoneyBRL";

import styles from "./styles.module.css";

interface PopupMoneyProps {
  isVisible: boolean;
  codeName: string;
  price: number;
}

export const PopupMoney: FC<PopupMoneyProps> = ({
  isVisible,
  codeName,
  price,
}) => {
  return (
    <>
      {isVisible && (
        <div className={styles.overlay}>
          <div className={styles.popupContainer}>
            <Player
              src="https://cdn.lordicon.com/xzksbhzh.json"
              loop
              autoplay
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
              style={{
                width: "125px",
                height: "125px",
                display: "flex",
                margin: "0 auto",
              }}
            />

            <span className={styles.popupText}>Saldo atualizado!</span>
            <span className={styles.popupText}>Você recebeu:</span>
            <span className={styles.popupTextPrice}>
              {formatMoneyBRL(price)}
            </span>
            <span className={styles.popupText}>pelo código da {codeName}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupMoney;
