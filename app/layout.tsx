import type { Metadata } from "next";
import "./globals.css";
import  Header  from "@/components/layout/Header";
import  Footer from "@/components/layout/Footer";
import  TopHeader from "@/components/layout/TopHeader";
import ScrollToTop from "@/components/ui/ScrollToTop";

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
    <html lang="en" dir="ltr">
     <body>
      <TopHeader/>
        <Header />
        <main>{children}</main>
         <ScrollToTop />
        <Footer />
     </body>
      
    </html>
  );
}