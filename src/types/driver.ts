export interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  truckId: string;
  status: "active" | "inactive" | "on_trip";
  role: "junior" | "senior" | "lead";
  trips: number;
  rating: number;
}
