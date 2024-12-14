import { useState } from "react";
import { DriversTable } from "./drivers-table";
import { DriversHeader } from "./drivers-header";
import { Driver } from "@/types/driver";

const initialDrivers: Driver[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    truckId: "CNG-001",
    status: "active",
    role: "senior",
    trips: 145,
    rating: 4.8,
  },
  // Add more sample drivers here
];

export function DriversManagement() {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch = driver.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <DriversHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <DriversTable drivers={filteredDrivers} />
    </div>
  );
}
