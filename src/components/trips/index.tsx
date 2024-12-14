import { useState } from "react";
import { TripsHeader } from "./trips-header";
import { TripsTable } from "./trips-table";
import { TripDetailsDialog } from "./trip-details-dialog";
import { Trip, TripStatus } from "@/types/trip";

const initialTrips: Trip[] = [
  {
    id: 1,
    startTime: "2024-03-20T08:00:00Z",
    destination: "123 Main St, City A",
    driverId: 1,
    driverName: "John Doe",
    truckId: "CNG-001",
    status: "in_progress",
    route: {
      startLocation: [40.7128, -74.006],
      endLocation: [40.7614, -73.9776],
      waypoints: [],
    },
  },
  // Add more sample trips
];

export function TripsManagement() {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (tripId: number, newStatus: TripStatus) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === tripId ? { ...trip, status: newStatus } : trip
      )
    );
  };

  const handleViewTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    setDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <TripsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <TripsTable
        trips={filteredTrips}
        onViewTrip={handleViewTrip}
        onUpdateStatus={handleUpdateStatus}
      />
      <TripDetailsDialog
        trip={selectedTrip}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}
