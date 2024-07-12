import { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Oficial - Dashboard",
  description: "Código lucrativo",
};

import Dashboard from "@/pages/Dashboard";

export default function DashboardPage() {
  return <Dashboard />;
}
