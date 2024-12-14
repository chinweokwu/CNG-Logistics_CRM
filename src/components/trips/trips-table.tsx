import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { Trip, TripStatus } from "@/types/trip";
import { format } from "date-fns";

interface TripsTableProps {
  trips: Trip[];
  onViewTrip: (trip: Trip) => void;
  onUpdateStatus: (tripId: number, status: TripStatus) => void;
}

const statusStyles: Record<TripStatus, string> = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export function TripsTable({
  trips,
  onViewTrip,
  onUpdateStatus,
}: TripsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Start Time</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Truck ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.id}>
              <TableCell>
                {format(new Date(trip.startTime), "MMM d, yyyy HH:mm")}
              </TableCell>
              <TableCell>{trip.destination}</TableCell>
              <TableCell>{trip.driverName}</TableCell>
              <TableCell>{trip.truckId}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={statusStyles[trip.status]}
                >
                  {trip.status.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewTrip(trip)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    {trip.status === "in_progress" && (
                      <DropdownMenuItem
                        onClick={() => onUpdateStatus(trip.id, "completed")}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Completed
                      </DropdownMenuItem>
                    )}
                    {trip.status === "pending" && (
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onUpdateStatus(trip.id, "cancelled")}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel Trip
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
