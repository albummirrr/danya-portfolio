import type { Metadata } from "next";
import { Press_Start_2P, Space_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DANYA MIRZOEV",
  description: "Multidisciplinary Designer & Director",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart2P.variable} ${spaceMono.variable}`}
    >
      <body>
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
