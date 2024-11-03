import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "../components/ui/toaster";

export const metadata: Metadata = {
  title: "Wi-Fi QR",
  description: "Generate QR codes for Wi-Fi networks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
