import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EDCH | Edmonton Disability Community Hub",
  description:
    "Edmonton Disability Community Hub supports people with disabilities, families, caregivers, newcomers, and community members in Edmonton, Alberta."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
