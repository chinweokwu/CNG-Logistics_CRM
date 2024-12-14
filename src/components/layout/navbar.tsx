import { ThemeToggle } from "@/components/theme-toggle";
import { DashboardHeader } from "@/components/admin/adminHeader";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";

export function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user) return null;
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">CNG LOGISTICS</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.username}
            </span>
            <DashboardHeader />
          </div>
        </div>
      </div>
    </nav>
  );
}
