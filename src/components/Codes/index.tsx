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
  const { price, setPrice } = usePriceStore();

  const [isVisible, setIsVisible] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [isVisibleModalMoney, setIsVisibleModalMoney] = useState(false);
  const [isVisibleModalLimit, setIsVisibleModalLimit] = useState(false);
  const [product, setProduct] = useState<{
    image: string;
    name: string;
    price: number;
  } | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState<string>("");
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean | null>(null);
  const [lastProductIndex, setLastProductIndex] = useState<number | null>(null);
  const [usedProducts, setUsedProducts] = useState<number[]>([]);

  const totalCodesDataPrice = codesData.reduce(
    (acc: any, item: any) => acc + item.price,
    0
  );

  const generateProduct = () => {
    setLoadingProduct(true);

    if (usedProducts.length >= codesData.length) {
      setIsVisibleModalLimit(true);
      return;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * codesData.length);
    } while (
      randomIndex === lastProductIndex ||
      usedProducts.includes(randomIndex)
    );

    const randomItem = codesData[randomIndex];
    setProduct({
      image: randomItem.image,
      name: randomItem.name,
      price: randomItem.price,
    });
    setLastProductIndex(randomIndex);
    setUsedProducts((prevUsedProducts) => [...prevUsedProducts, randomIndex]);
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
    setIsVisible(true);
    setTimeout(generateCode, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputCode(value);
    setIsCodeCorrect(value === generatedCode);
  };

  const handleSubmit = () => {
    if (isCodeCorrect) {
      setPrice(price + (product?.price ?? 0));
      setIsVisibleModalMoney(true);
    } else {
      toast.error("Código incorreto!");
    }
  };

  useEffect(() => {
    if (price > 0 && totalCodesDataPrice >= price) {
      setIsVisibleModalLimit(true);
    } else {
      generateProduct();
    }
  }, [price]);

  useEffect(() => {
    if (isVisibleModalMoney) {
      setTimeout(() => {
        setIsVisibleModalMoney(false);
        generateProduct();
      }, 4000);
    }
  }, [isVisibleModalMoney]);

  const RenderLoading = () => <div className={styles.loading}></div>;

  return (
    <>
      <PopupMoney
        isVisible={isVisibleModalMoney}
        codeName={product?.name ?? ""}
      />
      <DailyLimit isVisible={isVisibleModalLimit} />
      <div id={styles.center}>
        {loadingProduct ? (
          <RenderLoading />
        ) : (
          <>
            {product?.image && (
              <img
                src={product.image}
                alt="Generated Product"
                className={styles.image}
              />
            )}
            <p className={styles.text}>
              Clique no botão abaixo para gerar o seu código {product?.name}.
            </p>

            <div id={styles.buttonWrapper}>
              <Button
                handleSubmit={handleGenerateNewCode}
                title="Gerar Código"
              />
            </div>

            {isVisible && <RenderLoading />}

            {generatedCode && (
              <div className={styles.result}>
                <p className={styles.code}>{generatedCode}</p>
              </div>
            )}

            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={inputCode}
                onChange={handleInputChange}
                placeholder="Digite o código que foi gerado"
                className={styles.input}
              />
              <Button handleSubmit={handleSubmit} title="Enviar" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Codes;
