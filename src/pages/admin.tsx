import { AdminOverview } from "@/components/admin/adminOverview";
import { Separator } from "@/components/ui/separator";

export function AdminPage() {
  return (
    <div className="">
      <main className="flex-1 space-y-6 p-8 pt-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to your dashboard. Here's an overview of your account.
          </p>
        </div>
        <Separator />
        <AdminOverview />
      </main>
    </div>
  );
}
