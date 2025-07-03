"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockHospitals, type Hospital } from "@/lib/hospital-data";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface EmergencyAlert {
  id: string;
  name: string;
  phone: string;
  description: string;
  hospitalName: string;
  timestamp: string;
}

export default function HospitalPanelPage() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [allHospitals] = useState<Hospital[]>(mockHospitals);
  const [selectedHospitalName, setSelectedHospitalName] = useState<
    string | null
  >(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load alerts from localStorage on mount (client-side only)
    try {
      const storedAlerts = localStorage.getItem("emergencyAlerts");
      if (storedAlerts) {
        setAlerts(JSON.parse(storedAlerts));
      }
    } catch (error) {
      console.error(
        "Failed to parse emergency alerts from localStorage",
        error
      );
    }
  }, []);

  const handleClearAlert = (idToClear: string) => {
    const updatedAlerts = alerts.filter((alert) => alert.id !== idToClear);
    setAlerts(updatedAlerts);
    localStorage.setItem("emergencyAlerts", JSON.stringify(updatedAlerts));
    toast({
      title: "Alert Cleared",
      description: "The emergency alert has been removed from the queue.",
    });
  };

  const filteredAlerts = selectedHospitalName
    ? alerts
        .filter((alert) => alert.hospitalName === selectedHospitalName)
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
    : [];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-headline text-3xl font-semibold text-foreground drop-shadow-sm">
          Hospital Emergency Panel
        </h1>
        <p className="text-muted-foreground">
          Select a hospital to view and manage incoming emergency alerts.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Select Hospital</CardTitle>
          <Select
            value={selectedHospitalName || ""}
            onValueChange={setSelectedHospitalName}
          >
            <SelectTrigger
              id="filter-hospital"
              className="w-full md:w-1/2 lg:w-1/3"
            >
              <SelectValue placeholder="Choose a hospital to view its panel" />
            </SelectTrigger>
            <SelectContent>
              {allHospitals.map((hospital) => (
                <SelectItem key={hospital.id} value={hospital.name}>
                  {hospital.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {!selectedHospitalName ? (
            <div className="text-center py-10">
              <Icons.hospitals className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                Please select a hospital to see its emergency alerts.
              </p>
            </div>
          ) : filteredAlerts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow key={alert.id} className="hover:bg-destructive/5">
                    <TableCell className="font-medium">{alert.name}</TableCell>
                    <TableCell>{alert.phone}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {alert.description}
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(alert.timestamp), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleClearAlert(alert.id)}
                      >
                        <Icons.trash className="mr-2 h-4 w-4" />
                        Clear
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <Icons.shieldCheck className="mx-auto h-12 w-12 text-green-600" />
              <p className="mt-4 text-muted-foreground">
                No active emergency alerts for {selectedHospitalName}.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
