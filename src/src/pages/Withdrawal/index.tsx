"use client";

import { type FC } from "react";

import Provider from "@/components/common/Provider";
import Withdrawal from "@/components/Withdrawal";

export const WithdrawalPages: FC = () => {
  return (
    <Provider showMenu={true}>
      <Withdrawal />
    </Provider>
  );
};

export default WithdrawalPages;
