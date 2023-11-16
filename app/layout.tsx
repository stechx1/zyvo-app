import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "../styles/globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { AOSInit } from "@/AOSInit";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

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
        <AuthContextProvider>
          <div className="px-8 sm:px-14 md:px-20 lg:px-20 xl:px-32 py-8">
            {children}
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
