import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Interactive Knowledge Map",
    template: "%s · Interactive Knowledge Map",
  },
  description:
    "A visual, interactive knowledge map for exploring frontend concepts, tools, frameworks, and processes.",
  applicationName: "Interactive Knowledge Map",

  metadataBase: new URL("https://interactive-knowledge-map.vercel.app"),

  openGraph: {
    title: "Interactive Knowledge Map",
    description:
      "Explore frontend knowledge through a structured, interactive graph.",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Interactive Knowledge Map",
    description:
      "Explore frontend knowledge through a structured, interactive graph.",
  },

  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  themeColor: "#0b0b0b",
  colorScheme: "dark",

  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
