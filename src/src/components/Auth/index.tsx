"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import Button from "../common/Button";

import styles from "./styles.module.css";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = () => {
    if (!email) {
      toast.error("O e-mail não pode estar vazio.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className={styles.loginbox}>
      <p className={styles.popupTextL}>O Itaú Lançou seu novo APP</p>
      <p className={styles.popupTextL}>"O Código Lucrativo Itaú!"</p>
      <p className={styles.insertEmail}>Insira seu e-mail para começar!</p>
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Insira seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className={styles.loading}></div>
      ) : (
        <Button handleSubmit={handleSubmit} title="Entrar" />
      )}
    </div>
  );
};

export default Auth;
