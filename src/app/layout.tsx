import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./[slug]/menu/context/cart";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  display: "swap",
  weight: ["400", "500", "600"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "FSW Donalds",
  description: "Bora finalizar esse projeto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} max-w-screen w-full overflow-hidden`}
      >
        <CartProvider>{children}</CartProvider>
        <Toaster></Toaster>
      </body>
    </html>
  );
}
