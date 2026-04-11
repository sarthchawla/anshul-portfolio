import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "../global.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anshul | Actress & Model",
  description:
    "Official portfolio of Anshul.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cormorant.variable} ${montserrat.variable} font-sans`}
      >
        <div className="bg-surface-base min-h-screen">{children}</div>
      </body>
    </html>
  );
}
