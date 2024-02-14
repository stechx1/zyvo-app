import type { Metadata } from "next";
import { CommonContextProvider } from "@/context/CommonContext";
import { FilterContextProvider } from "@/context/FilterContext";
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
      <head>
        <meta
          name="viewport"
          content="width=400, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={`${roboto.className} ${poppins.className} `}>
        <AOSInit />
        <Toaster />
        <CommonContextProvider>
          <FilterContextProvider>
            {children}
            </FilterContextProvider>
        </CommonContextProvider>
      </body>
    </html>
  );
}
