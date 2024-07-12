"use client";

import { type FC } from "react";

import Provider from "@/components/common/Provider";
import Welcome from "@/components/Welcome";

export const Dashboard: FC = () => {
  return (
    <Provider showMenu={false}>
      <Welcome />
    </Provider>
  );
};

export default Dashboard;
