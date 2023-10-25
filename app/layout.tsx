import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css"
import { AuthContextProvider } from "@/context/AuthContext";
import { Navbar } from "@/collections/Navbar/Navbar";
import { Footer } from "@/collections/Footer/Footer";


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
        <AuthContextProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
