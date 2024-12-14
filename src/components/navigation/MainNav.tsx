import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, GamepadIcon } from "lucide-react";
import type { RootState } from "@/lib/store";
import { DashboardHeader } from "@/components/admin/adminHeader";
export function MainNav() {
  const { user } = useSelector((state: RootState) => state.auth);

  const links = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Game",
      href: "/game",
      icon: GamepadIcon,
    },
  ];

  if (!user) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex h-16 items-center px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 lg:space-x-6">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary relative group",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {link.title}
                <span className="absolute -bottom-[1.5px] left-0 h-[2px] w-0 bg-primary transition-all group-hover:w-full" />
              </NavLink>
            );
          })}
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            Welcome, {user.username}
          </span>
          <DashboardHeader />
        </div>
      </div>
    </nav>
  );
}
