"use client";

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  getEmergencyAssistance,
  type EmergencyAssistanceOutput,
} from "@/ai/flows/emergency-assistance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockHospitals, type Hospital } from "@/lib/hospital-data";
import { Separator } from "@/components/ui/separator";

interface Location {
  latitude: number;
  longitude: number;
}

export default function EmergencyPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [isSubmittingInitial, setIsSubmittingInitial] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const [showHospitalSelection, setShowHospitalSelection] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(
    null
  );
  const [isSubmittingToHospital, setIsSubmittingToHospital] = useState(false);

  const [mounted, setMounted] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          console.warn("Geolocation error:", error); // Changed to warn to be less alarming
          let message = "Could not retrieve your location.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message =
                "You have denied location access. Please enable it in your browser settings to use this feature.";
              break;
            case error.POSITION_UNAVAILABLE:
              message = "Your location information is currently unavailable.";
              break;
            case error.TIMEOUT:
              message = "The request to get your location timed out.";
              break;
          }
          setLocationError(message);
          toast({
            title: "Location Access Issue",
            description: message,
            variant: "destructive",
            duration: 7000,
          });
        }
      );
    } else {
      const message = "Geolocation is not supported by this browser.";
      setLocationError(message);
      toast({
        title: "Location Error",
        description: message,
        variant: "destructive",
      });
    }
    setHospitals(mockHospitals);
  }, [toast]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleInitialSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmittingInitial(true);
    setAiAdvice(null);
    setAiError(null);

    toast({
      title: "Emergency Details Recorded",
      description: "Getting preliminary AI advice. Please wait...",
    });

    setIsAiProcessing(true);
    try {
      const inputForAI: {
        emergencyDescription?: string;
        imageDataUri?: string;
      } = {};
      if (description.trim()) {
        inputForAI.emergencyDescription = description;
      }
      if (imagePreview) {
        inputForAI.imageDataUri = imagePreview;
      }

      if (inputForAI.emergencyDescription || inputForAI.imageDataUri) {
        const result: EmergencyAssistanceOutput = await getEmergencyAssistance(
          inputForAI
        );
        setAiAdvice(result.preliminaryAdvice);
      } else {
        setAiAdvice(
          "No specific details provided for AI analysis. Focus on safety and await professional help."
        );
      }
    } catch (err) {
      console.error("AI assistance error:", err);
      const errorMsg =
        err instanceof Error ? err.message : "Could not get AI advice.";
      setAiError(`Failed to get AI advice: ${errorMsg}`);
      toast({
        title: "AI Assistance Failed",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsAiProcessing(false);
      setIsSubmittingInitial(false);
      setShowHospitalSelection(true);
    }
  };

  const handleHospitalSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedHospitalId) {
      toast({
        title: "No Hospital Selected",
        description: "Please select a hospital to send details to.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmittingToHospital(true);

    const selectedHospital = hospitals.find((h) => h.id === selectedHospitalId);

    // --- Start of Simulation Logic ---
    try {
      const newAlert = {
        id: crypto.randomUUID(), // Modern way to get a unique ID
        name: name,
        phone: phone,
        description: description,
        hospitalName: selectedHospital?.name || "Unknown Hospital",
        timestamp: new Date().toISOString(),
      };

      const existingAlerts = JSON.parse(
        localStorage.getItem("emergencyAlerts") || "[]"
      );
      const updatedAlerts = [...existingAlerts, newAlert];
      localStorage.setItem("emergencyAlerts", JSON.stringify(updatedAlerts));

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

      toast({
        title: "Alert Sent (DEMO)",
        description: `Your emergency alert has been sent to ${selectedHospital?.name}. You can view active alerts in the "Hospital Panel" section.`,
        variant: "default",
        duration: 8000,
      });
    } catch (error) {
      console.error("Failed to save alert to localStorage", error);
      toast({
        title: "Submission Failed",
        description: "Could not save the alert locally. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingToHospital(false);
    }
    // --- End of Simulation Logic ---
  };

  const isFormValid = name && phone && description;

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/20 via-background to-destructive/20 flex flex-col items-center justify-center p-4 selection:bg-primary selection:text-primary-foreground">
      <Card className="w-full max-w-2xl shadow-2xl border-destructive/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-destructive/10">
            <Icons.emergency className="h-10 w-10 text-destructive animate-pulse" />
          </div>
          <CardTitle className="font-headline text-3xl text-destructive drop-shadow-sm">
            Emergency SOS
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Fill this form urgently.
            {mounted
              ? location
                ? " Your location is detected."
                : locationError
                ? " Location not detected."
                : " Requesting location..."
              : " Requesting location..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!mounted ? (
            <div className="flex flex-col items-center justify-center space-y-2 py-10">
              <Icons.loader className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading emergency form...</p>
            </div>
          ) : (
            <>
              {!showHospitalSelection ? (
                <form onSubmit={handleInitialSubmit} className="space-y-6">
                  <div>
                    <Label
                      htmlFor="name"
                      className="font-semibold text-foreground"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Jane Doe"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="phone"
                      className="font-semibold text-foreground"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., (555) 123-4567"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="description"
                      className="font-semibold text-foreground"
                    >
                      Brief Description of Emergency
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g., Severe chest pain, fell and can't get up..."
                      required
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="image"
                      className="font-semibold text-foreground"
                    >
                      Upload Image (Optional)
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                    {imagePreview && (
                      <div className="mt-3 p-2 border border-dashed rounded-md inline-block">
                        <Image
                          src={imagePreview}
                          alt="Image preview"
                          width={150}
                          height={150}
                          className="rounded-md object-contain max-h-[150px]"
                          data-ai-hint="emergency photo"
                        />
                        <p className="text-xs text-muted-foreground mt-1 text-center">
                          {imageFile?.name}
                        </p>
                      </div>
                    )}
                  </div>

                  {location && (
                    <Alert
                      variant="default"
                      className="bg-green-50 border-green-300"
                    >
                      <Icons.mapPin className="h-5 w-5 text-green-700" />
                      <AlertTitle className="text-green-800">
                        Location Detected
                      </AlertTitle>
                      <AlertDescription className="text-green-700">
                        Latitude: {location.latitude.toFixed(5)}, Longitude:{" "}
                        {location.longitude.toFixed(5)}. This will be used if
                        you send details to a hospital.
                      </AlertDescription>
                    </Alert>
                  )}
                  {locationError && (
                    <Alert variant="destructive">
                      <Icons.alertTriangle className="h-4 w-4" />
                      <AlertTitle>Location Access Issue</AlertTitle>
                      <AlertDescription>
                        {locationError} You can still submit the form.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full text-lg py-3 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-md"
                    disabled={
                      isSubmittingInitial || isAiProcessing || !isFormValid
                    }
                  >
                    {isSubmittingInitial || isAiProcessing ? (
                      <>
                        <Icons.loader className="mr-2 h-5 w-5 animate-spin" />{" "}
                        Processing...
                      </>
                    ) : (
                      <>
                        <Icons.send className="mr-2 h-5 w-5" /> Submit & Get
                        Preliminary Advice
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  {isAiProcessing && (
                    <div className="flex flex-col items-center justify-center space-y-2 py-4">
                      <Icons.loader className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-muted-foreground">
                        Getting AI preliminary advice...
                      </p>
                    </div>
                  )}

                  {aiAdvice && !isAiProcessing && (
                    <Card className="bg-primary/5 border-primary/30">
                      <CardHeader>
                        <CardTitle className="text-lg font-headline flex items-center gap-2">
                          <Icons.diagnosis className="text-primary h-5 w-5" />{" "}
                          AI Preliminary Advice (DEMO)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {aiAdvice}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-xs text-destructive font-semibold">
                          Always prioritize instructions from emergency
                          responders (e.g., 911 operators) over this AI advice.
                        </p>
                      </CardFooter>
                    </Card>
                  )}
                  {aiError && !isAiProcessing && (
                    <Alert variant="destructive">
                      <Icons.alertTriangle className="h-4 w-4" />
                      <AlertTitle>AI Assistance Error</AlertTitle>
                      <AlertDescription>{aiError}</AlertDescription>
                    </Alert>
                  )}

                  <Separator className="my-6" />

                  <form onSubmit={handleHospitalSubmit} className="space-y-4">
                    <div>
                      <Label
                        htmlFor="hospital-select"
                        className="font-semibold text-foreground text-lg"
                      >
                        Select Hospital to Notify (Optional)
                      </Label>
                      <Select
                        value={selectedHospitalId || ""}
                        onValueChange={setSelectedHospitalId}
                      >
                        <SelectTrigger
                          id="hospital-select"
                          className="w-full mt-1"
                        >
                          <SelectValue placeholder="Choose a hospital..." />
                        </SelectTrigger>
                        <SelectContent>
                          {hospitals.length > 0 ? (
                            hospitals.map((hospital) => (
                              <SelectItem key={hospital.id} value={hospital.id}>
                                {hospital.name} - {hospital.city}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No h ospitals available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        This will send a simulated alert to the selected
                        hospital's queue.
                      </p>
                    </div>
                    <Button
                      type="submit"
                      className="w-full text-lg py-3"
                      disabled={isSubmittingToHospital || !selectedHospitalId}
                    >
                      {isSubmittingToHospital ? (
                        <>
                          <Icons.loader className="mr-2 h-5 w-5 animate-spin" />{" "}
                          Sending to Hospital...
                        </>
                      ) : (
                        "Send Details to Selected Hospital"
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </>
          )}

          <div className="mt-8 text-center">
            <Alert variant="destructive" className="text-center">
              <Icons.alertTriangle className="h-5 w-5" />
              <AlertTitle className="font-bold">
                THIS IS A DEMO APPLICATION
              </AlertTitle>
              <AlertDescription>
                In a real emergency, please call your local emergency number
                (e.g., 911, 112) immediately. Do NOT rely on this form for
                actual emergency assistance.
              </AlertDescription>
            </Alert>
            <Button
              variant="link"
              asChild
              className="mt-4 text-muted-foreground"
            >
              <Link href="/dashboard">
                <Icons.chevronLeft className="mr-1 h-4 w-4" /> Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
