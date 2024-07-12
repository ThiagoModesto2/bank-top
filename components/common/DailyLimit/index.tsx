"use client";

import React, { type FC } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

import styles from "./styles.module.css";
import Button from "../Button";
import { useRouter } from "next/navigation";

interface DailyLimitProps {
  isVisible: boolean;
}

export const DailyLimit: FC<DailyLimitProps> = ({ isVisible }) => {
  const router = useRouter();

  const handleGoToWithdraw = () => {
    router.push("/saque");
  };

  return (
    <>
      {isVisible && (
        <div className={styles.overlay}>
          <div className={styles.popupContainer}>
            <Player
              src="https://cdn.lordicon.com/inrunzby.json"
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

            <span className={styles.popupText}>
              <strong>LIMITE DIÁRIO ATINGIDO!</strong>
            </span>
            <span className={styles.popupText}>
              Precisa sacar seu saldo de hoje?
            </span>

            <Button handleSubmit={handleGoToWithdraw} title="SACAR AGORA" />

            <span className={styles.popupText}>Ou espere 24 horas</span>
            <span className={styles.popupText}>para continuar avaliando.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyLimit;
