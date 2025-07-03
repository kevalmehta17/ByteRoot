"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { getHospitalById, type Hospital } from "@/lib/hospital-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { AppointmentForm } from "@/components/hospitals/appointment-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HospitalDetailPage() {
  const params = useParams();
  const hospitalId = typeof params.id === "string" ? params.id : "";
  const hospital: Hospital | undefined = getHospitalById(hospitalId);

  if (!hospital) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
        <Icons.hospitals className="h-24 w-24 text-muted-foreground mb-4" />
        <h1 className="font-headline text-3xl font-semibold text-destructive mb-2 drop-shadow-sm">
          Hospital Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn't find the hospital you're looking for.
        </p>
        <Button asChild>
          <Link href="/dashboard/hospitals">
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back to Hospital Directory
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="relative -mx-6 -mt-6">
        <div className="relative w-full h-64 md:h-80 lg:h-96">
          <Image
            src={hospital.imageUrl}
            alt={`Image of ${hospital.name}`}
            layout="fill"
            objectFit="cover"
            className="opacity-70"
            data-ai-hint={hospital.aiHint}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
        <div className="relative container mx-auto px-6 pb-6 -mt-20 md:-mt-24 z-10">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-2 drop-shadow-md">
            {hospital.name}
          </h1>
          <p className="text-lg text-muted-foreground flex items-center mb-1">
            <Icons.mapPin className="h-5 w-5 mr-2" /> {hospital.address}
          </p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Icons.star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(hospital.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="ml-2 text-muted-foreground">
              ({hospital.rating.toFixed(1)} rating)
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-0 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                About {hospital.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                {hospital.description}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                Specialties
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {hospital.specialties.map((specialty) => (
                <Badge
                  key={specialty}
                  variant="outline"
                  className="text-base px-3 py-1"
                >
                  {specialty}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                Services Offered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {hospital.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg sticky top-20">
            {" "}
            {/* Make booking card sticky */}
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                Book an Appointment
              </CardTitle>
              <CardDescription>
                Fill out the form below to request an appointment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentForm hospital={hospital} />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                Contact & Timings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p className="flex items-center">
                <Icons.phone className="h-4 w-4 mr-2 text-primary" />{" "}
                {hospital.phone}
              </p>
              <p className="flex items-center">
                <Icons.clock className="h-4 w-4 mr-2 text-primary" />{" "}
                {hospital.timings}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
