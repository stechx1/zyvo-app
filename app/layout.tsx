import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Footer, Navbar } from "@collections";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zyvo",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
