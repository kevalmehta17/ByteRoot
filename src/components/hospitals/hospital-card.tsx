"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import type { Hospital } from "@/lib/hospital-data";

interface HospitalCardProps {
  hospital: Hospital;
}

export function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative w-full h-48">
        <Image
          src={hospital.imageUrl}
          alt={hospital.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={hospital.aiHint}
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-headline text-xl">{hospital.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground flex items-center">
          <Icons.mapPin className="h-4 w-4 mr-1" /> {hospital.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 text-sm">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Icons.star
              key={i}
              className={`h-4 w-4 ${
                i < Math.round(hospital.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="ml-2 text-muted-foreground">
            ({hospital.rating.toFixed(1)})
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {hospital.specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} variant="secondary">
              {specialty}
            </Badge>
          ))}
          {hospital.specialties.length > 3 && (
            <Badge variant="secondary">
              +{hospital.specialties.length - 3} more
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground line-clamp-2">
          {hospital.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/dashboard/hospitals/${hospital.id}`}>
            View Details & Book
            <Icons.chevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
