import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import AlertProvider from "@/components/ui/alert/AlertProvider";
import LanguageSync from "@/components/ui/LanguageSync";

export const metadata: Metadata = {
  title: "Exclusive",
  description: "E-commerce storefront built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
           <AlertProvider>
        <LayoutWrapper>
            <LanguageSync />
          {children}
        </LayoutWrapper>
           </AlertProvider>
      </body>
    </html>
  );
}