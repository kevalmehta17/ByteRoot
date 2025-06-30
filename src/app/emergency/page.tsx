"use client";

import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { mockHospitals, type Hospital } from "@/lib/hospital-data";
import { FormEvent, useEffect, useState, type ChangeEvent } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

export default function EmergencyPage() {
  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string| null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Form submission state with AI
  const [isSubmittingInitial, setIsSubmittingInitial] = useState(false);
  const [isAiProcessing, setIsAirProcessing] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  //Hospital selection state
  const [showHospitalSelection, setShowHospitalSelection] = useState(false);
  const [hospital, setHospital] = useState<Hospital[] | null>(null);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(
    null
  );
  const [isSubmittingToHospital, setIsSubmittingToHospital] = useState(false);

  const [mounted, setMounted] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    // Get user's location
    if (navigator.geolocation) {
      // Check if geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          console.error("Error getting Location:", error);
          const message = `Error getting location: ${error.message}. Please ensure that location services are enabled.`;
          setLocationError(message);
          toast({
            title: "Location Error",
            description: message,
            variant: "destructive",
            duration: 7500,
          });
        }
      );
    } else {
      const message =
        "Geolocation is not supported in your browser. Please enable location services or use a different browser.";
      setLocationError(message);
      toast({
        title: "Location Error",
        description: message,
        variant: "destructive",
        duration: 7500,
      });
    }
    setHospital(mockHospitals);
  }, [toast]);


  const handleInitialSubmit = async (event:FormEvent) =>{
    event.preventDefault();
    setIsSubmittingInitial(true);
    setAiAdvice(null);
    setAiError(null);
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>)=>{
    const file = event.target.files?.[0] || null;
    if(file){
      setImageFile(file);
      // now we have to render the image in the form
      const reader = new FileReader();
      reader.onloadend = () =>{
        setImagePreview(reader.result as string);
      }
      reader.readAsDataURL(file);
    }else{
      setImageFile(null);
      setImagePreview(null);
    }
  }


  const isFormValid = name && phone && description;

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/20 via-background to-destructive/20 flex flex-col items-center justify-center p-4 selection:bg-primary selection:text-primary-foreground">
      <Card className="w-full max-w-2xl shadow-2xl border-destructive/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
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
              <Icons.loader className="h-10 w-10 animate-spin text primary" />
              <p className="text-muted-foreground">Loading Emergency Form...</p>
            </div>
          ) : (
            <>
            {!showHospitalSelection ? (
              <form onSubmit={handleInitialSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="font-semibold text-foreground">Full Name</Label>
                  <Input id="name" type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="e.g., Peter Parker" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-semibold text-foreground">Phone Number</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="e.g, 91571133" required className="mt-1" />
                </div>
                <div>
                  <Label  htmlFor="description" className="font-semibold text-foreground ">Description</Label>
                  <Textarea id="description" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="e.g., Severe chest pain, fell and can't get up..." required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="image" className="font-semibold text-foreground">Upload image For more accurate response(optional) </Label>
                  <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                </div>
              </form>
            )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
