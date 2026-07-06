import AccountSidebar from "@/components/ui/accountSidebar/AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container mx-auto py-12">
      <div className="grid grid-cols-[260px_1fr] gap-12">
        <AccountSidebar />
        {children}
      </div>
    </section>
  );
}