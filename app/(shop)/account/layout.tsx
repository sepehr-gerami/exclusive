import AccountSidebar from "@/components/ui/accountSidebar/AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container mx-auto px-4 py-8 sm:px-6 lg:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
        <AccountSidebar />
        {children}
      </div>
    </section>
  );
}