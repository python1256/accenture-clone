import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accenture Clone",
  description: "Landing clone in Next.js + Tailwind + Vanta.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
