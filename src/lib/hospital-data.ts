
export interface Hospital {
    id: string;
    name: string;
    address: string;
    city: string;
    phone: string;
    specialties: string[];
    rating: number;
    imageUrl: string;
    aiHint: string;
    description: string;
    services: string[];
    timings: string;
}

export const mockHospitals: Hospital[] = [
    {
        id: "1",
        name: "City General Hospital",
        address: "123 Main St, Anytown, USA",
        city: "Anytown",
        phone: "(555) 123-4567",
        specialties: ["Cardiology", "Oncology", "Neurology"],
        rating: 4.5,
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "modern hospital",
        description: "A leading multi-specialty hospital providing comprehensive healthcare services with advanced medical technology and experienced doctors.",
        services: ["Emergency Care", "Intensive Care Unit (ICU)", "Surgical Services", "Radiology", "Pharmacy"],
        timings: "Open 24 hours"
    },
    {
        id: "2",
        name: "St. Luke's Medical Center",
        address: "456 Oak Ave, Anytown, USA",
        city: "Anytown",
        phone: "(555) 987-6543",
        specialties: ["Pediatrics", "Orthopedics", "General Surgery"],
        rating: 4.2,
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "hospital exterior",
        description: "St. Luke's offers specialized care for children and adults, focusing on orthopedic treatments and general surgical procedures.",
        services: ["Pediatric Care", "Orthopedic Surgery", "Physical Therapy", "Maternity Ward", "Diagnostics Lab"],
        timings: "Mon-Sun: 8 AM - 10 PM, Emergency 24/7"
    },
    {
        id: "3",
        name: "Community Health Clinic",
        address: "789 Pine Rd, Smallville, USA",
        city: "Smallville",
        phone: "(555) 234-5678",
        specialties: ["Family Medicine", "Preventive Care", "Dermatology"],
        rating: 4.0,
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "clinic building",
        description: "Your friendly neighborhood clinic for routine check-ups, preventive healthcare, and common dermatological issues.",
        services: ["General Check-ups", "Vaccinations", "Skin Care", "Minor Illness Treatment", "Health Screening"],
        timings: "Mon-Fri: 9 AM - 6 PM"
    },
    {
        id: "4",
        name: "Advanced Heart Institute",
        address: "101 Heartbeat Ln, Metro City, USA",
        city: "Metro City",
        phone: "(555) 345-6789",
        specialties: ["Cardiology", "Interventional Cardiology", "Cardiac Surgery"],
        rating: 4.8,
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "cardiology center",
        description: "Specialized institute for all heart-related conditions, offering cutting-edge treatments and rehabilitation programs.",
        services: ["Angioplasty", "Bypass Surgery", "Echocardiography", "Cardiac Rehab", "Pacemaker Implantation"],
        timings: "Mon-Sat: 8 AM - 7 PM, Emergency Available"
    },
];

export const getHospitalById = (id: string): Hospital | undefined => {
    return mockHospitals.find(hospital => hospital.id === id);
};
