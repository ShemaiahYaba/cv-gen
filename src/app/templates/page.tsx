import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Bot, PenSquare, Star } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const templates = [
  {
    href: "/cv/edit/skill-based",
    icon: <Star className="h-6 w-6" />,
    title: "Skill-Based",
    description: "Highlights skills and projects over work history.",
  },
  {
    href: "/cv/edit/ats",
    icon: <Bot className="h-6 w-6" />,
    title: "ATS-Friendly",
    description: "Optimized to be easily parsed by tracking systems.",
  },
  {
    href: "/cv/edit/custom",
    icon: <PenSquare className="h-6 w-6" />,
    title: "Custom",
    description: "A flexible template with maximum customization.",
  },
];

export default function TemplatesPage() {
  const cvThumbnail = PlaceHolderImages.find((img) => img.id === "cv-thumbnail");

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
            <Card className="group hover:border-primary transition-all duration-300 hover:shadow-xl h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full p-3 group-hover:scale-110 transition-transform">
                    {template.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl font-headline">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center bg-muted/50 p-4">
                {cvThumbnail && (
                  <Image
                    src={cvThumbnail.imageUrl}
                    alt={cvThumbnail.description}
                    width={200}
                    height={283}
                    data-ai-hint={cvThumbnail.imageHint}
                    className="rounded-md shadow-lg"
                  />
                )}
              </CardContent>
              <CardFooter className="justify-center">
                  <Button variant="outline">Use Template</Button>
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
