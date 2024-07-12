"use client";

import React, { useEffect, useState, type FC } from "react";
import { toast } from "react-toastify";

import Button from "../common/Button";
import PopupMoney from "../common/PopupMoney";
import DailyLimit from "../common/DailyLimit";

import generateUniqueCode from "@/utils/generateUniqueCode";
import codesData, { existingCodes } from "@/mocks/codes";

import usePriceStore from "@/store/usePriceStore";

import styles from "./styles.module.css";

export const Codes: FC = () => {
  const { price, setPrice, productIndex, setProductIndex } = usePriceStore();

  const [isVisible, setIsVisible] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [isVisibleModalMoney, setIsVisibleModalMoney] = useState(false);
  const [isVisibleModalLimit, setIsVisibleModalLimit] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState<string>("");
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean | null>(null);

  const totalCodesDataPrice = codesData.reduce(
    (acc: any, item: any) => acc + item.price,
    0
  );

  const generateProduct = () => {
    setLoadingProduct(true);

    if (productIndex + 1 >= codesData.length) {
      setLoadingProduct(false);
      return;
    }

    setProductIndex(productIndex + 1);
    setGeneratedCode(null);
    setInputCode("");
    setIsCodeCorrect(null);
    setIsVisible(false);
    setLoadingProduct(false);
  };

  const generateCode = () => {
    const newCode = generateUniqueCode(existingCodes);
    setGeneratedCode(newCode);
    setIsVisible(false);
  };

  const handleGenerateNewCode = () => {
    setIsCodeCorrect(false);
    setIsVisible(true);
    const timer = setTimeout(generateCode, 2000);
    return () => clearTimeout(timer);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputCode(value);
    setIsCodeCorrect(value === generatedCode);
  };

  const handleSubmit = () => {
    if (isCodeCorrect) {
      setPrice(price + (codesData[productIndex]?.price ?? 0));
      setIsVisibleModalMoney(true);
    } else {
      toast.error("Código incorreto!");
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  useEffect(() => {
    if (isVisibleModalMoney) return;

    if (price > 0 && totalCodesDataPrice === price) {
      setIsVisibleModalLimit(true);
      setProductIndex(0);
    }
  }, [price, isVisibleModalMoney]);

  useEffect(() => {
    if (isVisibleModalMoney) {
      const timer = setTimeout(() => {
        setIsVisibleModalMoney(false);
        generateProduct();
      }, 1);
      return () => clearTimeout(timer);
    }
  }, [isVisibleModalMoney]);

  useEffect(() => {
    if (productIndex === -1) {
      setProductIndex(0);
    } else {
      setLoadingProduct(false);
    }
  }, []);

  const RenderLoading = () => <div className={styles.loading}></div>;

  const currentProduct = codesData[productIndex];

  return (
    <>
      <PopupMoney
        isVisible={isVisibleModalMoney}
        codeName={currentProduct?.name ?? ""}
      />
      <DailyLimit isVisible={isVisibleModalLimit} />
      <div id={styles.center}>
        {loadingProduct ? (
          <RenderLoading />
        ) : (
          <>
            {currentProduct?.image && (
              <img
                src={currentProduct.image}
                alt="Generated Product"
                className={styles.image}
              />
            )}
            <p className={styles.text}>
              Clique no botão abaixo para gerar o seu código{" "}
              {currentProduct?.name}.
            </p>

            <div id={styles.buttonWrapper}>
              <Button
                handleSubmit={handleGenerateNewCode}
                title="Gerar Código"
              />
            </div>

            {isVisible ? (
              <RenderLoading />
            ) : (
              generatedCode && (
                <div className={styles.result}>
                  <p
                    className={styles.code}
                    onClick={() => copyToClipboard(generatedCode)}
                  >
                    {generatedCode}
                  </p>
                </div>
              )
            )}

            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={inputCode}
                onChange={handleInputChange}
                placeholder="Digite o código"
                className={styles.input}
              />
              <Button
                handleSubmit={handleSubmit}
                title="Enviar"
                disabled={isVisible}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Codes;
