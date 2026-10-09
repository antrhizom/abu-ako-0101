import { Cormorant_Garamond } from "next/font/google";

// Cormorant Garamond (Christian Thalmann), SIL Open Font License 1.1.
// next/font lädt die Schrift beim Build und liefert sie von der eigenen Domain aus.
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
