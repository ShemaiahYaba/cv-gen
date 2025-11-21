import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Bot, Code, PenSquare, Star, Target } from "lucide-react";

const templates = [
  {
    href: "/cv/edit/ats",
    icon: <Code className="h-6 w-6" />,
    title: "Software Engineer (ATS)",
    description: "An ATS-optimized template for experienced software engineers.",
  },
  {
    href: "/cv/edit/skill-based",
    icon: <Star className="h-6 w-6" />,
    title: "Student (Skill-Based)",
    description: "Highlight your skills and projects for internships and first jobs.",
  },
  {
    href: "/cv/edit/custom",
    icon: <PenSquare className="h-6 w-6" />,
    title: "Creative (Custom)",
    description: "A flexible template for roles that value unique presentation.",
  },
  {
    href: "/cv/edit/ats",
    icon: <Target className="h-6 w-6" />,
    title: "Product Manager (ATS)",
    description: "An ATS-friendly template focused on impact and metrics.",
  },
  {
    href: "/cv/edit/skill-based",
    icon: <Bot className="h-6 w-6" />,
    title: "AI/ML Intern (Skill-Based)",
    description: "Showcase your AI projects and technical skills for research roles.",
  },
  {
    href: "/cv/edit/custom",
    icon: <PenSquare className="h-6 w-6" />,
    title: "Freelancer (Custom)",
    description: "A customizable CV to showcase a diverse portfolio of work.",
  },
];

export default function TemplatesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="font-headline text-4xl font-bold">Browse Templates</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Select a template to start building your CV.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {templates.map((template) => (
          <Link href={template.href} key={template.title}>
            <Card className="group hover:border-primary transition-all duration-300 hover:shadow-xl h-full flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full p-3 group-hover:scale-110 transition-transform">
                    {template.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl font-headline">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardFooter>
                  <Button variant="outline" className="w-full">Use Template</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Link>
        </Button>
      </div>
    </div>
  );
}
