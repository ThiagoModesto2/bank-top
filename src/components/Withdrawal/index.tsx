"use client";

import React, { useState, type FC } from "react";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

import {
  MdPeople,
  MdOutlinePhoneAndroid,
  MdEmail,
  MdQrCodeScanner,
} from "react-icons/md";

import Button from "../common/Button";
import usePriceStore from "@/store/usePriceStore";
import { formatMoneyBRL } from "@/utils/formatMoneyBRL";
import { queryParams } from "@/utils/queryParams";

import { checkout } from "@/config/links";

import styles from "./styles.module.css";

export const Withdrawal: FC = () => {
  const { price } = usePriceStore();
  const [selectedType, setSelectedType] = useState("cpf_cnpj");
  const [pixKey, setPixKey] = useState("");
  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);

  const handleGoToPage = () => {
    if (pixKey === "") {
      toast.error("Informe a chave pix.");
      return;
    }

    if (amount === "") {
      toast.error("Informe o valor.");
      return;
    }

    if (!isAmountValid) {
      toast.error("Valor indisponível.");
      return;
    }

    window.location.href = queryParams(checkout);
  };

  const handlePixKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPixKey(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(e.target.value);
    setIsAmountValid(value > 0 && value <= price);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const renderInput = () => {
    switch (selectedType) {
      case "cpf_cnpj":
        return (
          <InputMask
            mask="999.999.999-99"
            maskPlaceholder=""
            value={pixKey}
            onChange={handlePixKeyChange}
            placeholder="Digite sua chave PIX aqui (CPF/CNPJ)"
            className={styles.input}
            style={inputStyle}
          />
        );
      case "telefone":
        return (
          <InputMask
            mask="(99) 99999-9999"
            maskPlaceholder=""
            value={pixKey}
            onChange={handlePixKeyChange}
            placeholder="Digite sua chave PIX aqui (Telefone)"
            className={styles.input}
            style={inputStyle}
          />
        );
      case "email":
        return (
          <input
            type="email"
            value={pixKey}
            onChange={handlePixKeyChange}
            placeholder="Digite sua chave PIX aqui (E-mail)"
            className={styles.input}
            style={inputStyle}
          />
        );
      case "aleatorio":
        return (
          <input
            type="text"
            value={pixKey}
            onChange={handlePixKeyChange}
            placeholder="Digite sua chave PIX aqui (Aleatório)"
            className={styles.input}
            style={inputStyle}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.valorBoxSaque}>
        <p>Disponível para saque</p>
        <span id={styles.valorSaque}>{formatMoneyBRL(price)}</span>
      </div>

      <div className={styles.pixTypeContainer}>
        <button
          className={`${styles.pixTypeButton} ${
            selectedType === "cpf_cnpj" && styles.selected
          }`}
          onClick={() => setSelectedType("cpf_cnpj")}
        >
          <MdPeople size={28} />
          CPF / CNPJ
        </button>
        <button
          className={`${styles.pixTypeButton} ${
            selectedType === "telefone" && styles.selected
          }`}
          onClick={() => setSelectedType("telefone")}
        >
          <MdOutlinePhoneAndroid size={28} />
          Telefone
        </button>
        <button
          className={`${styles.pixTypeButton} ${
            selectedType === "email" && styles.selected
          }`}
          onClick={() => setSelectedType("email")}
        >
          <MdEmail size={28} />
          E-mail
        </button>
        <button
          className={`${styles.pixTypeButton} ${
            selectedType === "aleatorio" && styles.selected
          }`}
          onClick={() => setSelectedType("aleatorio")}
        >
          <MdQrCodeScanner size={28} />
          Aleatório
        </button>
      </div>

      <div className={styles.form}>
        {renderInput()}
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Digite o valor que deseja sacar"
          className={styles.input}
          style={{ ...inputStyle, borderColor: isAmountValid ? "#ccc" : "red" }}
        />
        <Button handleSubmit={handleGoToPage} title="Realizar Saque" />
      </div>
    </div>
  );
};

export default Withdrawal;
