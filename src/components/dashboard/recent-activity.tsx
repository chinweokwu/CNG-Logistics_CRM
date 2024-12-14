import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ActivityStatus = "success" | "warning" | "error" | "info";

interface Activity {
  id: number;
  type: string;
  message: string;
  time: string;
  status: ActivityStatus;
}

const activities: Activity[] = [
  {
    id: 1,
    type: "trip_completed",
    message: "Trip #1234 completed successfully",
    time: "2 minutes ago",
    status: "success",
  },
  {
    id: 2,
    type: "maintenance_alert",
    message: "Truck CNG-789 due for maintenance",
    time: "15 minutes ago",
    status: "warning",
  },
  {
    id: 3,
    type: "issue_reported",
    message: "New issue reported for Trip #1235",
    time: "1 hour ago",
    status: "error",
  },
  {
    id: 4,
    type: "driver_assigned",
    message: "John Doe assigned to Trip #1236",
    time: "2 hours ago",
    status: "info",
  },
];

const statusStyles: Record<ActivityStatus, string> = {
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  warning:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
};

export function RecentActivity() {
  return (
    <ScrollArea className="h-[350px] pr-4">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 rounded-lg border p-4 transition-all hover:bg-muted/50"
          >
            <Badge
              variant="secondary"
              className={cn("mt-0.5 shrink-0", statusStyles[activity.status])}
            >
              {activity.status}
            </Badge>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.message}
              </p>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
