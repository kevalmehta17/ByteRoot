import { Icons } from "@/components/icons";

export default function HomePage() {
  const features = [
    {
      icon: Icons.tablet,
      title: "Drug Interaction Checker",
      description:
        "Check potential interactions between your medications with our AI tool.",
      href: "/dashboard/drug-interaction-checker",
      aiHint: "pills interaction",
    },
    {
      icon: Icons.analysis,
      title: "AI Diagnosis",
      description:
        "Upload medical images for AI-powered preliminary analysis and insights.",
      href: "/dashboard/image-diagnosis",
      aiHint: "ai analysis",
    },
    {
      icon: Icons.translate,
      title: "Report Simplifier",
      description:
        "Understand complex medical reports with AI-driven summaries and translations.",
      href: "/dashboard/report-simplifier",
      aiHint: "report summary",
    },
    {
      icon: Icons.hospitals,
      title: "Hospital Booking",
      description: "Find nearby hospitals and book appointments seamlessly.",
      href: "/dashboard/hospitals",
      aiHint: "hospital building",
    },
  ];

  return (
    <main>
      <h1 className="text-3xl font-bold  font-sans text-emerald-400">
        Welcome to Next.js with Tailwind CSS!
      </h1>
    </main>
  );
}
