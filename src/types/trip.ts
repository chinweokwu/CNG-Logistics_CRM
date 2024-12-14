export type TripStatus = "pending" | "in_progress" | "completed" | "cancelled";

export interface Trip {
  id: number;
  startTime: string;
  destination: string;
  driverId: number;
  driverName: string;
  truckId: string;
  status: TripStatus;
  customerFeedback?: string;
  completedAt?: string;
  cancelReason?: string;
  route: {
    startLocation: [number, number];
    endLocation: [number, number];
    waypoints: [number, number][];
  };
}
