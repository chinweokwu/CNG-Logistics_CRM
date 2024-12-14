import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DriversHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export function DriversHeader({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: DriversHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search drivers..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-[300px]"
        />
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="on_trip">On Trip</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="shrink-0">
        <Plus className="mr-2 h-4 w-4" />
        Add Driver
      </Button>
    </div>
  );
}
