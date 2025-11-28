import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { PlusCircle, MoreHorizontal, FileDown, Pencil, Trash2, LayoutGrid, FileText } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";

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
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        {/* Welcome text */}
        <div>
          <h1 className="font-headline text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Here are your recent CVs.
          </p>
        </div>
        
        {/* Buttons - stack on mobile, side by side on desktop */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/templates">
              <LayoutGrid className="mr-2 h-4 w-4" /> Browse Templates
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/onboarding">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New CV
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cvs.map((cv) => (
          <Card key={cv.id} className="group flex flex-col justify-between">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                         <div className="bg-muted p-3 rounded-md">
                            <FileText className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                            <CardTitle className="mb-1 text-lg group-hover:text-primary transition-colors">
                                 <Link href={cv.href}>{cv.title}</Link>
                            </CardTitle>
                            <CardDescription>Last modified: {cv.lastModified}</CardDescription>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
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
                </div>
            </CardHeader>
            <CardFooter>
                 <Badge variant="outline">{cv.type} CV</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
