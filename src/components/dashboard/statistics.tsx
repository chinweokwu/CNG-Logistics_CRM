import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Users, AlertCircle, CheckCircle2 } from "lucide-react";

const stats = [
  {
    title: "Total Trips",
    value: "2,345",
    icon: Truck,
    description: "120 this week",
  },
  {
    title: "Active Drivers",
    value: "45",
    icon: Users,
    description: "+2 from last week",
  },
  {
    title: "Open Issues",
    value: "12",
    icon: AlertCircle,
    description: "4 critical",
  },
  {
    title: "Completed Deliveries",
    value: "98.5%",
    icon: CheckCircle2,
    description: "+0.5% from last month",
  },
];

export function Statistics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
