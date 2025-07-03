"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import type { Hospital } from "@/lib/hospital-data";

interface AppointmentFormProps {
  hospital: Hospital;
}

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

export function AppointmentForm({ hospital }: AppointmentFormProps) {
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(
    undefined
  );
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!appointmentDate || !appointmentTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time for the appointment.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log({
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      patientName,
      patientPhone,
      appointmentDate: format(appointmentDate, "PPP"),
      appointmentTime,
      reason,
    });

    toast({
      title: "Appointment Requested",
      description: `Your appointment request for ${hospital.name} on ${format(
        appointmentDate,
        "PPP"
      )} at ${appointmentTime} has been submitted. You will receive a confirmation shortly.`,
    });

    // Reset form
    setPatientName("");
    setPatientPhone("");
    setAppointmentDate(undefined);
    setAppointmentTime("");
    setReason("");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="patientName" className="font-semibold">
          Full Name
        </Label>
        <Input
          id="patientName"
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Your Full Name"
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="patientPhone" className="font-semibold">
          Phone Number
        </Label>
        <Input
          id="patientPhone"
          type="tel"
          value={patientPhone}
          onChange={(e) => setPatientPhone(e.target.value)}
          placeholder="Your Phone Number"
          required
          className="mt-1"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="appointmentDate" className="font-semibold">
            Preferred Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="appointmentDate"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal mt-1",
                  !appointmentDate && "text-muted-foreground"
                )}
              >
                <Icons.appointments className="mr-2 h-4 w-4" />
                {appointmentDate ? (
                  format(appointmentDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={appointmentDate}
                onSelect={setAppointmentDate}
                initialFocus
                disabled={(date) =>
                  date < new Date(new Date().setDate(new Date().getDate() - 1))
                } // Disable past dates
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="appointmentTime" className="font-semibold">
            Preferred Time
          </Label>
          <Select value={appointmentTime} onValueChange={setAppointmentTime}>
            <SelectTrigger id="appointmentTime" className="w-full mt-1">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="reason" className="font-semibold">
          Reason for Appointment (Optional)
        </Label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Briefly describe the reason for your visit"
          className="mt-1"
          rows={3}
        />
      </div>
      <Button
        type="submit"
        className="w-full text-lg py-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Icons.loader className="mr-2 h-5 w-5 animate-spin" /> Submitting
            Request...
          </>
        ) : (
          "Request Appointment"
        )}
      </Button>
    </form>
  );
}
