import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Bot, PenSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const options = [
    {
        href: "/cv/edit/skill-based",
        icon: <Star className="h-10 w-10" />,
        title: "Skill-Based CV",
        description: "Highlight your skills and projects, perfect for when you have less work experience."
    },
    {
        href: "/cv/edit/ats",
        icon: <Bot className="h-10 w-10" />,
        title: "ATS-Friendly CV",
        description: "Optimize for applicant tracking systems and get past the bots."
    },
    {
        href: "/cv/edit/custom",
        icon: <PenSquare className="h-10 w-10" />,
        title: "Custom CV",
        description: "Full creative control to design a unique, personalized CV."
    }
]

export default function StudentOnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="font-headline text-4xl font-bold">Choose Your CV Type</h1>
        <p className="text-muted-foreground text-lg mt-2">
            As a student, you have unique strengths. Let's build a CV that showcases them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {options.map((option) => (
            <Link href={option.href} key={option.title}>
            <Card className="group hover:border-primary transition-all duration-300 hover:shadow-xl h-full">
                <CardHeader className="flex flex-col items-center text-center gap-4 p-8">
                <div className="bg-primary text-primary-foreground rounded-full p-4 group-hover:scale-110 transition-transform">
                    {option.icon}
                </div>
                <div className="flex-1">
                    <CardTitle className="text-2xl font-headline">{option.title}</CardTitle>
                    <CardDescription className="mt-2 text-base">
                        {option.description}
                    </CardDescription>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
            </Card>
            </Link>
        ))}
      </div>
      <div className="mt-12">
        <Button variant="outline" asChild>
            <Link href="/onboarding">
                <ArrowLeft /> Go Back
            </Link>
        </Button>
      </div>
    </div>
  );
}
