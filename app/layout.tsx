import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/seo/site";
import "./globals.css";

/*
 * next/font (bukan <link> ke Google Fonts): menghilangkan FOUT.
 * Penting di tema ini karena heading display 88px ramping sangat terlihat
 * berkedip saat font swap.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Indian Cuisine in Bali`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Indian Cuisine in Bali`,
    description: site.description,
    url: site.url,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#faf7f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
