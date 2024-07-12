import { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Oficial - Códigos",
  description: "Código lucrativo",
};

import Codes from "@/pages/Codes";

export default function CodesPage() {
  return <Codes />;
}
