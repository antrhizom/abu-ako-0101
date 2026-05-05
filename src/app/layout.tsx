import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABU AKO 0101 — Digitale Kompetenzen",
  description:
    "Wie digitale Kompetenzen im Schullehrplan ABU EBA in den drei Kompetenzdimensionen eingefordert werden",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
