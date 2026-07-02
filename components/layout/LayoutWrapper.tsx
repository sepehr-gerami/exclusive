"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import TopHeader from "./TopHeader";
import ScrollToTop from "../ui/ScrollToTop";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
console.log(pathname);
  const hideLayout =
    pathname === "/login" ||
     pathname === "/sign-up";

  return (
    <>
      {!hideLayout && (
        <>
          <TopHeader />
          <Header />
        </>
      )}

      <main>{children}</main>

      <ScrollToTop />

      {!hideLayout && <Footer />}
    </>
  );
}