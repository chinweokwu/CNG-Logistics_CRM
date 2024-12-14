import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trip } from "@/types/trip";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface TripDetailsDialogProps {
  trip: Trip | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TripDetailsDialog({
  trip,
  open,
  onOpenChange,
}: TripDetailsDialogProps) {
  if (!trip) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Trip Details #{trip.id}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Start Time
                </h4>
                <p className="text-sm">
                  {format(new Date(trip.startTime), "PPpp")}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Status
                </h4>
                <Badge variant="secondary" className="mt-1">
                  {trip.status}
                </Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                Route Details
              </h4>
              <div className="rounded-lg border p-4">
                <div className="mb-2">
                  <span className="text-sm font-medium">Destination:</span>
                  <span className="ml-2 text-sm">{trip.destination}</span>
                </div>
                {/* Map component would go here */}
                <div className="h-[200px] rounded-md bg-muted flex items-center justify-center">
                  Map View
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                Driver Information
              </h4>
              <div className="rounded-lg border p-4">
                <div className="grid gap-2">
                  <div>
                    <span className="text-sm font-medium">Name:</span>
                    <span className="ml-2 text-sm">{trip.driverName}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Truck ID:</span>
                    <span className="ml-2 text-sm">{trip.truckId}</span>
                  </div>
                </div>
              </div>
            </div>

            {trip.customerFeedback && (
              <>
                <Separator />
                <div>
                  <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                    Customer Feedback
                  </h4>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm">{trip.customerFeedback}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
