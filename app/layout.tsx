import type { Metadata } from "next";
import "./globals.css";
import { Anonymous_Pro } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const anonymousPro = Anonymous_Pro({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "capps.",
  description: "We craft innovative software and apps that bring ideas to life",
  keywords: ["capps", "software", "apps", "development"],
  openGraph: {
    title: "capps.",
    description:
      "We craft innovative software and apps that bring ideas to life",
    type: "website",
    url: "https://capps.li",
    siteName: "capps.",
    images: [
      {
        url: "https://capps.li/icon.png",
        width: 600,
        height: 600,
        alt: "capps.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={anonymousPro.className + " overflow-hidden"}>
        <main>{children}</main>
      </body>
      <GoogleAnalytics gaId="G-K3S605JHCR" />
    </html>
  );
}
