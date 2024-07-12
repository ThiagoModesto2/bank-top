"use client";

import React, { useState, type FC } from "react";
import { useRouter } from "next/navigation";

import { Player } from "@lottiefiles/react-lottie-player";

import Button from "../common/Button";
import LoadingPopup from "../common/LoadingPopup";
import { queryParams } from "@/utils/queryParams";

import styles from "./styles.module.css";

const Welcome: FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const handleInit = () => {
    setIsVisible((prev) => !prev);

    const route = queryParams("/codigos");
    setTimeout(() => {
      router.push(route);
    }, 2000);
  };

  return (
    <>
      <LoadingPopup isVisible={isVisible} />
      <div id={styles.center}>
        <p className={styles.text}>Seja muito bem-vindo</p>
        <p className={styles.text}>ao Novo Código Lucrativo Itaú!</p>

        <div className={styles.icon}>
          <Player
            src="https://cdn.lordicon.com/tqywkdcz.json"
            loop
            autoplay
            style={{
              width: "125px",
              height: "125px",
              display: "flex",
              margin: "0 auto",
            }}
          ></Player>
        </div>

        <p style={{ textAlign: "center" }}>Para começar, clique abaixo:</p>

        <div id={styles.buttonWrapper}>
          <Button handleSubmit={handleInit} title="Começar" />
        </div>
      </div>
    </>
  );
};

export default Welcome;
