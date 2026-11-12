import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motion Studio — Code animation, visually",
  description: "A focused workspace for creating and previewing web animations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
