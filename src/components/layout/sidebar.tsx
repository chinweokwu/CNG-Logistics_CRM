import {
  LayoutDashboard,
  Users,
  Truck,
  Wrench,
  AlertCircle,
  FileBarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: Settings, label: "Admin", href: "/admin" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Drivers", href: "/drivers" },
  { icon: Truck, label: "Trips", href: "/trips" },
  { icon: Wrench, label: "Maintenance", href: "/maintenance" },
  { icon: AlertCircle, label: "Issues", href: "/issues" },
  { icon: FileBarChart, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-background transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {isOpen && (
          <span className="text-lg font-semibold tracking-tight">
            CNG LOGISTICS
          </span>
        )}
        {/* <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", !isOpen && "mx-auto")}
          onClick={onToggle}
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button> */}
      </div>
      <div className="space-y-1 p-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          const MenuItem = (
            <Button
              key={item.label}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                isOpen ? "px-2" : "px-0 py-2"
              )}
              asChild
            >
              <Link to={item.href}>
                <item.icon className={cn("h-5 w-5", isOpen && "mr-2")} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            </Button>
          );

          return isOpen ? (
            MenuItem
          ) : (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>{MenuItem}</TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </aside>
  );
}
