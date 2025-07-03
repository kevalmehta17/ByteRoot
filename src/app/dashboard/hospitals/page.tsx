"use client";

import { HospitalCard } from "@/components/hospitals/hospital-card";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockHospitals, type Hospital } from "@/lib/hospital-data";
import { useState } from "react";

export default function HospitalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const cities = [
    "all",
    ...Array.from(new Set(mockHospitals.map((h) => h.city))),
  ];
  const specialties = [
    "all",
    ...Array.from(new Set(mockHospitals.flatMap((h) => h.specialties))),
  ];

  const filteredHospitals = mockHospitals.filter((hospital) => {
    const matchesSearchTerm =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity =
      selectedCity === "all" || hospital.city === selectedCity;
    const matchesSpecialty =
      selectedSpecialty === "all" ||
      hospital.specialties.includes(selectedSpecialty);
    return matchesSearchTerm && matchesCity && matchesSpecialty;
  });

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-headline text-3xl font-semibold text-foreground drop-shadow-sm">
          Find Hospitals
        </h1>
        <p className="text-muted-foreground">
          Search and filter hospitals to find the right ones for your needs.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-card shadow">
        <div>
          <label
            htmlFor="search-hospital"
            className="text-sm font-medium text-foreground"
          >
            Search by Name/Address
          </label>
          <Input
            id="search-hospital"
            type="text"
            placeholder="e.g., City general "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="filter-city"
            className="text-sm font-medium text-foreground"
          >
            Filter by city
          </label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger id="filter-city" className="w-full mt-1">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city === "all" ? "All Cities" : city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            htmlFor="filter-specialty"
            className="text-sm font-medium text-foreground"
          >
            Filter by Specialty
          </label>
          <Select
            value={selectedSpecialty}
            onValueChange={setSelectedSpecialty}
          >
            <SelectTrigger id="filter-specialty" className="w-full mt-1">
              <SelectValue placeholder="Select a specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty === "all" ? "All Specialties" : specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Render the hospital */}
      {filteredHospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Icons.search className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-lg text-muted-foreground">
            No hospitals match your criteria.
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
