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
import { PlusCircle, MoreHorizontal, FileDown, Pencil, Trash2, LayoutGrid } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const cvs = [
  {
    id: "1",
    title: "Software Engineer @ Google",
    type: "ATS",
    lastModified: "2 days ago",
    href: "/cv/edit/ats",
  },
  {
    id: "2",
    title: "Academic CV for Scholarship",
    type: "Skill-Based",
    lastModified: "5 days ago",
    href: "/cv/edit/skill-based",
  },
  {
    id: "3",
    title: "Creative Portfolio Intro",
    type: "Custom",
    lastModified: "1 week ago",
    href: "/cv/edit/custom",
  },
];

export default function DashboardPage() {
  const cvThumbnail = PlaceHolderImages.find((img) => img.id === "cv-thumbnail");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Here are your recent CVs.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
                <Link href="/templates">
                    <LayoutGrid className="mr-2 h-4 w-4" /> Browse Templates
                </Link>
            </Button>
            <Button asChild>
                <Link href="/onboarding">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New CV
                </Link>
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cvs.map((cv) => (
          <Card key={cv.id} className="flex flex-col relative">
             <Link href={cv.href} className="flex flex-col flex-1">
                <CardHeader className="flex-row items-start justify-between">
                    <div>
                        <CardTitle className="mb-1">{cv.title}</CardTitle>
                        <CardDescription>{cv.type} CV</CardDescription>
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
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Last modified: {cv.lastModified}
                  </p>
                </CardFooter>
             </Link>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={cv.href}><Pencil className="mr-2 h-4 w-4"/>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem><FileDown className="mr-2 h-4 w-4"/>Download</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4"/>Delete</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
          </Card>
        ))}
      </div>
    </div>
  );
}
