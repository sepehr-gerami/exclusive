"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import TopHeader from "./TopHeader";
import BottomNav from "./BottomNav";
import ScrollToTop from "../ui/ScrollToTop";

const AUTH_ROUTES_HIDE_LAYOUT = ["/login", "/sign-up", "/reset-password"];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = AUTH_ROUTES_HIDE_LAYOUT.includes(pathname);

  return (
    <>
      {!hideLayout && (
        <>
          <TopHeader />
          <Header />
        </>
      )}

      <main className={!hideLayout ? "pb-16 lg:pb-0" : ""}>{children}</main>

      <ScrollToTop />

      {!hideLayout && <Footer />}
      {!hideLayout && <BottomNav />}
    </>
  );
}