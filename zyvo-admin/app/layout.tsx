import type { Metadata } from "next";
import { AuthContextProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { AOSInit } from "@/AOSInit";
import { poppins, roboto } from "@/lib/utils";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "ZYVO | Hourly spaces",
  description: "",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${poppins.className} `}>
        <AOSInit />
        <Toaster />
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
