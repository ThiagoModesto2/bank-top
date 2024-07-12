"use client";

import { type FC } from "react";

import Provider from "@/components/common/Provider";
import Codes from "@/components/Codes";

export const CodesPages: FC = () => {
  return (
    <Provider showMenu={true}>
      <Codes />
    </Provider>
  );
};

export default CodesPages;
